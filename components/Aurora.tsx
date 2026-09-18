"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

/**
 * A slow aurora, after the React Bits component of the same name. Ported to
 * TypeScript; the shader and the prop names are upstream's.
 *
 * Two changes, both about living on a page rather than filling a hero:
 *
 *   · It only runs while it is on screen. An IntersectionObserver stops the
 *     frame loop when the band scrolls away, which matters here because this
 *     page already has four other animations competing for the same frame.
 *   · Reduced motion draws one frame and stops, so the gradient is still there
 *     and nothing moves.
 */
export interface AuroraProps {
  /**
   * Three colours, left to right. A value beginning `--` is read off the host
   * element as a custom property, so the band can be given tokens rather than
   * hexes copied out of the token file.
   */
  colorStops?: [string, string, string];
  speed?: number;
  blend?: number;
  amplitude?: number;
  /** Mixes toward white instead of compositing additively — for light pages. */
  lightMode?: boolean;
  className?: string;
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

export function Aurora({
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  speed = 1,
  blend = 0.5,
  amplitude = 1,
  lightMode = false,
  className,
}: AuroraProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  /* Live props the loop reads each frame, so retuning the aurora does not
     rebuild the GL context. */
  const live = useRef({ colorStops, speed, blend, amplitude, lightMode });
  useEffect(() => {
    live.current = { colorStops, speed, blend, amplitude, lightMode };
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: Renderer;
    let gl: any;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
      });
      gl = renderer.gl;
      if (!gl) return;
    } catch (err) {
      // WebGL context may not be supported or available in all environments
      return;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    gl.canvas.style.display = "block";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    /* Tokens resolve here rather than in a caller's effect: this is the only
       place with an element to read them from, and doing it per frame keeps a
       theme change live without a rebuild. */
    const hostStyle = getComputedStyle(host);
    const resolve = (stop: string) =>
      stop.startsWith("--")
        ? hostStyle.getPropertyValue(stop).trim() || "#000000"
        : stop;

    const toRgb = (stops: readonly string[]) =>
      stops.map((stop) => {
        const c = new Color(resolve(stop));
        return [c.r, c.g, c.b];
      });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: toRgb(colorStops) },
        uResolution: { value: [host.offsetWidth, host.offsetHeight] },
        uBlend: { value: blend },
        uLightMode: { value: lightMode ? 1 : 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    host.appendChild(gl.canvas);

    const resize = () => {
      const width = host.offsetWidth;
      const height = host.offsetHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const draw = (t: number) => {
      const p = live.current;
      program.uniforms.uTime.value = t * 0.01 * p.speed * 0.1;
      program.uniforms.uAmplitude.value = p.amplitude;
      program.uniforms.uBlend.value = p.blend;
      program.uniforms.uLightMode.value = p.lightMode ? 1 : 0;
      program.uniforms.uColorStops.value = toRgb(p.colorStops);
      renderer.render({ scene: mesh });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0);
      return () => {
        ro.disconnect();
        if (gl.canvas.parentNode === host) host.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    /* Only while it is on screen: this page already runs four other animations
       and there is no reason for a band above the fold's end to keep a WebGL
       context busy once it has scrolled away. */
    let frame = 0;
    let running = false;
    const tick = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      if (gl.canvas.parentNode === host) host.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // Colour and motion changes are picked up through `live`, not a rebuild.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}

export default Aurora;
