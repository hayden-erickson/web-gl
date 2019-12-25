import React, {Component} from 'react';
import {Matrix, matrix, index} from 'mathjs';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
    Object3D,
    Vector3,
    Color,
    MeshPhongMaterial,
    DoubleSide,
    BoxGeometry,
    Mesh,
    WebGLRenderer,
    Camera,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    Raycaster,
    TextureLoader,
    Texture,
    MeshBasicMaterial,
    PlaneGeometry,
    MeshBasicMaterialParameters,
} from 'three';


const v = (x: number, y: number, z: number) => new Vector3(x, y, z)

 function meshColor(color: number) {
     const co = () => new Color(color)
     return new MeshPhongMaterial({
         // light
         specular: co(),
         // intermediate
         color: co().addScalar(-.3),
         // dark
         emissive: co().addScalar(-.8),
         shininess: 50,
         wireframe: false,
         side: DoubleSide,
         //map: ImageUtils.loadTexture('http://i.imgur.com/xCE2Br4.jpg?1')
     });
 }

function getRow(m: Matrix, row: number): number[] {
    return (m.subset(index(row, [0, 1, 2])).toArray() as number[][])[0]
}

function BoxMesh(box: Matrix, color?: number) {
    const [x, y, z] = getRow(box, 0)
    const [w, h, d] = getRow(box, 1)
    const [a, b, c] = getRow(box, 2)

    var geometry = new BoxGeometry(w, h, d)

    geometry.translate(x, y, z)
    geometry.rotateX(a)
    geometry.rotateY(b)
    geometry.rotateZ(c)

    return new Mesh(geometry, meshColor(color || 0xffffff))
 }


function getBeamDataUrl(obj: Object3D, bbox: Matrix, N: number, inv: boolean) {
    const [x, y, z] = getRow(bbox, 0)
    /* const y = getRow(bbox, 0)[1] */
    const [w, h] = getRow(bbox, 1)

    /* // Create canvas */
    let canvas = document.createElement('canvas');
    canvas.height = h;
    canvas.width = w;

    const context = canvas.getContext('2d');
    if( context === null ) return;
    const imgData = context.createImageData(w, h);

    for( let i = 0; i < N; i++) {
        const by = Math.floor(y+(i*(h/N))+h/(2*N))

        const start = by*w*4
        const end = start + w*4

        const srcPos = v(x, (h/2)-by, z)
        const destPos =  v(x + w, (h/2)-by, z)

        const ray = new Raycaster(srcPos, destPos.sub(srcPos).normalize())
        const intersections = ray.intersectObject(obj)

        let opacity = 255
        let attStart = end
        let dist = 0
        let att = 0
        switch( intersections.length ) {
            case 2:
                dist = intersections[1].distance - intersections[0].distance
                att = dist/40
                opacity = inv ? att*255 : (1-att)*255
                attStart = intersections[1].distance
                break;
            case 4:
                dist = intersections[2].distance - intersections[1].distance
                att = dist/40
                opacity = inv ? att*255 : (1-att)*255
                attStart = intersections[2].distance
                break;
        }

        const defVal = inv ? 0 : 255

        for (let j = start; j < end; j+=4) {
            imgData.data[j] = 255
            imgData.data[j+1] = 255
            imgData.data[j+2] = 255
            imgData.data[j+3] = (j-start)/4 >= attStart-2 ? opacity : defVal
        }

    }

    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    return canvas.toDataURL()
}

const Beams = (bbox: Matrix, params?: MeshBasicMaterialParameters) => {
    /* const [x, y, z] = getRow(bbox, 0) */
    const [w, h] = getRow(bbox, 1)
    const geo = new PlaneGeometry(w, h)
    /* geo.translate(x, y, z) */

    const mat = new MeshBasicMaterial( params || {transparent: true, opacity: 0, map: null} );
    return new Mesh(geo, mat)
}

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
        this.camera.position.y = 0
        this.camera.position.z = 100

        var light = new DirectionalLight(0xfdfdfd, 2);
        // you set the position of the light and it shines into the origin
        light.position.set(2, 2, 1).normalize();
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
    rotateBox: (r: number) => void;
    rotateBeamBox: (r: number) => void;
    setRayCount: (n: number) => void;
    invertBeams: () => void;
}

interface InvButtonProps {
    inverted: boolean;
    invert: () => void
}

const InvButton: React.FC<InvButtonProps> = (props: InvButtonProps) => (
    <div style={{padding: '16px'}}>
        <button style={{
            color: props.inverted ? 'white' : 'black',
            backgroundColor: props.inverted ? 'black' : 'white',
            fontSize: '16px',
        }}
            onClick={props.invert}>
            Invert
        </button>
    </div>)

export default class Radon extends Component<RadonProps> {
    rs: RadonScene
    b: Object3D
    bb: Object3D
    screen: Object3D
    tl: TextureLoader
    beamData: string

    constructor(props: RadonProps) {
        super(props)

        const rotateBox = () => {
            this.props.rotateBeamBox(.01)
            requestAnimationFrame(rotateBox)
        }
        requestAnimationFrame(rotateBox)

        this.beamData = ''
        this.tl = new TextureLoader()
        this.b = BoxMesh(this.props.box, 0x0000ff)
        this.bb = Beams(this.props.beamBox)

        const [x, y, z] = getRow(this.props.beamBox, 0)
        const [w, h, d] = getRow(this.props.beamBox, 1)

        this.screen = Beams(matrix([[x+w, y, z],[w,h,d],[0,-Math.PI,0]]), {transparent: false, color: 0xffffff})
        this.rs = new RadonScene([
            this.b,
            this.bb,
        ])
    }

    render() {
        /* this.bb.rotateZ(.01) */
        this.b.rotateZ(.01)

        const h = getRow(this.props.beamBox, 1)[1]
        const maxRayCount = Math.ceil(Math.log2(h))
        const rayCount = Math.pow(2, Math.floor(this.props.numRays))

        const beams = (this.bb as Mesh)
        const beamData = getBeamDataUrl(this.b, this.props.beamBox, rayCount, this.props.inverted)

        // only create new beam image if beams have been updated
        if( beamData && beamData !== this.beamData ) {
            this.tl.load(beamData, (t: Texture) => {
                beams.material = new MeshBasicMaterial({map: t, transparent: true})
            })
            this.beamData = beamData
        }

        return (
            <div>
                <div id='controls' style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px'}}>
                    <h1 style={{color: 'white'}} >{rayCount} Beam{rayCount > 1 ? 's' : ''}</h1>
                    <input type='range' min={0} max={maxRayCount} value={this.props.numRays} onChange={e => this.props.setRayCount(parseInt(e.target.value))} />
                    <InvButton invert={this.props.invertBeams} inverted={this.props.inverted} />
                </div>
                {this.rs.render()}
            </div>)
    }
}
