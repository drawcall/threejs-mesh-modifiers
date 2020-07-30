## Threejs mesh modifiers

This is a library of modifiers for three.js objects. A modifier is an function used to modify a 3d object.

It is the typescript version of the [ActionScript](https://en.wikipedia.org/wiki/ActionScript) engine [AS3Dmod](https://code.google.com/archive/p/as3dmod/).

```shell
npm install three three.modifiers --save
```

## Case Demo

[Demo1](https://drawcall.github.io/threejs-mesh-modifiers/example/demo.html)

![horse](https://drawcall.github.io/threejs-mesh-modifiers/example/images/pic1.png)

[Demo2](https://drawcall.github.io/threejs-mesh-modifiers/example/demo2.html)

![newspaper](https://drawcall.github.io/threejs-mesh-modifiers/example/images/pic2.png)

## Modifiers

- Bend – bends on object along an axis
- Bloat – Bloats the mesh by forcing vertices out of specified sphere
- Break
- Cloth - displaces object vertices giving the effects of wind and gravity.
- Noise – deforms an object in a random manner
- Pivot - Pivot is a modifier that changes an object's pivot point.
- Skew – skews an object along one or more axes
- Taper - displaces object vertices on two axes in proportion to their position on the third axis.
- Twist – twists the mesh around it’s center point
- Wheel
- UserDefined - the custom modifier

## Installing

#### Insert script

Download the build at `dist/modifiers.min.js` and include it as a script tag in a web page. You must include `three.js` as well.

```javascript
<script src="./js/three.min.js"></script>
<script src="./js/modifiers.min.js"></script>
```

#### Use npm package

Note you must also have `three` installed via npm.

```javascript
import * as THREE from "three";
import { ModifierStack, Bend } from "three.modifiers";
```

## Usage

```javascript
const modifier = new ModifierStack(mesh);

const bend = new Bend(1.5, 0.2, 0);
bend.constraint = ModConstant.LEFT;

const cloth = new Cloth(1, 0);
cloth.setForce(0.2, -0.2, -0.2);

const twist = new Twist(0);
twist.vector = new Vector3(0, 1, 0);

const taper = new Taper(1);
taper.setFalloff(0.1, 0.5);

modifier.addModifier(bend);
modifier.addModifier(cloth);
modifier.addModifier(twist);
modifier.addModifier(taper);

// animate func
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // modifier.apply
  modifier && modifier.apply();
}
```

## Document

You can find the documentation here.

- [https://code.google.com/archive/p/as3dmod/wikis/AS3Dmod_Tutorial.wiki](https://code.google.com/archive/p/as3dmod/wikis/AS3Dmod_Tutorial.wiki)
- [http://osbo.com/as3dmod/bend/#instructions](http://osbo.com/as3dmod/bend/#instructions)

## Development and Build

```shell
// DEVELOPMENT MODE
npm install
npm run demo
// (vist http://localhost:8888/)

// PRODUCTION MODE
npm run build
```

## License

This library is under the [BSD](https://opensource.org/licenses/BSD-3-Clause) License.
