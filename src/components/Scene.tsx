import { Canvas } from '@react-three/fiber';
import { BackgroundGalaxy, CanvasLoader, Galaxy, GuiProvider } from '@/components';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

const Scene = () => {
  return (
    <GuiProvider>
      <Canvas
        camera={{ position: [4, 5, 10], fov: 50 }}
        shadows
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          shadowMapEnabled: true,
          shadowMapType: THREE.PCFSoftShadowMap,
        }}
      >
        <color attach="background" args={['#000']} />
        <ambientLight intensity={3} color="#445566" />
        <OrbitControls
          enableDamping
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.75}
          minDistance={10}
          maxDistance={25}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 3}
        />

        <Suspense fallback={<CanvasLoader />} name={'Loader'}>
          <Galaxy position={[0, 0, 0]} pRadius={5} pCount={200_000} />

          <Stars radius={100} depth={50} count={50_000} factor={2} saturation={0} fade speed={2} />

          <BackgroundGalaxy
            position={[-500, -250, 0]}
            pRadius={15}
            pCount={5_000}
            outsideColor="#1b3984"
          />
          <BackgroundGalaxy
            position={[100, 20, -50]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#1b3900"
          />
          <BackgroundGalaxy
            position={[120, -100, -150]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#00ffcb"
          />
          <BackgroundGalaxy
            position={[-300, 200, -300]}
            pRadius={10}
            pCount={5_000}
            outsideColor="#ffff84"
          />
          <BackgroundGalaxy
            position={[-500, 100, -200]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#1bffff"
          />
          <BackgroundGalaxy
            position={[500, 2, -50]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#003900"
          />
          <BackgroundGalaxy
            position={[-200, -200, -100]}
            pRadius={20}
            pCount={5_000}
            outsideColor="#0000ff"
          />
          <BackgroundGalaxy
            position={[-100, -20, -400]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#ff39ff"
          />
          <BackgroundGalaxy
            position={[-500, -50, -300]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#8d400b"
          />
          <BackgroundGalaxy
            position={[100, 100, -200]}
            pRadius={10}
            pCount={5_000}
            outsideColor="#ff39ff"
          />
          <BackgroundGalaxy
            position={[-100, 250, -400]}
            pRadius={8}
            pCount={5_000}
            outsideColor="#00ffcb"
          />
        </Suspense>
      </Canvas>
    </GuiProvider>
  );
};

export default Scene;
