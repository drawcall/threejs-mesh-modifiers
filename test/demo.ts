import {
    ModifierStack,
    Taper,
    Noise,
    Bend,
    Bloat,
    Break,
    Cloth,
    Pivot,
    Wheel,
    Twist,
    Skew,
    UserDefined,
    ModConstant
} from "../src/";

declare var THREE: any;
declare var TweenMax: any;

class Main {

    private camera: any;
    private scene: any;
    private cube: any;
    private plane: any;
    private renderer: any;
    private modifier: ModifierStack;

    constructor() {

    }

    public init() {
        this.initThree();
        this.initLight();
        this.initControl();
        this.addMesh();
        this.addModifier();

        this.animate();
    }

    public initThree() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 500;
        this.camera.position.x = 500;
        this.camera.position.y = 150;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xccccff);
        document.body.appendChild(this.renderer.domElement);
    }

    public initLight() {
        let light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(100, 100, 50);
        this.scene.add(light);
    }

    public initControl() {
        let cameraControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        cameraControls.target.set(0, 0, 0);
    }

    public addMesh() {
        //cube
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200, 12, 12, 12),
            new THREE.MeshLambertMaterial({ color: 0xffffff })
        );
        this.cube.position.y = 150;
        this.cube.position.x = 150;
        this.scene.add(this.cube);

        //plane
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(400, 400, 15, 15, true),
            new THREE.MeshLambertMaterial({ color: 0x00cc44, side: THREE.DoubleSide })
        );
        this.plane.position.y = 100;
        this.plane.position.z = 150;
        this.plane.position.x = -150;
        //this.plane.rotation.x = - Math.PI / 2;
        this.scene.add(this.plane);

        //ground
        let ground = new THREE.Mesh(
            new THREE.PlaneGeometry(1200, 1200, 1, 1),
            new THREE.MeshLambertMaterial({ color: 0xFF62B0, side: THREE.DoubleSide })
        );
        ground.position.y = -0.5;
        ground.rotation.x = - Math.PI / 2;
        this.scene.add(ground);
    }

    public addModifier() {
        this.modifier = new ModifierStack(this.cube);
        //this.modifier = new ModifierStack(this.plane);
        
        //this.modifier.uvsAndColorUpdate = true;

        //bend
        let bend = new Bend(0, 0, 70);
        bend.constraint = ModConstant.LEFT;
        //this.modifier.addModifier(bend);

        //bloat boom
        let bloat = new Bloat();
        bloat.center = this.cube.position;
        bloat.radius = 200;
        //this.modifier.addModifier(bloat);

        //break
        let breaks = new Break(1, 10);
        //this.modifier.addModifier(breaks);

        //cloth
        let cloth = new Cloth(1, 0);
        //this.modifier.addModifier(cloth);
        cloth.setForce(0.2, -0.2, -0.2);
        //cloth.lockXMin();

        //noise
        let noise: Noise = new Noise(0);
        //this.modifier.addModifier(noise);

        //cloth
        let pivot = new Pivot(1, 1, 0);
        //this.modifier.addModifier(pivot);

        let skew: Skew = new Skew(5);
        //this.modifier.addModifier(this.skew);

        //taper
        let taper: Taper = new Taper(2);
        //taper.setFalloff(0.2, 0.5);
        //this.modifier.addModifier(taper);

        //twist
        let twist: Twist = new Twist(3);
        //this.modifier.addModifier(twist);

        //taper
        let wheel: Wheel = new Wheel();
        this.modifier.addModifier(wheel);

        let userDefined: UserDefined = new UserDefined();
        userDefined.renderVector = (vec) => {
            vec.setValue(ModConstant.X, 1);
        }
        //this.modifier.addModifier(userDefined);

        //////////////////  TWEEN  //////////////////
        TweenMax.to(wheel, 10, {
            speed: .1,
            turn: 1
        });

        TweenMax.to(twist, 10, {
            angle: 0
        });

        TweenMax.to(taper, 10, {
            power: 10,
            frc: 0
        });

        TweenMax.to(bend, 10, {
            force: 1
        });

        TweenMax.to(noise, 10, {
            frc: 50
        });

        TweenMax.to(breaks, 10, {
            angle: 1
        });
    }

    public animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.modifier.apply();
    }
}


let main = new Main();
main.init();
