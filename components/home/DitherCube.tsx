"use client";

import { useEffect, useRef } from "react";
import { mountDither, type Sampler } from "./dither";

/**
 * A rotating cube drawn as an ordered-dither field of squares.
 *
 * The field, the rotation and the frame loop are `mountDither`'s; what is here
 * is the cube itself — one ray against one box, analytically (the slab method),
 * which is why the edges are exact rather than antialiased into grey and then
 * dithered into mush.
 */

/**
 * Half-extent of the view box in cube units. The cube's longest diagonal is
 * √3 ≈ 1.73, so anything at or above that keeps every corner on screen through
 * a full rotation instead of clipping at the halfway point.
 */
const VIEW = 1.95;

/** Direction the light comes from, normalised. Above and to the right. */
const LIGHT = [0.42, 0.68, -0.6] as const;

/** How close to a face's border counts as an edge seam, in cube units. */
const SEAM = 0.045;

/**
 * Half-extent of a sub-cube and how far its centre sits from the origin, when
 * the cube is split. The gap between the two is what keeps the eight reading
 * as eight rather than as one solid block: at 0.46 against 0.52 there is a
 * 0.12 channel down each seam, about two dither cells wide at this size.
 */
const PART_HALF = 0.46;
const PART_OFF = 0.52;

export function DitherCube({
  size = 200,
  parts = 1,
  className,
}: {
  size?: number;
  /** 1 draws one cube; 2 splits it into a 2x2x2 of eight. */
  parts?: 1 | 2;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const half = parts === 2 ? PART_HALF : 1;
    const centres: Array<[number, number, number]> =
      parts === 2
        ? [-PART_OFF, PART_OFF].flatMap((x) =>
            [-PART_OFF, PART_OFF].flatMap((y) =>
              [-PART_OFF, PART_OFF].map(
                (z) => [x, y, z] as [number, number, number],
              ),
            ),
          )
        : [[0, 0, 0]];

    const frame = (
      dx: number,
      dy: number,
      dz: number,
      lx: number,
      ly: number,
      lz: number,
    ): Sampler => {
      const idx = dx !== 0 ? 1 / dx : Infinity;
      const idy = dy !== 0 ? 1 / dy : Infinity;
      const idz = dz !== 0 ? 1 / dz : Infinity;

      return (ox, oy, oz) => {
        /* Slab test against each sub-cube, keeping the nearest hit: with eight
           of them a ray can cross several, and the one it meets first is the
           one that is actually visible. One cube is just the same loop with a
           single box in it. */
        let bestT = Infinity;
        let bestAxis = -1;
        let bestC: [number, number, number] = centres[0];

        for (const c of centres) {
          const px0 = ox - c[0];
          const py0 = oy - c[1];
          const pz0 = oz - c[2];

          let tNear = -Infinity;
          let tFar = Infinity;
          let axis = 0;

          let t1 = (-half - px0) * idx;
          let t2 = (half - px0) * idx;
          let lo = Math.min(t1, t2);
          let hi = Math.max(t1, t2);
          if (lo > tNear) {
            tNear = lo;
            axis = 0;
          }
          if (hi < tFar) tFar = hi;

          t1 = (-half - py0) * idy;
          t2 = (half - py0) * idy;
          lo = Math.min(t1, t2);
          hi = Math.max(t1, t2);
          if (lo > tNear) {
            tNear = lo;
            axis = 1;
          }
          if (hi < tFar) tFar = hi;

          t1 = (-half - pz0) * idz;
          t2 = (half - pz0) * idz;
          lo = Math.min(t1, t2);
          hi = Math.max(t1, t2);
          if (lo > tNear) {
            tNear = lo;
            axis = 2;
          }
          if (hi < tFar) tFar = hi;

          if (tFar < tNear || tFar < 0) continue;
          if (tNear < bestT) {
            bestT = tNear;
            bestAxis = axis;
            bestC = c;
          }
        }

        if (bestAxis < 0) return 0;
        const tNear = bestT;
        const axis = bestAxis;

        // Face normal: the entered slab, facing back along the ray.
        let nx = 0;
        let ny = 0;
        let nz = 0;
        if (axis === 0) nx = dx > 0 ? -1 : 1;
        else if (axis === 1) ny = dy > 0 ? -1 : 1;
        else nz = dz > 0 ? -1 : 1;

        const lambert = Math.max(0, nx * lx + ny * ly + nz * lz);
        let shade = 0.2 + 0.8 * lambert;

        /* Darken the last sliver of each face so the seams between them stay
           legible once the field is dithered — without this the two lit faces
           merge into one bright mass at some angles. */
        const px = ox + tNear * dx - bestC[0];
        const py = oy + tNear * dy - bestC[1];
        const pz = oz + tNear * dz - bestC[2];
        const e0 = axis === 0 ? 1 : half - Math.abs(px);
        const e1 = axis === 1 ? 1 : half - Math.abs(py);
        const e2 = axis === 2 ? 1 : half - Math.abs(pz);
        const edge = Math.min(e0, e1, e2);
        if (edge < SEAM) shade *= 0.18 + 0.82 * (edge / SEAM);

        return shade;
      };
    };

    return mountDither(canvas, {
      size,
      view: VIEW,
      light: LIGHT,
      frame,
      pose: (s) => [0.45 - Math.sin(s * 0.28) * 0.2, s * 0.42],
      restPose: [0.5, 0.7],
    });
  }, [size, parts]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="A cube turning slowly, drawn as a field of dots"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
