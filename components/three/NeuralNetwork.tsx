"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 2.5;
const MOUSE_INFLUENCE = 0.3;

function Nodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const { positions, velocities, dummy } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: pos, velocities: vel, dummy: new THREE.Object3D() };
  }, []);

  const lineGeometry = useMemo(() => {
    const maxLines = NODE_COUNT * NODE_COUNT;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3)
    );
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(maxLines * 8), 4)
    );
    return geo;
  }, []);

  const handlePointerMove = useCallback(
    (e: THREE.Event & { point: THREE.Vector3 }) => {
      mouseRef.current.x = (e as unknown as { point: THREE.Vector3 }).point.x;
      mouseRef.current.y = (e as unknown as { point: THREE.Vector3 }).point.y;
    },
    []
  );

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    // Update positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      positions[ix] += velocities[ix];
      positions[ix + 1] += velocities[ix + 1];
      positions[ix + 2] += velocities[ix + 2];

      // Mouse influence
      const dx = mouseRef.current.x - positions[ix];
      const dy = mouseRef.current.y - positions[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        positions[ix] += dx * MOUSE_INFLUENCE * 0.01;
        positions[ix + 1] += dy * MOUSE_INFLUENCE * 0.01;
      }

      // Boundaries
      if (Math.abs(positions[ix]) > 6) velocities[ix] *= -1;
      if (Math.abs(positions[ix + 1]) > 4) velocities[ix + 1] *= -1;
      if (Math.abs(positions[ix + 2]) > 3) velocities[ix + 2] *= -1;

      dummy.position.set(positions[ix], positions[ix + 1], positions[ix + 2]);
      const scale = 0.03 + Math.sin(Date.now() * 0.001 + i) * 0.01;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update lines
    const linePositions = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
    const lineColors = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
    let lineIndex = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < CONNECTION_DISTANCE) {
          const alpha = 1 - d / CONNECTION_DISTANCE;
          const pi = lineIndex * 6;
          const ci = lineIndex * 8;

          linePositions.array[pi] = positions[i * 3];
          linePositions.array[pi + 1] = positions[i * 3 + 1];
          linePositions.array[pi + 2] = positions[i * 3 + 2];
          linePositions.array[pi + 3] = positions[j * 3];
          linePositions.array[pi + 4] = positions[j * 3 + 1];
          linePositions.array[pi + 5] = positions[j * 3 + 2];

          // Blue color with alpha
          lineColors.array[ci] = 0.231;
          lineColors.array[ci + 1] = 0.51;
          lineColors.array[ci + 2] = 0.965;
          lineColors.array[ci + 3] = alpha * 0.4;
          lineColors.array[ci + 4] = 0.231;
          lineColors.array[ci + 5] = 0.51;
          lineColors.array[ci + 6] = 0.965;
          lineColors.array[ci + 7] = alpha * 0.4;

          lineIndex++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    linePositions.needsUpdate = true;
    lineColors.needsUpdate = true;
  });

  return (
    <group>
      {/* Invisible plane for mouse tracking */}
      <mesh visible={false} onPointerMove={handlePointerMove}>
        <planeGeometry args={[20, 12]} />
        <meshBasicMaterial />
      </mesh>

      {/* Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} />
      </instancedMesh>

      {/* Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export function NeuralNetworkCanvas() {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Nodes />
      </Canvas>
    </div>
  );
}
