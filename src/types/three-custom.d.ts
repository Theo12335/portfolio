// src/types/three-custom.d.ts
'use client';

import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: React.Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
        meshLineMaterial: React.Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
}