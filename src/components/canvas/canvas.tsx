import React, { Component, RefObject } from 'react'
import { Matrix } from 'mathjs'

import { createProgram, ProgramProps } from 'webgl/programs/3d'
import { Vec3 } from 'store/projections/types';

interface ShaderCanvasProps {
    u_matrix: Matrix;
    anchor: Vec3 | null;
    rotation: Vec3;
    originalRotation: Vec3 | null;
    rotationDelta: Vec3 | null;
    changeScale: (delta: number) => void;
    beginDrag: (anchor: Vec3, rotation: Vec3) => void;
    endDrag: (originalRotation: Vec3, rotationDelta: Vec3) => void;
    calculateRotation: (anchor: Vec3, mouse: Vec3, originalRotation: Vec3) => void;
}
export class ShaderCanvas extends Component<ShaderCanvasProps> {
    canvas: RefObject<HTMLCanvasElement>;
    gl?: WebGLRenderingContext;
    modifyAnimationState?: (props: ProgramProps) => void;
    
    constructor(props: ShaderCanvasProps) {
        super(props)
        this.canvas = React.createRef()
    }

    componentDidMount() {
        if(this.canvas == null || this.canvas.current == null)
            return;

        var gl:  WebGLRenderingContext | null = this.canvas.current.getContext('webgl')

        if(!gl) {
            console.log("could not create webgl context from canvas")
            return;
        }

        this.gl = gl;
        this.modifyAnimationState = createProgram(gl, this.props);
    }


    render() {
        if(this.gl !== undefined && this.modifyAnimationState !== undefined) {
            this.modifyAnimationState(this.props);
        }

        return <canvas 
            onWheel={e => this.props.changeScale(e.deltaY) }
            onMouseDown={e => {
                this.props.beginDrag([e.clientX, e.clientY, 0], this.props.rotation)
            }}
            onMouseUp={e => {
                var {originalRotation, rotationDelta} = this.props;
                if(!originalRotation || !rotationDelta) return;
                this.props.endDrag(originalRotation, rotationDelta)
            }}
            onMouseMove={e => {
                var {anchor, originalRotation} = this.props;
                if(!anchor || !originalRotation) return;
                this.props.calculateRotation(anchor, [e.clientX, e.clientY, 0], originalRotation)
            }}
            style={{
                width: '100%',
                height: '100vh',
                border: '1px solid white'
            }} ref={this.canvas}></canvas> 
    }
}