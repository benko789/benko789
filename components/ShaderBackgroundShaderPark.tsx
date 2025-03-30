'use client';
// @ts-ignore
import {sculptToMinimalRenderer} from 'shader-park-core';

import {useEffect, useRef} from 'react';
import {spCode} from '../spCode.js';

export const ShaderBackgroundShaderPark = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<WebGLRenderer>(null);
    var b_test = false;

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl2');
        if (!gl) return;
        
        // const devicePixelRatio = window.devicePixelRatio || 1;
        // canvas.width = 200;
        // canvas.height = 200;
        // canvas.width = 200 * devicePixelRatio;
        // canvas.height = 200 * devicePixelRatio;
        
        // let state = {
        //     buttonHover: 0.0,
        //     currButtonHover: 0.0,
        //     click: 0.0,
        //     currClick: 0.0
        // };
        // let test = 5;
        
        // canvas.addEventListener('mouseover', () => state.buttonHover = 5, false);
        // canvas.addEventListener('mouseout', () => state.buttonHover = 0.0, false);
        // canvas.addEventListener('mousedown', () => state.click = 1.0, false);
        // canvas.addEventListener('mouseup', () => state.click = 0.0, false);
        
        // Debugging: Check if the shader program is created and linked correctly
        console.log("Shader Program:", gl.CURRENT_PROGRAM);
        // console.log("Shader Program Log:", gl.getProgramInfoLog(gl.CURRENT_PROGRAM));

        // This converts your Shader Park code into a shader and renders it to the my-canvas element
        // sculptToMinimalRenderer(canvas, spCode, () => {
        //     state.currButtonHover = state.currButtonHover*.999 + state.buttonHover*.001;
        //     state.currClick = state.currClick*.92 + state.click*.08;
        //     return {
        //         'buttonHover' : state.currButtonHover,
        //         'click' : state.currClick
        //     };
        // // });
        // if (b_test) { 
        //     sculptToMinimalRenderer(canvas, spCode);
        //     b_test = true;
        // }
        
        const temp = sculptToMinimalRenderer(canvas, spCode);
        rendererRef.current = temp.renderer;

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // gl.viewport(0, 0, canvas.width, canvas.height);
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            canvasRef.current = null;
        };

    }, [b_test]);


    return (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 size-fit"
        //   className="fixed top-1/2 left-1/2 -z-10 shader-background"
        />
      );
  }; 