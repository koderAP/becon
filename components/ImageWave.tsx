import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

interface ImageWaveProps {
    imageSrc: string;
    speed?: number;
    intensity?: number;
}

export const ImageWave = ({
    imageSrc,
    speed = 0.8,
    intensity = 0.02,
}: ImageWaveProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const renderer = new Renderer({ antialias: true, alpha: false });
        const gl = renderer.gl;

        const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        // Sharp silk cloth distortion - no color alterations
        const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform float uIntensity;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float time = uTime;
        
        // Shift wave center to right side (0.6 instead of 0.5)
        // and tilt wave axis towards right
        vec2 center = vec2(0.65, 0.5);
        vec2 shifted = uv - center;
        
        // Rotate wave axis - tilt towards right (about 20 degrees)
        float angle = 0.35; // radians, tilts right
        vec2 rotated;
        rotated.x = shifted.x * cos(angle) - shifted.y * sin(angle);
        rotated.y = shifted.x * sin(angle) + shifted.y * cos(angle);
        
        // Use rotated coordinates for wave calculation
        float waveCoord = rotated.x * 5.0 + rotated.y * 2.0;
        
        // Primary silk wave - large flowing motion
        float wave1 = sin(waveCoord - time * 1.5) * 0.5;
        wave1 += sin(waveCoord * 0.7 - time * 1.2) * 0.3;
        
        // Secondary ripples
        float wave2 = sin(waveCoord * 1.8 - time * 2.0) * 0.15;
        
        // Combine waves
        float displacement = (wave1 + wave2) * uIntensity;
        
        // Apply displacement along wave direction
        vec2 distortedUv = uv;
        distortedUv.x += displacement * cos(angle);
        distortedUv.y += displacement * sin(angle) * 0.5;
        
        // Strict UV clamping - no edge artifacts
        distortedUv = clamp(distortedUv, 0.0, 1.0);
        
        // Sample texture - pure color, no modifications
        gl_FragColor = texture2D(uTexture, distortedUv);
      }
    `;

        // Load texture
        const texture = new Texture(gl);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            texture.image = img;
        };
        img.src = imageSrc;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: texture },
                uIntensity: { value: intensity },
            }
        });
        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
        window.addEventListener('resize', resize);
        resize();

        let animationId: number;
        function update(t: number) {
            animationId = requestAnimationFrame(update);
            (program.uniforms.uTime as { value: number }).value = t * 0.001 * speed;
            renderer.render({ scene: mesh });
        }
        animationId = requestAnimationFrame(update);

        container.appendChild(gl.canvas);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (gl.canvas.parentElement) {
                gl.canvas.parentElement.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [imageSrc, speed, intensity]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        />
    );
};

export default ImageWave;
