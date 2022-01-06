import './App.css';
import React from 'react';
import { Canvas } from "@react-three/fiber";

function App() {
  return (
      <Canvas camera={{position: [10, 10, 10]}}>
          <mesh>
              <boxBufferGeometry args={[10, 10, 10]}/>
              <meshPhysicalMaterial wireframe={true}/>
          </mesh>
          <axesHelper args={[30, 30]}/>
      </Canvas>
  )
}

export default App;
