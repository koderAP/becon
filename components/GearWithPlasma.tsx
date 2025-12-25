import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

interface GearWithPlasmaProps {
    imageSrc: string;
    plasmaIntensity?: number;
    speed?: number;
}

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0.1, 0.0, 0.4];
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

export const GearWithPlasma = ({
    imageSrc,
    plasmaIntensity = 0.4,
    speed = 0.4,
}: GearWithPlasmaProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const renderer = new Renderer({
            webgl: 2,
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        const gl = renderer.gl;

        const color1 = hexToRgb('#151326');
        const color2 = hexToRgb('#24006D');
        const color3 = hexToRgb('#8B5CF6');

        const vertex = `#version 300 es
      precision highp float;
      in vec2 position;
      in vec2 uv;
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }`;

        // Shader that blends gear texture with plasma effect
        const fragment = `#version 300 es
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform sampler2D uTexture;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uPlasmaIntensity;
      uniform float uSpeed;
      out vec4 fragColor;

      // Plasma calculation
      void calcPlasma(out vec4 o, vec2 C) {
        float i, d, z, T = iTime * uSpeed;
        vec3 O = vec3(0.0);
        vec3 p, S;
        vec4 col;

        for (vec2 r = iResolution.xy, Q; ++i < 40.; O += col.w/d*col.xyz) {
          p = z*normalize(vec3(C-.5*r,r.y)); 
          p.z -= 4.; 
          S = p;
          d = p.y-T;

          p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
          Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
          z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
          col = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
        }

        o.xyz = tanh(O/1e4);
      }

      bool finite1(float x){ return !(isnan(x) || isinf(x)); }
      vec3 sanitize(vec3 c){
        return vec3(
          finite1(c.r) ? c.r : 0.0,
          finite1(c.g) ? c.g : 0.0,
          finite1(c.b) ? c.b : 0.0
        );
      }

      void main() {
        // Sample the gear texture
        vec4 gearColor = texture(uTexture, vUv);
        
        // Only process if gear pixel has alpha
        if (gearColor.a < 0.01) {
          fragColor = vec4(0.0);
          return;
        }
        
        // Calculate plasma
        vec4 plasmaRaw = vec4(0.0);
        calcPlasma(plasmaRaw, gl_FragCoord.xy);
        vec3 plasmaRgb = sanitize(plasmaRaw.rgb);
        
        // Map plasma intensity to theme colors
        float intensity = (plasmaRgb.r + plasmaRgb.g + plasmaRgb.b) / 3.0;
        vec3 plasmaColor;
        if (intensity < 0.5) {
          plasmaColor = mix(uColor1, uColor2, intensity * 2.0);
        } else {
          plasmaColor = mix(uColor2, uColor3, (intensity - 0.5) * 2.0);
        }
        
        // Blend plasma onto gear using overlay blend mode
        vec3 gearRgb = gearColor.rgb;
        
        // Overlay blend: combines multiply and screen
        vec3 blended;
        for (int i = 0; i < 3; i++) {
          float base = gearRgb[i];
          float blend = plasmaColor[i];
          if (base < 0.5) {
            blended[i] = 2.0 * base * blend;
          } else {
            blended[i] = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
          }
        }
        
        // Mix original gear with blended based on intensity
        vec3 finalColor = mix(gearRgb, blended, uPlasmaIntensity);
        
        fragColor = vec4(finalColor, gearColor.a);
      }`;

        // Load gear texture
        const texture = new Texture(gl, {
            generateMipmaps: false,
        });
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            texture.image = img;
        };
        img.src = imageSrc;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertex,
            fragment: fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uTexture: { value: texture },
                uColor1: { value: new Float32Array(color1) },
                uColor2: { value: new Float32Array(color2) },
                uColor3: { value: new Float32Array(color3) },
                uPlasmaIntensity: { value: plasmaIntensity },
                uSpeed: { value: speed },
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setSize = () => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));
            renderer.setSize(width, height);
            const res = program.uniforms.iResolution.value as Float32Array;
            res[0] = gl.drawingBufferWidth;
            res[1] = gl.drawingBufferHeight;
        };

        const ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        container.appendChild(gl.canvas);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';

        let raf = 0;
        const t0 = performance.now();
        const loop = (t: number) => {
            const timeValue = (t - t0) * 0.001;
            (program.uniforms.iTime as { value: number }).value = timeValue;
            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            try {
                container?.removeChild(gl.canvas);
            } catch {
                console.warn('Canvas already removed');
            }
        };
    }, [imageSrc, plasmaIntensity, speed]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default GearWithPlasma;
