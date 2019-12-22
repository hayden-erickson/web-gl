import React, {Component} from 'react';
import {Matrix, index, matrix} from 'mathjs';

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
    Group,
    PerspectiveCamera,
    DirectionalLight,
    /* Raycaster, */
    MeshBasicMaterial,
    TextureLoader,
    PlaneGeometry,
} from 'three';


const v = (x: number, y: number, z: number) => new Vector3(x, y, z)

 function meshColor(color: Vector3) {
     const co = () => new Color(color.x, color.y, color.z)
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

function Box(box: Matrix) {
    const [x, y, z] = getRow(box, 0)
    const [w, h, d] = getRow(box, 1)
    const [a, b, c] = getRow(box, 2)

    var geometry = new BoxGeometry(w, h, d)

    geometry.translate(x, y, z)
    geometry.rotateX(a)
    geometry.rotateY(b)
    geometry.rotateZ(c)

    return new Mesh(geometry, meshColor(v(0, 0, 1)))
 }

const Beams = (obj: Object3D, bbox: Matrix, N: number) => {

    const y = getRow(bbox, 0)[1]
    const [w, h] = getRow(bbox, 1)

    // Create canvas
    let canvas = document.createElement('canvas');
    canvas.height = h;
    canvas.width = w;

    const context = canvas.getContext('2d');
    if( context === null ) return;
    const imgData = context.createImageData(w, h);

    for( let i = 0; i < N; i++) {
        /* const [a, b, c] = getRow(bbox, 2) */

        const by = Math.floor(y+(i*(h/N))+h/(2*N))

        const start = by*w*4
        const end = start + w*4

        for (let j = start; j < end; j+=4) {
            imgData.data[j] = 255
            imgData.data[j+1] = 255
            imgData.data[j+2] = 255
            imgData.data[j+3] = 255
        }

        /* const srcPos = v(x, by, z) */
        /* const destPos =  v(x + w, by, z) */

        /* const ray = new Raycaster(srcPos, destPos.sub(srcPos).normalize()) */
        /* const intersections = ray.intersectObject(obj) */
    }

    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    // output image
    const texture = new TextureLoader().load( canvas.toDataURL('image/png') );

    // immediately use the texture for material creation
    const mat = new MeshBasicMaterial( { map: texture, transparent: true} );
    const geo = new PlaneGeometry(w, h)
    return new Mesh(geo, mat)
}


/* function addXrayBeam(scene: Scene) { */
/*     var srcPos =  v(-200, 0, 0) */
/*     var destPos =  v(200, 0, 0) */
/*     var dist = srcPos.distanceTo(destPos) */
/*   */
/*     var ray = new Raycaster(srcPos, destPos.sub(srcPos).normalize()) */
/*   */
/*     return (obj: Object3D) => { */
/*         var intersections = ray.intersectObject(obj) */
/*         if( intersections.length < 2 ) return; */
/*  */
/*         var first = intersections[0] */
/*         var last = intersections[intersections.length-1] */
/*         var throughObj = last.distance - first.distance  */
/*         var ratio = 10*(throughObj*throughObj)/(dist*dist) */
/*         setBeamOpacity(1 - ratio) */
/*         return ratio */
/*     } */
/* } */

class RadonScene {
    webGLRenderer: WebGLRenderer
    camera: Camera
    scene: Scene
    oc: OrbitControls

    constructor(children: Object3D[]) {
        this.webGLRenderer = new WebGLRenderer()
        this.webGLRenderer.setSize( window.innerWidth, window.innerHeight )
        this.webGLRenderer.setPixelRatio( window.devicePixelRatio );

        this.scene = new Scene()

        this.camera = new PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 )
        this.camera.position.x = 100
        this.camera.position.y = 0
        this.camera.position.z = 0

        console.log('adding orbit controls')

        var light = new DirectionalLight(0xfdfdfd, 2);
        // you set the position of the light and it shines into the origin
        light.position.set(2, 2, 1).normalize();
        this.scene.add(light);
        this.oc = new OrbitControls(this.camera)

        children.forEach(c => this.scene.add(c as Object3D));
    }

    onDrag(f: (e: any) => void) {
        this.oc.addEventListener('drag', f)
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
    rotateBox: (r: number) => void;
    rotateBeamBox: (r: number) => void;
    incRays: () => void
    decRays: () => void
}

function BeamBox(obj: Object3D, bbox: Matrix, N: number): Group {
    const [x, y, z] = getRow(bbox, 0)
    const [w, h, d] = getRow(bbox, 1)
    const [a, b, c] = getRow(bbox, 2)

    const g = new Group()
    const barW = w/100
    const leftBar = Box(matrix([[x, y, z], [barW, h, d], [0, 0, 0]]))
    const rightBar = Box(matrix([[x + w, y, z], [barW, h, d], [0, 0, 0]]))
    

    const beams = Beams(obj, bbox, N)
    if( beams !== undefined) g.add(beams)

    g.add(leftBar)
    g.add(rightBar)

    g.rotateX(a)
    g.rotateY(b)
    g.rotateZ(c)

    return g
}

export default class Radon extends Component<RadonProps> {
    rs: RadonScene
    b: Object3D
    bb: Group

    constructor(props: RadonProps) {
        super(props)
        setInterval(() => this.props.rotateBeamBox(.01), 10)
        this.b = Box(this.props.box)
        this.bb = BeamBox(this.b, this.props.beamBox, this.props.numRays)
        this.rs = new RadonScene([
            this.b,
            this.bb,
        ])
    }

    render() {
        /* this.bb.rotateZ(.01) */
        this.b.rotateX(.01)
        return (
            <div>
                <div id='controls' style={{position: 'absolute'}}>
                    <button onClick={this.props.incRays}>
                        Add Beam
                    </button>
                    <button onClick={this.props.decRays}>
                        Remove Beam
                    </button>
                </div>
                {this.rs.render()}
            </div>)
    }
}
