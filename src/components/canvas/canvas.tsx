import React, {Component, RefObject} from 'react'
import {Matrix} from 'mathjs'

import {createProgram, ProgramProps} from 'webgl/programs/3d'

export class ShaderCanvas extends Component<{u_matrix: Matrix}> {
    canvas: RefObject<HTMLCanvasElement>;
    program?: (p: ProgramProps) => void ;
    
    constructor(props: {u_matrix: Matrix}) {
        super(props)
        this.canvas = React.createRef()
        this.program = undefined;
    }

    componentDidMount() {
        if(this.canvas == null || this.canvas.current == null)
            return;

        var gl:  WebGLRenderingContext | null = this.canvas.current.getContext('webgl')

        if(!gl) {
            console.log("could not create webgl context from canvas")
            return;
        }

        var width = this.canvas.current.clientWidth
        var height = this.canvas.current.clientHeight

        this.program = createProgram(gl);
        this.program({...this.props, width, height})
    }


    render() {
        if(this.program && this.canvas && this.canvas.current) {
            this.program({
                ...this.props,
                width: this.canvas.current.clientWidth,
                height: this.canvas.current.clientHeight,
            });
        }

        return <canvas style={{
            width: '100%',
            height: '100%',
            border: '1px solid black'
        }} ref={this.canvas}></canvas> 
    }
}