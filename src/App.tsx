import './App.css';
import {Canvas} from "@react-three/fiber";
import * as THREE from 'three';
import {Stars, Stats, OrbitControls} from "@react-three/drei";
import {Physics, useBox, usePlane, useSphere } from '@react-three/cannon';

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]
const spheres = [...Array(200)].map(() => ({
        size: getRandomFloatBetween(0.1, 0.5),
        velocity: [getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2)],
        position: [getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5)]
    }));
const cubes = [...Array(20)].map(() => ({
    size: getRandomFloatBetween(0.5, 1),
    velocity: [getRandomFloatBetween(-1, 1), getRandomFloatBetween(-1, 1), getRandomFloatBetween(-2, 2)],
    position: [getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5)]
}));

function App() {
  return (
      <Canvas camera={{position: [10, 10, 10]}}>
          <Physics
              gravity={[0, 0, 0]}
              broadphase="SAP"
              defaultContactMaterial={{
                  restitution: 1
              }}>
              {spheres.map((props, i) => <Sphere key={i} {...props} />)}
              {cubes.map((props, i) => <Cube key={i} {...props} />)}
              <Box/>
          </Physics>
          <directionalLight position={[-10, 10, -5]} intensity={1}/>
          <ambientLight intensity={0.3}/>
          <OrbitControls/>
          <Stats/>
          <Stars/>
      </Canvas>
  )
}

function Sphere(props: any) {
    // apply cannon pyhsics to sphere
    const [ref] = useSphere(() => ({
        args: [props.size],
        mass: props.size,
        ...props,
    }));
    return (
        <mesh ref={ref}>
            <sphereBufferGeometry args={[props.size]} />
            <meshPhysicalMaterial
                color={colors[Math.floor(Math.random()*colors.length)]}
                roughness={1}
                clearcoat={0.5}
            />
        </mesh>
    )
}

function Cube(props: any) {
    // apply cannon physics to cube
    const [ref] = useBox(() => ({
        args: [props.size, props.size, props.size],
        mass: props.size*5,
        ...props,
    }));
    return (
        <mesh ref={ref}>
            <boxBufferGeometry args={[props.size, props.size, props.size]} />
            <meshPhysicalMaterial
                color={colors[Math.floor(Math.random()*colors.length)]}
                roughness={1}
                clearcoat={0.5}
            />
        </mesh>
    )
}

function Plane(props: any) {
    // apply cannon physics to plane
    const [ref] = usePlane(() => ({
        type: "Static", // static body has infinite mass and does not move
        ...props
    }))
    return (
        <mesh ref={ref}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial side={THREE.DoubleSide} wireframe={true}/>
        </mesh>
    )
}

function Box(){
    // 6 planes rotated and translated to form a box
    return (
        <>
            <Plane position={[0, -5, 0]} rotation={[-Math.PI/2, 0, 0]}/>
            <Plane position={[0, 5, 0]} rotation={[Math.PI/2, 0, 0]}/>
            <Plane position={[-5, 0, 0]} rotation={[0, Math.PI/2, 0]}/>
            <Plane position={[5, 0, 0]} rotation={[0, -Math.PI/2, 0]}/>
            <Plane position={[0, 0, -5]} rotation={[0, 0, 0]}/>
            <Plane position={[0, 0, 5]} rotation={[Math.PI, 0, 0]}/>
        </>
    )
}

function getRandomFloatBetween(min: number, max: number){
    return (Math.random() * (max - min) + min)
}

export default App;

