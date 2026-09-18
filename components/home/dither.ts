/**
 * The ordered-dither field both figures on this page are drawn with.
 *
 * Not a polygon rasteriser: each dither cell casts one orthographic ray and
 * asks the shape what it hits. That is what gives the edges their exactness — a
 * boundary lands between two cells rather than being antialiased into grey and
 * then dithered into mush — and it costs one ray per cell rather than a
 * full-resolution buffer plus a `getImageData` every frame.
 *
 * The shade a cell resolves to is compared against an 8x8 Bayer threshold.
 * Ordered, not error-diffused: a Bayer field is stable frame to frame, so the
 * pattern appears to sit ON the turning surface instead of boiling, which is
 * what error diffusion would do here.
 *
 * What a shape supplies is one function: given the ray direction and the light
 * for this frame, return a sampler that turns a ray origin into a shade. The
 * cube answers it with an analytic slab test, the bust by sphere-tracing a
 * distance field; everything else — the canvas, the rotation, the threshold,
 * the frame loop — is here, once.
 */

/** 8x8 Bayer, the classic recursive construction, values 0-63. */
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/** Shade at one cell, 0 for a miss. */
export type Sampler = (ox: number, oy: number, oz: number) => number;

export type DitherOptions = {
  size: number;
  /**
   * Half-extent of the view box in model units. Anything at or above the
   * shape's own half-extent keeps it on screen through a full turn instead of
   * clipping at the halfway point.
   */
  view: number;
  /** Edge of one dither cell, in CSS px. Smaller reads as grain, larger as tile. */
  cell?: number;
  /** Half-width of the square drawn in a lit cell, as a fraction of the cell. */
  dot?: number;
  /** Where the light comes from, in world space. Normalise it yourself. */
  light: readonly [number, number, number];
  /**
   * Called once a frame with the ray direction and the light, both already
   * rotated into the shape's own space; returns the per-cell sampler.
   */
  frame: (
    dx: number,
    dy: number,
    dz: number,
    lx: number,
    ly: number,
    lz: number,
  ) => Sampler;
  /** Pitch and yaw at t seconds. */
  pose: (seconds: number) => readonly [number, number];
  /** The single frame drawn when the reader has asked for less motion. */
  restPose: readonly [number, number];
};

export function mountDither(
  canvas: HTMLCanvasElement,
  {
    size,
    view,
    cell = 4,
    dot = 0.62,
    light,
    frame,
    pose,
    restPose,
  }: DitherOptions,
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  /* Capped at 2: past that the cells are smaller than the dither pattern is
     meant to read at, and it just costs fill rate. */
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  ctx.scale(dpr, dpr);

  /* Taken from the element rather than hard-coded white: this draws on a night
     panel in the hero and on paper in "Build your twin", and inheriting
     `color` lets one component do both without a prop for it. */
  const ink = getComputedStyle(canvas).color || "#ffffff";

  const cells = Math.max(1, Math.floor(size / cell));
  const square = cell * dot;
  const inset = (cell - square) / 2;
  const [LX, LY, LZ] = light;

  const draw = (ax: number, ay: number) => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = ink;

    const sinX = Math.sin(ax);
    const cosX = Math.cos(ax);
    const sinY = Math.sin(ay);
    const cosY = Math.cos(ay);

    /* R = Rx·Ry. The ray is transformed by Rᵀ instead of the shape by R — one
       matrix either way, but this keeps the intersection in the shape's own
       axis-aligned space, where its test is simplest. */
    const rt = [
      [cosY, sinX * sinY, -cosX * sinY],
      [0, cosX, sinX],
      [sinY, -sinX * cosY, cosX * cosY],
    ];

    // Orthographic: every ray shares a direction, so it transforms once.
    const dx = rt[0][2];
    const dy = rt[1][2];
    const dz = rt[2][2];

    // The light, carried into shape space, so it stays put as the shape turns.
    const lx = rt[0][0] * LX + rt[0][1] * LY + rt[0][2] * LZ;
    const ly = rt[1][0] * LX + rt[1][1] * LY + rt[1][2] * LZ;
    const lz = rt[2][0] * LX + rt[2][1] * LY + rt[2][2] * LZ;

    const sample = frame(dx, dy, dz, lx, ly, lz);

    for (let cy = 0; cy < cells; cy++) {
      /* Negated: canvas y counts down the screen and model y counts up, so
         without this the shape is drawn upside down. A cube does not mind; a
         head does. */
      const v = (1 - ((cy + 0.5) / cells) * 2) * view;
      for (let cx = 0; cx < cells; cx++) {
        const u = (((cx + 0.5) / cells) * 2 - 1) * view;

        // Ray origin, pulled back well clear of the shape, in shape space.
        const ox = rt[0][0] * u + rt[0][1] * v + rt[0][2] * -4;
        const oy = rt[1][0] * u + rt[1][1] * v + rt[1][2] * -4;
        const oz = rt[2][0] * u + rt[2][1] * v + rt[2][2] * -4;

        const shade = sample(ox, oy, oz);
        if (shade <= 0) continue;
        const threshold = (BAYER[cy & 7][cx & 7] + 0.5) / 64;
        if (shade <= threshold) continue;

        ctx.fillRect(cx * cell + inset, cy * cell + inset, square, square);
      }
    }
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // One fixed view: the shape still reads, nothing moves.
    draw(restPose[0], restPose[1]);
    return () => {};
  }

  let handle = 0;
  let start: number | null = null;
  const tick = (t: number) => {
    if (start === null) start = t;
    const [ax, ay] = pose((t - start) / 1000);
    draw(ax, ay);
    handle = requestAnimationFrame(tick);
  };
  handle = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(handle);
}
