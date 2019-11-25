import React, {Component, RefObject} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Vec3 } from 'store/projections/types';
import { Color } from 'three';



function meshColor(color: Vec3) {
    const co = () => new Color(...color)
    return new THREE.MeshPhongMaterial({
        // light
        specular: co(),
        // intermediate
        color: co().addScalar(-.3),
        // dark
        emissive: co().addScalar(-.8),
        shininess: 50,
        wireframe: false,
        //map: THREE.ImageUtils.loadTexture('http://i.imgur.com/xCE2Br4.jpg?1')
    });
}

function addBoxToScene(scene: THREE.Scene, position: Vec3 = [0, 0, 0], color: Vec3 = [0, 0, 1], size: Vec3 = [10, 10, 10]) {
    var geometry = new THREE.BoxGeometry(...size)
    geometry.translate(...position)
    var box = new THREE.Mesh(geometry, meshColor(color))
    scene.add(box)

    return box
}

function addBeam(scene: THREE.Scene) {
    var geo = new THREE.CylinderGeometry( 1, 1, 200, 32, 200, true );
    geo.rotateZ(Math.PI/2)
    geo.translate(-100, 0, 0)
    var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
    var cylinder = new THREE.Mesh(geo, mat)

    scene.add( cylinder );

    geo = new THREE.CylinderGeometry( 1, 1, 200, 32, 200, true );
    geo.rotateZ(Math.PI/2)
    geo.translate(100, 0, 0)
    mat = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: .5, transparent: true});
    cylinder = new THREE.Mesh(geo, mat)

    scene.add( cylinder );

    return (opacity: number) => mat.opacity = opacity
}

function addXrayBeam(scene: THREE.Scene) {
    addBoxToScene(scene, [200, 0, 0], [0, 1, 0])
    addBoxToScene(scene, [-200, 0, 0], [0, 1, 0])
    return addBeam(scene)
}

function addObjectBlockingBeam(scene: THREE.Scene) {
    var box = addBoxToScene(scene, [0, 0, 0], [0, 1, 1], [20, 40, 10])

    return (theta: number) => box.rotateZ(theta)
}

export default class RadonScene extends Component {
    comp: RefObject<HTMLDivElement>

    constructor(props: {}) {
        super(props)
        this.comp = React.createRef()
    }

    componentDidMount() {
        if( !this.comp || !this.comp.current ) return;

        var renderer = new THREE.WebGLRenderer()
        renderer.setSize( window.innerWidth, window.innerHeight )
        var scene = new THREE.Scene()
        
        const setBeamOpacity = addXrayBeam(scene)
        const rotateObject = addObjectBlockingBeam(scene)
        
        var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 )
        camera.position.z = 250;
        camera.position.x = 0
        camera.position.y = 0;

        new OrbitControls(camera)
        renderer.setPixelRatio( window.devicePixelRatio );

        var light = new THREE.DirectionalLight(0xfdfdfd, 2);
        // you set the position of the light and it shines into the origin
        light.position.set(2, 2, 1).normalize();
        scene.add(light);

        this.comp.current.appendChild(renderer.domElement)

        var opacity = .5

        function animate() {
            setBeamOpacity(opacity)
            rotateObject(.01)
            opacity = (opacity + .001)%1
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();
    }

    render() {
        return <div ref={this.comp}></div>
    }
}