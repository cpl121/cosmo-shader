import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import vert from '@/shaders/basic.vert';
import frag from '@/shaders/basic.frag';

const Galaxy = ({
  position,
  pRadius,
  pCount,
}: {
  position: [x: number, y: number, z: number];
  pRadius: number;
  pCount: number;
}) => {
  const pointsRef = useRef(null);
  const { gl } = useThree();

  const parameters = {
    branches: 4,
    spin: 2,
    randomness: 0.2,
    randomnessPower: 1.75,
    insideColor: '#bc4b00',
    outsideColor: '#38ffb9',
  };

  const { geometry, uniforms } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);
    const scales = new Float32Array(pCount);
    const randomness = new Float32Array(pCount * 3);

    const insideColor = new THREE.Color(parameters.insideColor);
    const outsideColor = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * pRadius;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
      const spinAngle = radius * parameters.spin;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = insideColor.clone().lerp(outsideColor, radius / pRadius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random();
      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: 30 * gl.getPixelRatio() },
    };

    return { geometry, uniforms };
  }, [gl, parameters, pCount, pRadius]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  console.log(geometry.attributes.position.count);

  return (
    <points ref={pointsRef} geometry={geometry} position={position}>
      <shaderMaterial
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
      />
    </points>
  );
};

export default Galaxy;
