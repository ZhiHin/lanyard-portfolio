/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, extend, type ThreeElement, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, type RigidBodyProps, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

// GitHub Pages serves this project from /lanyard-portfolio rather than the
// domain root. Keep public assets under that same base path in production.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const publicAsset = (path: string) => `${publicBasePath}${path}`;
const cardGLB = publicAsset("/card.glb");
const lanyardTexture = publicAsset("/evolyst-lanyard-texture.png");
const cardTexturePath = publicAsset("/card-base-dark.png");

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

export default function ThreeLanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  containerClassName = "three-lanyard",
}: {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  containerClassName?: string;
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [canvasKey, setCanvasKey] = useState(0);
  const recoveryTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => () => {
    if (recoveryTimer.current !== undefined) window.clearTimeout(recoveryTimer.current);
  }, []);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(new THREE.Color(0x000000), 0);
    gl.domElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      if (recoveryTimer.current !== undefined) window.clearTimeout(recoveryTimer.current);
      recoveryTimer.current = window.setTimeout(() => setCanvasKey((key) => key + 1), 160);
    }, { once: true });
  }, []);

  return <div className={containerClassName} aria-label="Interactive 3D lanyard. Drag the card to move it.">
    <Canvas
      key={canvasKey}
      camera={{ position, fov }}
      dpr={[1, isMobile ? 1.25 : 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={handleCreated}
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
        <Band isMobile={isMobile} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  </div>;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: { maxSpeed?: number; minSpeed?: number; isMobile?: boolean }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps: any = { type: "dynamic" as RigidBodyProps["type"], canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardTexture) as THREE.Texture;
  const cardTexture = useTexture(cardTexturePath) as THREE.Texture;
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useEffect(() => {
    cardTexture.flipY = false;
    cardTexture.colorSpace = THREE.SRGBColorSpace;
    cardTexture.needsUpdate = true;
  }, [cardTexture]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => { document.body.style.cursor = "auto"; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return <>
    <group position={[0, 4, 0]}>
      <RigidBody ref={fixed} {...segmentProps} type={"fixed" as RigidBodyProps["type"]} />
      <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" as RigidBodyProps["type"] : "dynamic" as RigidBodyProps["type"]}>
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <group
          scale={2.25}
          position={[0, -1.2, -0.05]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={(event: any) => { event.target.releasePointerCapture(event.pointerId); drag(false); }}
          onPointerDown={(event: any) => { event.target.setPointerCapture(event.pointerId); drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation()))); }}
        >
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial map={cardTexture} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
          </mesh>
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </RigidBody>
    </group>
    <mesh ref={band}>
      <meshLineGeometry />
      <meshLineMaterial args={[{ color: "white", resolution: new THREE.Vector2(1000, isMobile ? 2000 : 1000), useMap: 1, map: texture, repeat: new THREE.Vector2(-4, 1), lineWidth: 1 }]} depthTest={false} />
    </mesh>
  </>;
}
