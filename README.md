## Threejs geometry modifiers
This is a library of modifiers for three.js objects. A modifier is an function used to modify a 3d object.   

It is the typescript version of the actionscript3.0 engine [AS3Dmod](https://code.google.com/archive/p/as3dmod/).

## Case Demo
[Demo1](https://drawcall.github.io/threejs-geometry-modifiers/example/demo.html) 

![horse](https://drawcall.github.io/threejs-geometry-modifiers/example/images/pic1.png)

[Demo2](https://drawcall.github.io/threejs-geometry-modifiers/example/demo2.html) 

![newspaper](https://drawcall.github.io/threejs-geometry-modifiers/example/images/pic2.png)

## Modifiers

* Bend – bends on object along an axis
* Bloat – Bloats the mesh by forcing vertices out of specified sphere
* Break
* Cloth - displaces object vertices giving the effects of wind and gravity.
* Noise – deforms an object in a random manner
* Pivot - Pivot is a modifier that changes an object's pivot point.
* Skew – skews an object along one or more axes
* Taper - displaces object vertices on two axes in proportion to their position on the third axis.
* Twist – twists the mesh around it’s center point
* Wheel
* UserDefined - the custom modifier

## Usage

#### Development and Build

```
npm install
npm start  /*DEVELOPMENT MODE*/
(vist http://localhost:8888/)
npm run build /*PRODUCTION MODE*/
```

#### Usage 
```
<script src="./js/modifier.js"></script>
...
var modifier = new ModifierStack(cube);
var bend = new Bend(0, 0, 70);
modifier.addModifier(bend);
```

## Document
You can find the documentation here.[https://code.google.com/archive/p/as3dmod/wikis/AS3Dmod_Tutorial.wiki](https://code.google.com/archive/p/as3dmod/wikis/AS3Dmod_Tutorial.wiki)
and [http://osbo.com/as3dmod/bend/#instructions](http://osbo.com/as3dmod/bend/#instructions)

#### more demo you can see [http://osbo.com/as3dmod/](http://osbo.com/as3dmod/)

## Thanks

Thanks [Bartek Drozdz](http://bartekdrozdz.com/) for creating this wonderful project.

## License
This library is under the BSD License.
