// src/types/three-custom.d.ts
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { extend } from '@react-three/fiber';

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: React.Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
        meshLineMaterial: React.Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
}