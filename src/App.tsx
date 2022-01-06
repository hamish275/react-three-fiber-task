import './App.css';
import React from 'react';
import {Canvas, useThree, extend, ReactThreeFiber} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
extend({OrbitControls});

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}

function App() {
  return (
      <Canvas camera={{position: [10, 10, 10]}}>
          <mesh>
              <boxBufferGeometry args={[10, 10, 10]}/>
              <meshPhysicalMaterial wireframe={true}/>
          </mesh>
          <axesHelper args={[30]}/>
          <CameraControls/>
      </Canvas>
  )
}

function CameraControls(){
    const {
        camera,
        gl: { domElement },
    } = useThree();
    return (
        <orbitControls args={[camera, domElement]}/>
    )
}

export default App;
