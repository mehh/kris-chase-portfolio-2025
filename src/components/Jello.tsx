"use client";

import React, { useEffect } from "react";

export default function Jello() {
  useEffect(() => {
    // Dynamically import CurtainsJS to avoid SSR issues
    const loadCurtains = async () => {
      try {
        const { Curtains } = await import('curtainsjs');
        
        console.log('CurtainsJS loaded, setting up WebGL...');
        
        // Set up WebGL context
        const footerWebGLCurtain = new Curtains({
          container: "footer-canvas",
          premultipliedAlpha: true,
          watchScroll: false,
          production: false // Enable debug mode
        });

        // Track mouse positions
        const mousePosition = { x: 0, y: 0 };

        // Error handling
        footerWebGLCurtain.onError(() => {
          document.body.classList.add("no-curtains");
        }).onContextLost(() => {
          footerWebGLCurtain.restoreContext();
        });

        // Find hover plane elements and add canvas containers
        const hoverPlaneElements = document.querySelectorAll(".hover-plane");
        const hoverPlanes: any[] = [];
        
        console.log('Found hover plane elements:', hoverPlaneElements.length);
        
        if (hoverPlaneElements.length === 0) {
          console.warn('No .hover-plane elements found!');
          return;
        }
        
        hoverPlaneElements.forEach((element, index) => {
          console.log(`Setting up hover plane ${index}:`, element);
          
          // Ensure the element has proper positioning for WebGL
          (element as HTMLElement).style.position = 'relative';
          (element as HTMLElement).style.overflow = 'hidden';
        });

        // Vertex shader
        const hoverVs = `
          #ifdef GL_ES
          precision mediump float;
          #endif
          
          attribute vec3 aVertexPosition;
          attribute vec2 aTextureCoord;
          
          uniform mat4 uMVMatrix;
          uniform mat4 uPMatrix;
          uniform mat4 uTextureMatrix0;
          uniform float uTime;
          uniform vec2 uMousePosition;
          uniform float uMouseStrength;
          
          varying vec3 vVertexPosition;
          varying vec2 vTextureCoord;
          
          void main() {
            vec3 vertexPosition = aVertexPosition;
            
            float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));
            float rippleFactor = 8.0;
            float rippleEffect = cos(rippleFactor * (distanceFromMouse - (uTime / 50.0)));
            float distortionEffect = rippleEffect * uMouseStrength;
            
            vertexPosition += distortionEffect / 105.0;
            
            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
            vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
            vVertexPosition = vertexPosition;
          }
        `;

        // Fragment shader
        const hoverFs = `
          #ifdef GL_ES
          precision mediump float;
          #endif
          
          varying vec3 vVertexPosition;
          varying vec2 vTextureCoord;
          uniform sampler2D uSampler0;
          
          void main() {
            vec2 textureCoords = vTextureCoord;
            vec4 finalColor = texture2D(uSampler0, textureCoords);
            finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);
            gl_FragColor = finalColor;
          }
        `;

        // Shader parameters
        const hoverParams = {
          vertexShader: hoverVs,
          fragmentShader: hoverFs,
          widthSegments: 20,
          heightSegments: 20,
          scale: { x: 4, y: 4 },
          uniforms: {
            time: {
              name: "uTime",
              type: "1f",
              value: 0,
            },
            mousePosition: {
              name: "uMousePosition",
              type: "2f",
              value: [mousePosition.x, mousePosition.y],
            },
            mouseStrength: {
              name: "uMouseStrength",
              type: "1f",
              value: 0,
            },
          }
        };

        // Create planes for hover elements with mouse interaction
        hoverPlaneElements.forEach((element, index) => {
          try {
            console.log(`Creating WebGL plane for element ${index}`);
            
            const plane = footerWebGLCurtain.addPlane(element, hoverParams);
            
            if (plane) {
              console.log(`WebGL plane ${index} created successfully`);
              hoverPlanes.push(plane);
              
              // Add mouse interaction for ripple effects
              let mouseStrength = 0;
              
              element.addEventListener('mouseenter', () => {
                console.log(`Mouse entered plane ${index}`);
                mouseStrength = 0.5;
                plane.uniforms.mouseStrength.value = mouseStrength;
              });
              
              element.addEventListener('mouseleave', () => {
                console.log(`Mouse left plane ${index}`);
                mouseStrength = 0;
                plane.uniforms.mouseStrength.value = mouseStrength;
              });
              
              element.addEventListener('mousemove', (e: Event) => {
                const mouseEvent = e as MouseEvent;
                const rect = element.getBoundingClientRect();
                const x = ((mouseEvent.clientX - rect.left) / rect.width) * 2 - 1;
                const y = -((mouseEvent.clientY - rect.top) / rect.height) * 2 + 1;
                
                plane.uniforms.mousePosition.value = [x, y];
              });
              
              // Animate time uniform for ripple effect
              plane.onRender(() => {
                plane.uniforms.time.value += 1;
              });
            } else {
              console.warn(`Failed to create WebGL plane for element ${index}`);
            }
          } catch (error) {
            console.error(`Error creating WebGL plane ${index}:`, error);
          }
        });

        // Cleanup function
        return () => {
          hoverPlanes.forEach(plane => {
            if (plane && plane.remove) {
              plane.remove();
            }
          });
          if (footerWebGLCurtain) {
            footerWebGLCurtain.dispose();
          }
        };
      } catch (error) {
        console.warn('CurtainsJS not available:', error);
        document.body.classList.add("no-curtains");
      }
    };

    loadCurtains();
  }, []);

  return (
    <>
      <div id="footer-canvas" className="fixed inset-0 pointer-events-none z-0" />
    </>
  );
}
