import React, {Component} from 'react';
import {Matrix, matrix} from 'mathjs';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
    Object3D,
    Mesh,
    WebGLRenderer,
    Camera,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    TextureLoader,
    Texture,
    MeshBasicMaterial,
} from 'three';

import RadonControls from 'containers/controls'

import Inverse from 'containers/inverse'

import {
    BoxMesh,
    Beams,
    getRow,
    getBeamDataUrl,
    getScreenDataUrl,
} from 'components/radon/utils'



class RadonScene {
    webGLRenderer: WebGLRenderer
    camera: Camera
    scene: Scene

    constructor(children: Array<Object3D | Mesh>) {
        this.webGLRenderer = new WebGLRenderer()
        this.webGLRenderer.setSize( window.innerWidth, window.innerHeight )
        this.webGLRenderer.setPixelRatio( window.devicePixelRatio );

        this.scene = new Scene()

        this.camera = new PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 )
        this.camera.position.x = 0
        this.camera.position.y = 20
        this.camera.position.z = 100

        var light = new DirectionalLight(0xfdfdfd, 2);
        // you set the position of the light and it shines into the origin
        light.position.set(-2, 2, 1).normalize();
        this.scene.add(light);
        new OrbitControls(this.camera, this.webGLRenderer.domElement)

        children.forEach(c => this.scene.add(c as Object3D));
    }

    render() {
        this.webGLRenderer.render(this.scene, this.camera)
        return (<div id="scene-container" ref={d => d ? d.appendChild(this.webGLRenderer.domElement) : ""}></div>)
    }
}


interface RadonProps {
    box: Matrix;
    beamBox: Matrix;
    numRays: number;
    inverted: boolean;
    recording: boolean;
    opacities: number[][];
    numAngles: number;
    rotateBox: (n: number) => void;
    saveOpacity: (o: number[]) => void;
    toggleRecording: () => void;
    theta: number;
}

export default class Radon extends Component<RadonProps> {
    rs: RadonScene
    b: Object3D
    bb: Object3D
    screen: Object3D
    tl: TextureLoader
    beamData: string
    // nr = number of angles recorded
    nr: number

    constructor(props: RadonProps) {
        super(props)

        this.beamData = ''
        this.tl = new TextureLoader()
        this.b = BoxMesh(this.props.box, 0x0000ff)
        this.bb = Beams(this.props.beamBox)
        this.nr = 0

        const [x, y, z] = getRow(this.props.beamBox, 0)
        const [w, h, d] = getRow(this.props.beamBox, 1)

        const N = props.opacities.length
        this.screen = Beams(matrix([[x+w/2, y, z+N/2],[N,h,d],[0,-Math.PI/2,0]]))
        this.rs = new RadonScene([
            this.b,
            this.bb,
            this.screen,
        ])

        const rotateBox = (ms: number) => {

            this.b.rotateZ(this.props.theta)
            this.props.rotateBox(this.props.theta)

            const rayCount = Math.pow(2, Math.floor(this.props.numRays))

            const beams = this.bb as Mesh
            const beamData = getBeamDataUrl(this.b, this.props.beamBox, rayCount, {
                inv: this.props.inverted,
                recording: this.props.recording,
                saveOpacity: this.props.saveOpacity,
            })

            // only create new beam image if beams have been updated
            if( beamData && beamData !== this.beamData ) {
                this.tl.load(beamData, (t: Texture) => {
                    beams.material = new MeshBasicMaterial({map: t, transparent: true})
                })
                this.beamData = beamData
            }

            const screen = this.screen as Mesh

            const doneRecording = this.nr === this.props.opacities.length
            if (this.props.recording && doneRecording) {
                this.nr = 0
                this.props.toggleRecording()
            }


            if( this.props.recording ) {
                this.nr += 1
                const screenData = getScreenDataUrl(this.props.beamBox, this.props.opacities, this.props.numAngles)

                this.tl.load(screenData, (t: Texture) => {
                    screen.material = new MeshBasicMaterial({map: t, transparent: true})
                })
            } 

            requestAnimationFrame(rotateBox)
        }

        requestAnimationFrame(rotateBox)
    }

    render() {
        /* this.bb.rotateZ(.01) */

        return (
            <div>
            <div style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                }}>
                <RadonControls />
                <Inverse />
            </div>
                {this.rs.render()}
            </div>)
    }
}
