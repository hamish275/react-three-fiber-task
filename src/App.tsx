import './App.css';
import {Canvas} from "@react-three/fiber";
import {Sky, Stats, OrbitControls} from "@react-three/drei";
import {Physics, usePlane, useSphere } from '@react-three/cannon';

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]
const spheres = [...Array(200)].map(() => ({
        size: getRandomFloatBetween(0.1, 0.5),
        velocity: [getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2)],
        position: [getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5)]
    }));

function App() {
  return (
      <Canvas camera={{position: [10, 5, 15]}} shadows >
          <Physics
              gravity={[0, 0, 0]}
              defaultContactMaterial={{
                  restitution: 1
              }}>
              {spheres.map((props, i) => <Sphere key={i} {...props} />)}
              <Box/>
          </Physics>
          <mesh position={[0, -6, 0]} receiveShadow={true}>
              <boxBufferGeometry args={[15, 2, 15]}/>
              <meshLambertMaterial/>
          </mesh>
          <directionalLight
              position={[-20, 20, -20]}
              intensity={0.5}
              castShadow={true}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
          />
          <ambientLight intensity={0.2}/>
          <OrbitControls/>
          <Stats/>
          <Sky/>
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
        <mesh ref={ref} castShadow={true} receiveShadow={true}>
            <sphereBufferGeometry args={[props.size]} />
            <meshPhysicalMaterial
                color={colors[Math.floor(Math.random()*colors.length)]}
                clearcoat={0.3}
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
            <meshBasicMaterial wireframe={true}/>
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

