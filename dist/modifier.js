(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(2));
	__export(__webpack_require__(3));
	__export(__webpack_require__(10));
	__export(__webpack_require__(9));
	__export(__webpack_require__(6));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	__export(__webpack_require__(17));
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(21));
	__export(__webpack_require__(16));
	__export(__webpack_require__(7));
	__export(__webpack_require__(20));
	__export(__webpack_require__(11));
	__export(__webpack_require__(22));
	__export(__webpack_require__(23));
	__export(__webpack_require__(8));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(24));
	__export(__webpack_require__(25));
	__export(__webpack_require__(26));
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(29));
	__export(__webpack_require__(30));
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	__export(__webpack_require__(33));
	__export(__webpack_require__(34));


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ThreeMesh_1 = __webpack_require__(4);
	var ModifierStack = (function () {
	    function ModifierStack(mesh) {
	        this.baseMesh = new ThreeMesh_1.ThreeMesh;
	        this.baseMesh.setMesh(mesh);
	        this.baseMesh.analyzeGeometry();
	        this.stack = new Array();
	    }
	    ModifierStack.prototype.addModifier = function (mod) {
	        mod.setModifiable(this.baseMesh);
	        this.stack.push(mod);
	    };
	    ModifierStack.prototype.apply = function () {
	        this.baseMesh.resetGeometry();
	        for (var i = 0; i < this.stack.length; i++) {
	            this.stack[i].apply();
	        }
	        this.baseMesh.postApply();
	    };
	    ModifierStack.prototype.collapse = function () {
	        this.apply();
	        this.baseMesh.collapseGeometry();
	        this.stack.length = 0;
	    };
	    ModifierStack.prototype.clear = function () {
	        this.stack.length = 0;
	    };
	    return ModifierStack;
	}());
	exports.ModifierStack = ModifierStack;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var ThreeVertex_1 = __webpack_require__(5);
	var MeshProxy_1 = __webpack_require__(9);
	var FaceProxy_1 = __webpack_require__(10);
	var Dictionary_1 = __webpack_require__(11);
	var ThreeMesh = (function (_super) {
	    __extends(ThreeMesh, _super);
	    function ThreeMesh() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ThreeMesh.prototype.setMesh = function (mesh) {
	        this.mesh = mesh;
	        var geometry = this.mesh.geometry;
	        var lookUp = new Dictionary_1.Dictionary();
	        var vertices = geometry.vertices;
	        var verticesLength = vertices.length;
	        var faces = geometry.faces;
	        var facesLength = faces.length;
	        for (var i = 0; i < verticesLength; i++) {
	            var vector = new ThreeVertex_1.ThreeVertex();
	            vector.setVertex(vertices[i]);
	            this.vertices.push(vector);
	            lookUp.setVal(vertices[i], vector);
	        }
	        for (var i = 0; i < facesLength; i++) {
	            var face = new FaceProxy_1.FaceProxy();
	            var v0 = vertices[faces[i].a];
	            var v1 = vertices[faces[i].b];
	            var v2 = vertices[faces[i].c];
	            face.addVertex(lookUp.getVal(v0));
	            face.addVertex(lookUp.getVal(v1));
	            face.addVertex(lookUp.getVal(v2));
	            this.faces.push(face);
	        }
	    };
	    ThreeMesh.prototype.postApply = function () {
	        var geometry = this.mesh.geometry;
	        geometry.verticesNeedUpdate = true;
	        geometry.normalsNeedUpdate = true;
	    };
	    ThreeMesh.prototype.updateMeshPosition = function (p) {
	        this.mesh.position.x += p.x;
	        this.mesh.position.y += p.y;
	        this.mesh.position.z += p.z;
	    };
	    return ThreeMesh;
	}(MeshProxy_1.MeshProxy));
	exports.ThreeMesh = ThreeMesh;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var VertexProxy_1 = __webpack_require__(6);
	var ThreeVertex = (function (_super) {
	    __extends(ThreeVertex, _super);
	    function ThreeVertex() {
	        return _super.call(this) || this;
	    }
	    ThreeVertex.prototype.setVertex = function (vertor) {
	        this.vertor = vertor;
	        this.ox = this.vertor.x;
	        this.oy = this.vertor.y;
	        this.oz = this.vertor.z;
	    };
	    Object.defineProperty(ThreeVertex.prototype, "x", {
	        get: function () {
	            return this.vertor.x;
	        },
	        set: function (v) {
	            this.vertor.x = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ThreeVertex.prototype, "y", {
	        get: function () {
	            return this.vertor.y;
	        },
	        set: function (v) {
	            this.vertor.y = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ThreeVertex.prototype, "z", {
	        get: function () {
	            return this.vertor.z;
	        },
	        set: function (v) {
	            this.vertor.z = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ThreeVertex;
	}(VertexProxy_1.VertexProxy));
	exports.ThreeVertex = ThreeVertex;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Vector3_1 = __webpack_require__(7);
	var ModConstant_1 = __webpack_require__(8);
	var VertexProxy = (function () {
	    function VertexProxy() {
	    }
	    VertexProxy.prototype.setVertex = function (vertex) {
	    };
	    VertexProxy.prototype.setRatios = function (rx, ry, rz) {
	        this._ratioX = rx;
	        this._ratioY = ry;
	        this._ratioZ = rz;
	    };
	    VertexProxy.prototype.setOriginalPosition = function (ox, oy, oz) {
	        this.ox = ox;
	        this.oy = oy;
	        this.oz = oz;
	    };
	    Object.defineProperty(VertexProxy.prototype, "x", {
	        get: function () {
	            return 0;
	        },
	        set: function (v) {
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "y", {
	        get: function () {
	            return 0;
	        },
	        set: function (v) {
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "z", {
	        get: function () {
	            return 0;
	        },
	        set: function (v) {
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VertexProxy.prototype.getValue = function (axis) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X: return this.x;
	            case ModConstant_1.ModConstant.Y: return this.y;
	            case ModConstant_1.ModConstant.Z: return this.z;
	        }
	        return 0;
	    };
	    VertexProxy.prototype.setValue = function (axis, v) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X:
	                this.x = v;
	                break;
	            case ModConstant_1.ModConstant.Y:
	                this.y = v;
	                break;
	            case ModConstant_1.ModConstant.Z:
	                this.z = v;
	                break;
	        }
	    };
	    Object.defineProperty(VertexProxy.prototype, "ratioX", {
	        get: function () {
	            return this._ratioX;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "ratioY", {
	        get: function () {
	            return this._ratioY;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "ratioZ", {
	        get: function () {
	            return this._ratioZ;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VertexProxy.prototype.getRatio = function (axis) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X: return this._ratioX;
	            case ModConstant_1.ModConstant.Y: return this._ratioY;
	            case ModConstant_1.ModConstant.Z: return this._ratioZ;
	        }
	        return -1;
	    };
	    Object.defineProperty(VertexProxy.prototype, "originalX", {
	        get: function () {
	            return this.ox;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "originalY", {
	        get: function () {
	            return this.oy;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "originalZ", {
	        get: function () {
	            return this.oz;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VertexProxy.prototype.getOriginalValue = function (axis) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X: return this.ox;
	            case ModConstant_1.ModConstant.Y: return this.oy;
	            case ModConstant_1.ModConstant.Z: return this.oz;
	        }
	        return 0;
	    };
	    VertexProxy.prototype.reset = function () {
	        this.x = this.ox;
	        this.y = this.oy;
	        this.z = this.oz;
	    };
	    VertexProxy.prototype.collapse = function () {
	        this.ox = this.x;
	        this.oy = this.y;
	        this.oz = this.z;
	    };
	    Object.defineProperty(VertexProxy.prototype, "vector", {
	        get: function () {
	            return new Vector3_1.Vector3(this.x, this.y, this.z);
	        },
	        set: function (v) {
	            this.x = v.x;
	            this.y = v.y;
	            this.z = v.z;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VertexProxy.prototype, "ratioVector", {
	        get: function () {
	            return new Vector3_1.Vector3(this.ratioX, this.ratioY, this.ratioZ);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return VertexProxy;
	}());
	exports.VertexProxy = VertexProxy;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Vector3 = (function () {
	    function Vector3(x, y, z) {
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	    Vector3.prototype.clone = function () {
	        return new Vector3(this.x, this.y, this.z);
	    };
	    Vector3.prototype.equals = function (v) {
	        return this.x == v.x && this.y == v.y && this.z == v.z;
	    };
	    Vector3.prototype.zero = function () {
	        this.x = this.y = this.z = 0;
	    };
	    Vector3.prototype.negate = function () {
	        return new Vector3(-this.x, -this.y, -this.z);
	    };
	    Vector3.prototype.add = function (v) {
	        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	    };
	    Vector3.prototype.subtract = function (v) {
	        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	    };
	    Vector3.prototype.multiplyScalar = function (s) {
	        return new Vector3(this.x * s, this.y * s, this.z * s);
	    };
	    Vector3.prototype.multiply = function (v) {
	        return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
	    };
	    Vector3.prototype.divide = function (s) {
	        var os = 1 / s;
	        return new Vector3(this.x * os, this.y * os, this.z * os);
	    };
	    Vector3.prototype.normalize = function () {
	        var m = this.x * this.x + this.y * this.y + this.z * this.z;
	        if (m > 0) {
	            var n = 1 / Math.sqrt(m);
	            this.x *= n;
	            this.y *= n;
	            this.z *= n;
	        }
	    };
	    Object.defineProperty(Vector3.prototype, "magnitude", {
	        get: function () {
	            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	        },
	        set: function (m) {
	            this.normalize();
	            this.x *= m;
	            this.y *= m;
	            this.z *= m;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector3.prototype.toString = function () {
	        return "[" + this.x + " , " + this.y + " , " + this.z + "]";
	    };
	    Vector3.sum = function (a, b) {
	        return a.add(b);
	    };
	    Vector3.dot = function (a, b) {
	        return a.x * b.x + a.y * b.y + a.z * b.z;
	    };
	    Vector3.cross = function (a, b) {
	        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
	    };
	    Vector3.distance = function (a, b) {
	        var dx = a.x - b.x;
	        var dy = a.y - b.y;
	        var dz = a.z - b.z;
	        return Math.sqrt(dx * dx + dy * dy + dz * dz);
	    };
	    return Vector3;
	}());
	Vector3.ZERO = new Vector3(0, 0, 0);
	exports.Vector3 = Vector3;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ModConstant = (function () {
	    function ModConstant() {
	    }
	    return ModConstant;
	}());
	ModConstant.NONE = 0;
	ModConstant.X = 1;
	ModConstant.Y = 2;
	ModConstant.Z = 4;
	ModConstant.LEFT = -1;
	ModConstant.RIGHT = 1;
	exports.ModConstant = ModConstant;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ModConstant_1 = __webpack_require__(8);
	var MeshProxy = (function () {
	    function MeshProxy() {
	        this.vertices = new Array();
	        this.faces = new Array();
	    }
	    MeshProxy.prototype.setMesh = function (mesh) {
	    };
	    MeshProxy.prototype.updateMeshPosition = function (p) {
	    };
	    MeshProxy.prototype.getVertices = function () {
	        return this.vertices;
	    };
	    MeshProxy.prototype.getFaces = function () {
	        return this.faces;
	    };
	    MeshProxy.prototype.analyzeGeometry = function () {
	        var vertices = this.getVertices().length;
	        var v;
	        for (var i = 0; i < vertices; i++) {
	            v = this.getVertices()[i];
	            if (i == 0) {
	                this._minX = this._maxX = v.x;
	                this._minY = this._maxY = v.y;
	                this._minZ = this._maxZ = v.z;
	            }
	            else {
	                this._minX = Math.min(this._minX, v.x);
	                this._minY = Math.min(this._minY, v.y);
	                this._minZ = Math.min(this._minZ, v.z);
	                this._maxX = Math.max(this._maxX, v.x);
	                this._maxY = Math.max(this._maxY, v.y);
	                this._maxZ = Math.max(this._maxZ, v.z);
	            }
	            v.setOriginalPosition(v.x, v.y, v.z);
	        }
	        this._width = this._maxX - this._minX;
	        this._height = this._maxY - this._minY;
	        this._depth = this._maxZ - this._minZ;
	        var maxe = Math.max(this._width, Math.max(this._height, this._depth));
	        var mine = Math.min(this._width, Math.min(this._height, this._depth));
	        if (maxe == this._width && mine == this._height) {
	            this._minAxis = ModConstant_1.ModConstant.Y;
	            this._midAxis = ModConstant_1.ModConstant.Z;
	            this._maxAxis = ModConstant_1.ModConstant.X;
	        }
	        else if (maxe == this._width && mine == this._depth) {
	            this._minAxis = ModConstant_1.ModConstant.Z;
	            this._midAxis = ModConstant_1.ModConstant.Y;
	            this._maxAxis = ModConstant_1.ModConstant.X;
	        }
	        else if (maxe == this._height && mine == this._width) {
	            this._minAxis = ModConstant_1.ModConstant.X;
	            this._midAxis = ModConstant_1.ModConstant.Z;
	            this._maxAxis = ModConstant_1.ModConstant.Y;
	        }
	        else if (maxe == this._height && mine == this._depth) {
	            this._minAxis = ModConstant_1.ModConstant.Z;
	            this._midAxis = ModConstant_1.ModConstant.X;
	            this._maxAxis = ModConstant_1.ModConstant.Y;
	        }
	        else if (maxe == this._depth && mine == this._width) {
	            this._minAxis = ModConstant_1.ModConstant.X;
	            this._midAxis = ModConstant_1.ModConstant.Y;
	            this._maxAxis = ModConstant_1.ModConstant.Z;
	        }
	        else if (maxe == this._depth && mine == this._height) {
	            this._minAxis = ModConstant_1.ModConstant.Y;
	            this._midAxis = ModConstant_1.ModConstant.X;
	            this._maxAxis = ModConstant_1.ModConstant.Z;
	        }
	        for (var i = 0; i < vertices; i++) {
	            v = this.getVertices()[i];
	            v.setRatios((v.x - this._minX) / this._width, (v.y - this._minY) / this._height, (v.z - this._minZ) / this._depth);
	        }
	    };
	    MeshProxy.prototype.resetGeometry = function () {
	        var vertices = this.getVertices().length;
	        for (var i = 0; i < vertices; i++) {
	            var v = this.getVertices()[i];
	            v.reset();
	        }
	    };
	    MeshProxy.prototype.collapseGeometry = function () {
	        var vertices = this.getVertices().length;
	        for (var i = 0; i < vertices; i++) {
	            var v = this.getVertices()[i];
	            v.collapse();
	        }
	        this.analyzeGeometry();
	    };
	    Object.defineProperty(MeshProxy.prototype, "minX", {
	        get: function () {
	            return this._minX;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "minY", {
	        get: function () {
	            return this._minY;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "minZ", {
	        get: function () {
	            return this._minZ;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MeshProxy.prototype.getMin = function (axis) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X: return this._minX;
	            case ModConstant_1.ModConstant.Y: return this._minY;
	            case ModConstant_1.ModConstant.Z: return this._minZ;
	        }
	        return -1;
	    };
	    Object.defineProperty(MeshProxy.prototype, "maxX", {
	        get: function () {
	            return this._maxX;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "maxY", {
	        get: function () {
	            return this._maxY;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "maxZ", {
	        get: function () {
	            return this._maxZ;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MeshProxy.prototype.getMax = function (axis) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X: return this._maxX;
	            case ModConstant_1.ModConstant.Y: return this._maxY;
	            case ModConstant_1.ModConstant.Z: return this._maxZ;
	        }
	        return -1;
	    };
	    Object.defineProperty(MeshProxy.prototype, "maxAxis", {
	        get: function () {
	            return this._maxAxis;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "midAxis", {
	        get: function () {
	            return this._midAxis;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "minAxis", {
	        get: function () {
	            return this._minAxis;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MeshProxy.prototype.getSize = function (axis) {
	        switch (axis) {
	            case ModConstant_1.ModConstant.X: return this._width;
	            case ModConstant_1.ModConstant.Y: return this._height;
	            case ModConstant_1.ModConstant.Z: return this._depth;
	        }
	        return -1;
	    };
	    Object.defineProperty(MeshProxy.prototype, "width", {
	        get: function () {
	            return this._width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "height", {
	        get: function () {
	            return this._height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MeshProxy.prototype, "depth", {
	        get: function () {
	            return this._depth;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MeshProxy.prototype.postApply = function () {
	    };
	    return MeshProxy;
	}());
	exports.MeshProxy = MeshProxy;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var FaceProxy = (function () {
	    function FaceProxy() {
	        this._vertices = [];
	    }
	    FaceProxy.prototype.addVertex = function (v) {
	        this._vertices.push(v);
	    };
	    Object.defineProperty(FaceProxy.prototype, "vertices", {
	        get: function () {
	            return this._vertices;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return FaceProxy;
	}());
	exports.FaceProxy = FaceProxy;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Dictionary = (function () {
	    function Dictionary() {
	        this.dic = {};
	    }
	    Dictionary.prototype.setVal = function (obj, val) {
	        var key = this.getKey(obj);
	        this.dic[key] = val;
	    };
	    Dictionary.prototype.getVal = function (obj) {
	        var key = this.getKey(obj);
	        return this.dic[key];
	    };
	    Dictionary.prototype.getKey = function (obj) {
	        if (typeof obj == "object") {
	            if (obj.id) {
	                return obj.id;
	            }
	            else {
	                var id = "d_" + Math.floor(Math.random() * Math.pow(10, 10));
	                obj.id = id;
	                return id;
	            }
	        }
	        else {
	            return obj + "";
	        }
	    };
	    return Dictionary;
	}());
	exports.Dictionary = Dictionary;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Modifier = (function () {
	    function Modifier() {
	    }
	    Modifier.prototype.setModifiable = function (mod) {
	        this.mod = mod;
	    };
	    Modifier.prototype.getVertices = function () {
	        return this.mod.getVertices();
	    };
	    return Modifier;
	}());
	exports.Modifier = Modifier;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var VerletConnection = (function () {
	    function VerletConnection(v1, v2, distance, rigidity) {
	        if (rigidity === void 0) { rigidity = .5; }
	        this._rigidity = .5;
	        this._v1 = v1;
	        this._v2 = v2;
	        this._strictDistance = distance;
	        this._rigidity = rigidity;
	    }
	    Object.defineProperty(VerletConnection.prototype, "rigidity", {
	        get: function () {
	            return this._rigidity;
	        },
	        set: function (value) {
	            this._rigidity = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VerletConnection.prototype.update = function () {
	        var x1 = this._v1.x, x2 = this._v2.x, y1 = this._v1.y, y2 = this._v2.y, z1 = this._v1.z, z2 = this._v2.z, dirX = x2 - x1, dirY = y2 - y1, dirZ = z2 - z1;
	        var dist = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
	        var ratio, diffX, diffY, diffZ;
	        if (dist == this._strictDistance)
	            return;
	        ratio = (this._strictDistance - dist) / dist * this._rigidity;
	        diffX = ratio * dirX;
	        diffY = ratio * dirY;
	        diffZ = ratio * dirZ;
	        if (!this._v1.mobileX || !this._v2.mobileX)
	            diffX *= 2;
	        if (!this._v1.mobileY || !this._v2.mobileY)
	            diffY *= 2;
	        if (!this._v1.mobileZ || !this._v2.mobileZ)
	            diffZ *= 2;
	        if (this._v1.mobileX)
	            this._v1.x -= diffX;
	        if (this._v1.mobileY)
	            this._v1.y -= diffY;
	        if (this._v1.mobileZ)
	            this._v1.z -= diffZ;
	        if (this._v2.mobileX)
	            this._v2.x += diffX;
	        if (this._v2.mobileY)
	            this._v2.y += diffY;
	        if (this._v2.mobileZ)
	            this._v2.z += diffZ;
	    };
	    return VerletConnection;
	}());
	exports.VerletConnection = VerletConnection;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var VerletVertex = (function () {
	    function VerletVertex(vertexProxy) {
	        this.mobileX = true;
	        this.mobileY = true;
	        this.mobileZ = true;
	        this._v = vertexProxy;
	        this.setPosition(this._v.x, this._v.y, this._v.z);
	    }
	    VerletVertex.prototype.setPosition = function (x, y, z) {
	        this._x = this._oldX = x;
	        this._y = this._oldY = y;
	        this._z = this._oldZ = z;
	        this._v.x = x;
	        this._v.y = y;
	        this._v.z = z;
	    };
	    VerletVertex.prototype.update = function () {
	        var oldX, oldY, oldZ;
	        if (this.mobileX) {
	            oldX = this.x;
	            this.x += this.velocityX;
	            this._oldX = oldX;
	        }
	        if (this.mobileY) {
	            oldY = this.y;
	            this.y += this.velocityY;
	            this._oldY = oldY;
	        }
	        if (this.mobileZ) {
	            oldZ = this.z;
	            this.z += this.velocityZ;
	            this._oldZ = oldZ;
	        }
	    };
	    Object.defineProperty(VerletVertex.prototype, "x", {
	        get: function () {
	            return this._x;
	        },
	        set: function (value) {
	            this._x = value;
	            if (!this.mobileX)
	                this._oldX = value;
	            this._v.x = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VerletVertex.prototype, "y", {
	        get: function () {
	            return this._y;
	        },
	        set: function (value) {
	            this._y = value;
	            if (!this.mobileY)
	                this._oldY = value;
	            this._v.y = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VerletVertex.prototype, "z", {
	        get: function () {
	            return this._z;
	        },
	        set: function (value) {
	            this._z = value;
	            if (!this.mobileZ)
	                this._oldZ = value;
	            this._v.z = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VerletVertex.prototype, "velocityX", {
	        get: function () {
	            return this._x - this._oldX;
	        },
	        set: function (value) {
	            this._oldX = this._x - value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VerletVertex.prototype, "velocityY", {
	        get: function () {
	            return this._y - this._oldY;
	        },
	        set: function (value) {
	            this._oldY = this._y - value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VerletVertex.prototype, "velocityZ", {
	        get: function () {
	            return this._z - this._oldZ;
	        },
	        set: function (value) {
	            this._oldZ = this._z - value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VerletVertex.prototype.distanceTo = function (v) {
	        return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y) + (this.z - v.z) * (this.z - v.z));
	    };
	    return VerletVertex;
	}());
	exports.VerletVertex = VerletVertex;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Vector2_1 = __webpack_require__(16);
	var Matrix = (function () {
	    function Matrix(m11, m12, m21, m22) {
	        this.m = [m11, m12, m21, m22];
	    }
	    Matrix.prototype.dispose = function () {
	        this.m.length = 0;
	        return this;
	    };
	    Matrix.prototype.reset = function () {
	        this.m[0] = 1;
	        this.m[1] = 0;
	        this.m[2] = 0;
	        this.m[3] = 1;
	        return this;
	    };
	    Matrix.prototype.rotate = function (angle) {
	        var c = Math.cos(angle);
	        var s = Math.sin(angle);
	        this.m[0] = c;
	        this.m[1] = -s;
	        this.m[2] = s;
	        this.m[3] = c;
	        return this;
	    };
	    Matrix.prototype.scale = function (sx, sy) {
	        this.m[0] = 1;
	        this.m[1] = 0;
	        this.m[2] = 0;
	        this.m[3] = 1;
	        if (sx !== undefined) {
	            this.m[0] = sx;
	            this.m[3] = sx;
	        }
	        if (sy !== undefined) {
	            this.m[3] = sy;
	        }
	        return this;
	    };
	    Matrix.prototype.multiply = function (b) {
	        return Matrix.mult(this, b);
	    };
	    Matrix.prototype.transformPoint = function (p) {
	        var xy = Matrix.transform(this, [p.x, p.y]);
	        return new Vector2_1.Vector2(xy[0], xy[1]);
	    };
	    Matrix.prototype.transformPointSelf = function (p) {
	        var xy = Matrix.transform(this, [p.x, p.y]);
	        p.x = xy[0];
	        p.y = xy[1];
	        return p;
	    };
	    Matrix.prototype.clone = function () {
	        var m = this.m;
	        return new Matrix(m[0], m[1], m[2], m[3]);
	    };
	    Matrix.transform = function (m2, xy) {
	        var m = m2.m, x = xy[0], y = xy[1];
	        xy[0] = m[0] * x + m[1] * y;
	        xy[1] = m[2] * x + m[3] * y;
	        return xy;
	    };
	    Matrix.mult = function (m1, m2) {
	        var a = m1.m, b = m2.m, a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	        a[0] = a0 * b[0] + a1 * b[2];
	        a[1] = a0 * b[1] + a1 * b[3];
	        a[2] = a2 * b[0] + a3 * b[2];
	        a[3] = a2 * b[1] + a3 * b[3];
	        return m1;
	    };
	    return Matrix;
	}());
	exports.Matrix = Matrix;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Vector2 = (function () {
	    function Vector2(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Vector2.prototype.clone = function () {
	        return new Vector2(this.x, this.y);
	    };
	    Vector2.prototype.equals = function (v) {
	        return this.x == v.x && this.y == v.y;
	    };
	    Vector2.prototype.zero = function () {
	        this.x = this.y;
	    };
	    Vector2.prototype.negate = function () {
	        return new Vector2(-this.x, -this.y);
	    };
	    Vector2.prototype.add = function (v) {
	        return new Vector2(this.x + v.x, this.y + v.y);
	    };
	    Vector2.prototype.subtract = function (v) {
	        return new Vector2(this.x - v.x, this.y - v.y);
	    };
	    Vector2.prototype.multiplyScalar = function (s) {
	        return new Vector2(this.x * s, this.y * s);
	    };
	    Vector2.prototype.multiply = function (v) {
	        return new Vector2(this.x * v.x, this.y * v.y);
	    };
	    Vector2.prototype.divide = function (s) {
	        var os = 1 / s;
	        return new Vector2(this.x * os, this.y * os);
	    };
	    Vector2.prototype.normalize = function () {
	        var m = this.x * this.x + this.y * this.y;
	        if (m > 0) {
	            var n = 1 / Math.sqrt(m);
	            this.x *= n;
	            this.y *= n;
	        }
	    };
	    Object.defineProperty(Vector2.prototype, "magnitude", {
	        get: function () {
	            return Math.sqrt(this.x * this.x + this.y * this.y);
	        },
	        set: function (m) {
	            this.normalize();
	            this.x *= m;
	            this.y *= m;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector2.prototype.toString = function () {
	        return "[" + this.x + " , " + this.y + "]";
	    };
	    Vector2.sum = function (a, b) {
	        return a.add(b);
	    };
	    Vector2.dot = function (a, b) {
	        return a.x * b.x + a.y * b.y;
	    };
	    Vector2.distance = function (a, b) {
	        var dx = a.x - b.x;
	        var dy = a.y - b.y;
	        return Math.sqrt(dx * dx + dy * dy);
	    };
	    return Vector2;
	}());
	Vector2.ZERO = new Vector2(0, 0);
	exports.Vector2 = Vector2;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Matrix4 = (function () {
	    function Matrix4(pn11, pn12, pn13, pn14, pn21, pn22, pn23, pn24, pn31, pn32, pn33, pn34, pn41, pn42, pn43, pn44) {
	        if (pn11 === void 0) { pn11 = 1; }
	        if (pn12 === void 0) { pn12 = 0; }
	        if (pn13 === void 0) { pn13 = 0; }
	        if (pn14 === void 0) { pn14 = 0; }
	        if (pn21 === void 0) { pn21 = 0; }
	        if (pn22 === void 0) { pn22 = 1; }
	        if (pn23 === void 0) { pn23 = 0; }
	        if (pn24 === void 0) { pn24 = 0; }
	        if (pn31 === void 0) { pn31 = 0; }
	        if (pn32 === void 0) { pn32 = 0; }
	        if (pn33 === void 0) { pn33 = 1; }
	        if (pn34 === void 0) { pn34 = 0; }
	        if (pn41 === void 0) { pn41 = 0; }
	        if (pn42 === void 0) { pn42 = 0; }
	        if (pn43 === void 0) { pn43 = 0; }
	        if (pn44 === void 0) { pn44 = 1; }
	        this.n11 = pn11;
	        this.n12 = pn12;
	        this.n13 = pn13;
	        this.n14 = pn14;
	        this.n21 = pn21;
	        this.n22 = pn22;
	        this.n23 = pn23;
	        this.n24 = pn24;
	        this.n31 = pn31;
	        this.n32 = pn32;
	        this.n33 = pn33;
	        this.n34 = pn34;
	        this.n41 = pn41;
	        this.n42 = pn42;
	        this.n43 = pn43;
	        this.n44 = pn44;
	    }
	    Matrix4.translationMatrix = function (x, y, z) {
	        var m = new Matrix4();
	        m.n14 = x;
	        m.n24 = y;
	        m.n34 = z;
	        return m;
	    };
	    Matrix4.scaleMatrix = function (x, y, z) {
	        var m = new Matrix4();
	        m.n11 = x;
	        m.n22 = y;
	        m.n33 = z;
	        return m;
	    };
	    Matrix4.rotationMatrix = function (x, y, z, rad, targetmatrix) {
	        if (targetmatrix === void 0) { targetmatrix = null; }
	        var m;
	        if (!targetmatrix)
	            m = new Matrix4();
	        else
	            m = targetmatrix;
	        var nCos = Math.cos(rad);
	        var nSin = Math.sin(rad);
	        var scos = 1 - nCos;
	        var sxy = x * y * scos;
	        var syz = y * z * scos;
	        var sxz = x * z * scos;
	        var sz = nSin * z;
	        var sy = nSin * y;
	        var sx = nSin * x;
	        m.n11 = nCos + x * x * scos;
	        m.n12 = -sz + sxy;
	        m.n13 = sy + sxz;
	        m.n14 = 0;
	        m.n21 = sz + sxy;
	        m.n22 = nCos + y * y * scos;
	        m.n23 = -sx + syz;
	        m.n24 = 0;
	        m.n31 = -sy + sxz;
	        m.n32 = sx + syz;
	        m.n33 = nCos + z * z * scos;
	        m.n34 = 0;
	        return m;
	    };
	    Matrix4.prototype.calculateMultiply = function (a, b) {
	        var a11 = a.n11;
	        var b11 = b.n11;
	        var a21 = a.n21;
	        var b21 = b.n21;
	        var a31 = a.n31;
	        var b31 = b.n31;
	        var a12 = a.n12;
	        var b12 = b.n12;
	        var a22 = a.n22;
	        var b22 = b.n22;
	        var a32 = a.n32;
	        var b32 = b.n32;
	        var a13 = a.n13;
	        var b13 = b.n13;
	        var a23 = a.n23;
	        var b23 = b.n23;
	        var a33 = a.n33;
	        var b33 = b.n33;
	        var a14 = a.n14;
	        var b14 = b.n14;
	        var a24 = a.n24;
	        var b24 = b.n24;
	        var a34 = a.n34;
	        var b34 = b.n34;
	        this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
	        this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
	        this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
	        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;
	        this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
	        this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
	        this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
	        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;
	        this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
	        this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
	        this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
	        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
	    };
	    Matrix4.multiply = function (a, b) {
	        var m = new Matrix4();
	        m.calculateMultiply(a, b);
	        return m;
	    };
	    Matrix4.multiplyVector = function (m, v) {
	        var vx = v.x;
	        var vy = v.y;
	        var vz = v.z;
	        v.x = vx * m.n11 + vy * m.n12 + vz * m.n13 + m.n14;
	        v.y = vx * m.n21 + vy * m.n22 + vz * m.n23 + m.n24;
	        v.z = vx * m.n31 + vy * m.n32 + vz * m.n33 + m.n34;
	    };
	    return Matrix4;
	}());
	exports.Matrix4 = Matrix4;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Phase = (function () {
	    function Phase(v) {
	        if (v === void 0) { v = 0; }
	        this.v = v;
	    }
	    Object.defineProperty(Phase.prototype, "value", {
	        get: function () {
	            return this.v;
	        },
	        set: function (v) {
	            this.v = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Phase.prototype, "phasedValue", {
	        get: function () {
	            return Math.sin(this.v);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Phase.prototype, "absPhasedValue", {
	        get: function () {
	            return Math.abs(this.phasedValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Phase.prototype, "normValue", {
	        get: function () {
	            return (this.phasedValue + 1) / 2;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Phase;
	}());
	exports.Phase = Phase;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var XMath_1 = __webpack_require__(20);
	var Range = (function () {
	    function Range(s, e) {
	        if (s === void 0) { s = 0; }
	        if (e === void 0) { e = 1; }
	        this._start = s;
	        this._end = e;
	    }
	    Object.defineProperty(Range.prototype, "start", {
	        get: function () {
	            return this._start;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Range.prototype, "end", {
	        get: function () {
	            return this._end;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Range.prototype, "size", {
	        get: function () {
	            return this._end - this._start;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Range.prototype.move = function (amount) {
	        this._start += amount;
	        this._end += amount;
	    };
	    Range.prototype.isIn = function (n) {
	        return n >= this._start && n <= this._end;
	    };
	    Range.prototype.normalize = function (n) {
	        return XMath_1.XMath.normalize(this._start, this._end, n);
	    };
	    Range.prototype.toRange = function (n) {
	        return XMath_1.XMath.toRange(this._start, this._end, n);
	    };
	    Range.prototype.trim = function (n) {
	        return XMath_1.XMath.trim(this._start, this._end, n);
	    };
	    Range.prototype.interpolate = function (n, r) {
	        return this.toRange(r.normalize(n));
	    };
	    Range.prototype.toString = function () {
	        return "[" + this.start + " - " + this.end + "]";
	    };
	    return Range;
	}());
	exports.Range = Range;


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var XMath = (function () {
	    function XMath() {
	    }
	    XMath.normalize = function (start, end, val) {
	        var range = end - start;
	        var normal;
	        if (range == 0) {
	            normal = 1;
	        }
	        else {
	            normal = XMath.trim(0, 1, (val - start) / end);
	        }
	        return normal;
	    };
	    XMath.toRange = function (start, end, normalized) {
	        var range = end - start;
	        var val;
	        if (range == 0) {
	            val = 0;
	        }
	        else {
	            val = start + (end - start) * normalized;
	        }
	        return val;
	    };
	    XMath.inInRange = function (start, end, value, excluding) {
	        if (excluding === void 0) { excluding = false; }
	        if (excluding)
	            return value >= start && value <= end;
	        else
	            return value > start && value < end;
	    };
	    XMath.sign = function (val, ifZero) {
	        if (ifZero === void 0) { ifZero = 0; }
	        if (val == 0)
	            return ifZero;
	        else
	            return (val > 0) ? 1 : -1;
	    };
	    XMath.trim = function (start, end, value) {
	        return Math.min(end, Math.max(start, value));
	    };
	    XMath.wrap = function (start, end, value) {
	        if (value < start)
	            return value + (end - start);
	        else if (value >= end)
	            return value - (end - start);
	        else
	            return value;
	    };
	    XMath.degToRad = function (deg) {
	        return deg / 180 * Math.PI;
	    };
	    XMath.radToDeg = function (rad) {
	        return rad / Math.PI * 180;
	    };
	    XMath.presicion = function (number, precision) {
	        var r = Math.pow(10, precision);
	        return Math.round(number * r) / r;
	    };
	    XMath.uceil = function (val) {
	        return (val < 0) ? Math.floor(val) : Math.ceil(val);
	    };
	    return XMath;
	}());
	XMath.PI = 3.1415;
	exports.XMath = XMath;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var XMath_1 = __webpack_require__(20);
	var Range_1 = __webpack_require__(19);
	var Value = (function () {
	    function Value(i, r) {
	        if (i === void 0) { i = 0; }
	        if (r === void 0) { r = null; }
	        this._value = i;
	        this._range = (r != null) ? r : new Range_1.Range();
	    }
	    Object.defineProperty(Value.prototype, "isOdd", {
	        get: function () {
	            return this._value % 2 == 1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Value.prototype, "isEven", {
	        get: function () {
	            return this._value % 2 == 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Value.prototype, "normalized", {
	        get: function () {
	            return XMath_1.XMath.normalize(this._range.start, this._range.end, this._value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Value.prototype, "range", {
	        get: function () {
	            return this._range;
	        },
	        set: function (range) {
	            this._range = range;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Value.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (value) {
	            this._value = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Value.prototype.valueOf = function () {
	        return this._value;
	    };
	    Value.prototype.toString = function () {
	        return this._value + " " + this._range.toString();
	    };
	    Value.prototype.setRange = function (nr, interpolateValue) {
	        if (interpolateValue === void 0) { interpolateValue = false; }
	        if (interpolateValue)
	            this._value = XMath_1.XMath.toRange(nr.start, nr.end, this.normalized);
	        this._range = nr;
	    };
	    Value.prototype.trim = function () {
	        this._value = XMath_1.XMath.trim(this._range.start, this._range.end, this._value);
	    };
	    Value.prototype.inRange = function (r) {
	        if (r === void 0) { r = null; }
	        if (r == null)
	            r = this._range;
	        return this._range.isIn(this._value);
	    };
	    Value.prototype.isFirst = function () {
	        return this._value == this._range.start;
	    };
	    Value.prototype.isLast = function () {
	        return this._value == this._range.end;
	    };
	    Value.prototype.isPolar = function () {
	        return this.isFirst() || this.isLast();
	    };
	    return Value;
	}());
	exports.Value = Value;


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var EventEmitter = (function () {
	    function EventEmitter() {
	    }
	    EventEmitter.prototype.on = function (type, listener) {
	        if (!_listeners)
	            _listeners = {};
	        if (!_listeners[type])
	            _listeners[type] = [];
	        _listeners[type].push(listener);
	        return listener;
	    };
	    EventEmitter.prototype.emit = function (eventName) {
	        var rest = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            rest[_i - 1] = arguments[_i];
	        }
	        var ret = false;
	        if (eventName && _listeners) {
	            var arr = _listeners[eventName];
	            if (!arr)
	                return ret;
	            arr = arr.slice();
	            var handler, i = arr.length;
	            var args = Array.prototype.slice.call(arguments);
	            args.shift();
	            while (i--) {
	                var handler = arr[i];
	                ret = ret || handler.apply(null, args);
	            }
	        }
	        return !!ret;
	    };
	    EventEmitter.prototype.one = function (type, listener) {
	        var _this = this;
	        var args = Array.prototype.slice.call(arguments, 2);
	        var proxyListener = function () {
	            _this.off(type, proxyListener);
	            listener.apply(null, args);
	        };
	        this.on(type, proxyListener);
	    };
	    EventEmitter.prototype.has = function (type) {
	        return !!(_listeners && _listeners[type]);
	    };
	    EventEmitter.prototype.off = function (type, listener) {
	        if (!_listeners || !_listeners[type])
	            return;
	        var arr = _listeners[type];
	        for (var i = 0, l = arr.length; i < l; i++) {
	            if (arr[i].toString() == listener.toString()) {
	                if (l == 1) {
	                    delete (_listeners[type]);
	                }
	                else {
	                    arr.splice(i, 1);
	                }
	                break;
	            }
	        }
	    };
	    EventEmitter.prototype.offAll = function (type) {
	        if (!type)
	            _listeners = null;
	        else if (_listeners)
	            delete (_listeners[type]);
	    };
	    return EventEmitter;
	}());
	exports.EventEmitter = EventEmitter;
	var _listeners;


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Log = (function () {
	    function Log() {
	    }
	    Log.log = function (time, msg) {
	        this.index++;
	        if (this.index < time) {
	            console.log(msg);
	        }
	    };
	    return Log;
	}());
	Log.index = 0;
	exports.Log = Log;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var ModConstant_1 = __webpack_require__(8);
	var Modifier_1 = __webpack_require__(12);
	var Vector2_1 = __webpack_require__(16);
	var Matrix_1 = __webpack_require__(15);
	var Bend = (function (_super) {
	    __extends(Bend, _super);
	    function Bend(f, o, a) {
	        if (f === void 0) { f = 0; }
	        if (o === void 0) { o = .5; }
	        if (a === void 0) { a = 0; }
	        var _this = _super.call(this) || this;
	        _this._constraint = ModConstant_1.ModConstant.NONE;
	        _this.switchAxes = false;
	        _this._force = f;
	        _this._offset = o;
	        _this.angle = a;
	        return _this;
	    }
	    Bend.prototype.setModifiable = function (mod) {
	        _super.prototype.setModifiable.call(this, mod);
	        this.max = (this.switchAxes) ? mod.midAxis : mod.maxAxis;
	        this.min = mod.minAxis;
	        this.mid = (this.switchAxes) ? mod.maxAxis : mod.midAxis;
	        this.width = mod.getSize(this.max);
	        this.height = mod.getSize(this.mid);
	        this.origin = mod.getMin(this.max);
	        this._diagAngle = Math.atan(this.width / this.height);
	    };
	    Object.defineProperty(Bend.prototype, "force", {
	        get: function () { return this._force; },
	        set: function (f) { this._force = f; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Bend.prototype, "constraint", {
	        get: function () { return this._constraint; },
	        set: function (c) { this._constraint = c; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Bend.prototype, "offset", {
	        get: function () { return this._offset; },
	        set: function (offset) { this._offset = offset; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Bend.prototype, "diagAngle", {
	        get: function () { return this._diagAngle; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Bend.prototype, "angle", {
	        get: function () { return this._angle; },
	        set: function (a) {
	            this._angle = a;
	            this.m1 = new Matrix_1.Matrix(1, 0, 0, 1);
	            this.m1.rotate(this._angle);
	            this.m2 = new Matrix_1.Matrix(1, 0, 0, 1);
	            this.m2.rotate(-this._angle);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Bend.prototype.apply = function () {
	        if (this.force == 0)
	            return;
	        var vs = this.mod.getVertices();
	        var vc = vs.length;
	        var distance = this.origin + this.width * this.offset;
	        var radius = this.width / Math.PI / this.force;
	        var bendAngle = Math.PI * 2 * (this.width / (radius * Math.PI * 2));
	        for (var i = 0; i < vc; i++) {
	            var v = vs[i];
	            var vmax = v.getValue(this.max);
	            var vmid = v.getValue(this.mid);
	            var vmin = v.getValue(this.min);
	            var np = this.m1.transformPoint(new Vector2_1.Vector2(vmax, vmid));
	            vmax = np.x;
	            vmid = np.y;
	            var p = (vmax - this.origin) / this.width;
	            if ((this.constraint == ModConstant_1.ModConstant.LEFT && p <= this.offset) || (this.constraint == ModConstant_1.ModConstant.RIGHT && p >= this.offset)) {
	            }
	            else {
	                var fa = ((Math.PI / 2) - bendAngle * this.offset) + (bendAngle * p);
	                var op = Math.sin(fa) * (radius + vmin);
	                var ow = Math.cos(fa) * (radius + vmin);
	                vmin = op - radius;
	                vmax = distance - ow;
	            }
	            var np2 = this.m2.transformPoint(new Vector2_1.Vector2(vmax, vmid));
	            vmax = np2.x;
	            vmid = np2.y;
	            v.setValue(this.max, vmax);
	            v.setValue(this.mid, vmid);
	            v.setValue(this.min, vmin);
	        }
	    };
	    return Bend;
	}(Modifier_1.Modifier));
	exports.Bend = Bend;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Vector3_1 = __webpack_require__(7);
	var Modifier_1 = __webpack_require__(12);
	var Bloat = (function (_super) {
	    __extends(Bloat, _super);
	    function Bloat() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._center = Vector3_1.Vector3.ZERO;
	        _this._r = 0;
	        _this._a = 0.01;
	        _this._u = Vector3_1.Vector3.ZERO;
	        return _this;
	    }
	    Object.defineProperty(Bloat.prototype, "center", {
	        get: function () {
	            return this._center;
	        },
	        set: function (v) {
	            this._center = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Bloat.prototype, "radius", {
	        get: function () {
	            return this._r;
	        },
	        set: function (v) {
	            this._r = Math.max(0, v);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Bloat.prototype, "a", {
	        get: function () { return this._a; },
	        set: function (v) { this._a = Math.max(0, v); },
	        enumerable: true,
	        configurable: true
	    });
	    Bloat.prototype.apply = function () {
	        var vs = this.mod.getVertices();
	        for (var _i = 0, vs_1 = vs; _i < vs_1.length; _i++) {
	            var vi = vs_1[_i];
	            var v = vi;
	            this._u.x = v.x - this._center.x;
	            this._u.y = v.y - this._center.y;
	            this._u.z = v.z - this._center.z;
	            this._u.magnitude += this._r * Math.exp(-this._u.magnitude * this._a);
	            v.x = this._u.x + this._center.x;
	            v.y = this._u.y + this._center.y;
	            v.z = this._u.z + this._center.z;
	        }
	    };
	    return Bloat;
	}(Modifier_1.Modifier));
	exports.Bloat = Bloat;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Range_1 = __webpack_require__(19);
	var Vector3_1 = __webpack_require__(7);
	var Matrix4_1 = __webpack_require__(17);
	var Modifier_1 = __webpack_require__(12);
	var Break = (function (_super) {
	    __extends(Break, _super);
	    function Break(o, a) {
	        if (o === void 0) { o = 0; }
	        if (a === void 0) { a = 0; }
	        var _this = _super.call(this) || this;
	        _this.bv = new Vector3_1.Vector3(0, 1, 0);
	        _this.range = new Range_1.Range(0, 1);
	        _this.angle = a;
	        _this._offset = o;
	        return _this;
	    }
	    Break.prototype.apply = function () {
	        var vs = this.mod.getVertices();
	        var vc = vs.length;
	        var pv = new Vector3_1.Vector3(0, 0, -(this.mod.minZ + this.mod.depth * this.offset));
	        for (var i = 0; i < vc; i++) {
	            var v = vs[i];
	            var c = v.vector;
	            c = c.add(pv);
	            if (c.z >= 0 && this.range.isIn(v.ratioY)) {
	                var ta = this.angle;
	                var rm = Matrix4_1.Matrix4.rotationMatrix(this.bv.x, this.bv.y, this.bv.z, ta);
	                Matrix4_1.Matrix4.multiplyVector(rm, c);
	            }
	            var npv = pv.negate();
	            c = c.add(npv);
	            v.x = c.x;
	            v.y = c.y;
	            v.z = c.z;
	        }
	    };
	    Object.defineProperty(Break.prototype, "offset", {
	        get: function () {
	            return this._offset;
	        },
	        set: function (offset) {
	            this._offset = offset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Break;
	}(Modifier_1.Modifier));
	exports.Break = Break;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var ModConstant_1 = __webpack_require__(8);
	var Dictionary_1 = __webpack_require__(11);
	var Modifier_1 = __webpack_require__(12);
	var VerletConnection_1 = __webpack_require__(13);
	var VerletVertex_1 = __webpack_require__(14);
	var Cloth = (function (_super) {
	    __extends(Cloth, _super);
	    function Cloth(rigidity, friction) {
	        if (rigidity === void 0) { rigidity = 1; }
	        if (friction === void 0) { friction = 0; }
	        var _this = _super.call(this) || this;
	        _this._forceX = 0;
	        _this._forceY = 0;
	        _this._forceZ = 0;
	        _this._lookUp = new Dictionary_1.Dictionary();
	        _this._rigidity = rigidity;
	        _this.friction = friction;
	        return _this;
	    }
	    Cloth.prototype.setBounds = function (minX, maxX, minY, maxY, minZ, maxZ) {
	        if (minX === void 0) { minX = Number.NEGATIVE_INFINITY; }
	        if (maxX === void 0) { maxX = Number.POSITIVE_INFINITY; }
	        if (minY === void 0) { minY = Number.NEGATIVE_INFINITY; }
	        if (maxY === void 0) { maxY = Number.POSITIVE_INFINITY; }
	        if (minZ === void 0) { minZ = Number.NEGATIVE_INFINITY; }
	        if (maxZ === void 0) { maxZ = Number.POSITIVE_INFINITY; }
	        this._useBounds = true;
	        this._boundsMinX = minX;
	        this._boundsMaxX = maxX;
	        this._boundsMinY = minY;
	        this._boundsMaxY = maxY;
	        this._boundsMinZ = minZ;
	        this._boundsMaxZ = maxZ;
	    };
	    Cloth.prototype.clearBounds = function () {
	        this._useBounds = false;
	    };
	    Object.defineProperty(Cloth.prototype, "verletVertices", {
	        get: function () {
	            return this._vertices;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Cloth.prototype, "friction", {
	        get: function () {
	            return (this._friction - 1) * 100;
	        },
	        set: function (value) {
	            if (value < 0)
	                value = 0;
	            this._friction = value / 100 + 1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Cloth.prototype, "rigidity", {
	        get: function () {
	            return this._rigidity;
	        },
	        set: function (value) {
	            var half;
	            var i = this._connections.length;
	            var c;
	            if (value > 1)
	                value = 1;
	            else if (value < 0)
	                value = 0;
	            this._rigidity = value;
	            half = value * .5;
	            while (c = this._connections[--i]) {
	                c.rigidity = half;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Cloth.prototype.setForce = function (x, y, z) {
	        this._forceX = x;
	        this._forceY = y;
	        this._forceZ = z;
	    };
	    Object.defineProperty(Cloth.prototype, "forceX", {
	        get: function () {
	            return this._forceX;
	        },
	        set: function (value) {
	            this._forceX = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Cloth.prototype, "forceY", {
	        get: function () {
	            return this._forceY;
	        },
	        set: function (value) {
	            this._forceY = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Cloth.prototype, "forceZ", {
	        get: function () {
	            return this._forceZ;
	        },
	        set: function (value) {
	            this._forceZ = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Cloth.prototype.unlockAll = function () {
	        var v;
	        var i = this._vertices.length;
	        while (v = this._vertices[--i]) {
	            v.mobileX = true;
	            v.mobileY = true;
	            v.mobileZ = true;
	        }
	    };
	    Cloth.prototype.lockXMin = function (tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        this.lockSet(this.mod.minX, "x", tolerance, axes);
	    };
	    Cloth.prototype.lockXMax = function (tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        this.lockSet(this.mod.maxX, "x", tolerance, axes);
	    };
	    Cloth.prototype.lockYMin = function (tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        this.lockSet(this.mod.minY, "y", tolerance, axes);
	    };
	    Cloth.prototype.lockYMax = function (tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        this.lockSet(this.mod.maxY, "y", tolerance, axes);
	    };
	    Cloth.prototype.lockZMin = function (tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        this.lockSet(this.mod.minZ, "z", tolerance, axes);
	    };
	    Cloth.prototype.lockZMax = function (tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        this.lockSet(this.mod.maxZ, "z", tolerance, axes);
	    };
	    Cloth.prototype.lockSet = function (reference, property, tolerance, axes) {
	        if (tolerance === void 0) { tolerance = 0; }
	        if (axes === void 0) { axes = 7; }
	        var v;
	        var i = this._vertices.length;
	        while (v = this._vertices[--i]) {
	            if (Math.abs(v[property] - reference) <= tolerance) {
	                if (axes & ModConstant_1.ModConstant.X)
	                    v.mobileX = false;
	                if (axes & ModConstant_1.ModConstant.Y)
	                    v.mobileY = false;
	                if (axes & ModConstant_1.ModConstant.Z)
	                    v.mobileZ = false;
	            }
	        }
	    };
	    Cloth.prototype.setModifiable = function (mod) {
	        _super.prototype.setModifiable.call(this, mod);
	        this.initVerletVertices();
	        this.initVerletConnections();
	        this.rigidity = this._rigidity;
	    };
	    Cloth.prototype.apply = function () {
	        var i;
	        var c;
	        var v;
	        i = this._connections.length;
	        while (c = this._connections[--i]) {
	            c.update();
	        }
	        i = this._vertices.length;
	        while (v = this._vertices[--i]) {
	            if (v.mobileX)
	                v.x += this._forceX;
	            if (v.mobileY)
	                v.y += this._forceY;
	            if (v.mobileZ)
	                v.z += this._forceZ;
	            v.velocityX /= this._friction;
	            v.velocityY /= this._friction;
	            v.velocityZ /= this._friction;
	            if (this._useBounds) {
	                if (v.x < this._boundsMinX)
	                    v.x = this._boundsMinX;
	                else if (v.x > this._boundsMaxX)
	                    v.x = this._boundsMaxX;
	                if (v.y < this._boundsMinY)
	                    v.y = this._boundsMinY;
	                else if (v.y > this._boundsMaxY)
	                    v.y = this._boundsMaxY;
	                if (v.z < this._boundsMinZ)
	                    v.z = this._boundsMinZ;
	                else if (v.z > this._boundsMaxZ)
	                    v.z = this._boundsMaxZ;
	            }
	            v.update();
	        }
	    };
	    Cloth.prototype.initVerletVertices = function () {
	        var vs = this.mod.getVertices();
	        var vc = vs.length;
	        var v;
	        var vv;
	        this._vertices = [];
	        while (v = vs[--vc]) {
	            vv = new VerletVertex_1.VerletVertex(v);
	            this._vertices.push(vv);
	            this._lookUp.setVal(v, vv);
	        }
	    };
	    Cloth.prototype.initVerletConnections = function () {
	        var ts = this.mod.getFaces();
	        var t;
	        var tc = ts.length;
	        var faceVertices;
	        var numVertices;
	        this._connections = [];
	        for (var i = 0; i < tc; i++) {
	            t = ts[i];
	            faceVertices = t.vertices;
	            numVertices = faceVertices.length;
	            for (var j = 0; j < numVertices - 1; j++) {
	                this.createConnection(this._lookUp.getVal(faceVertices[j]), this._lookUp.getVal(faceVertices[j + 1]));
	                if (j > 1)
	                    this.createConnection(this._lookUp.getVal(faceVertices[0]), this._lookUp.getVal(faceVertices[j]));
	            }
	            this.createConnection(this._lookUp.getVal(faceVertices[numVertices - 1]), this._lookUp.getVal(faceVertices[0]));
	        }
	    };
	    Cloth.prototype.createConnection = function (v1, v2) {
	        var dist = v1.distanceTo(v2);
	        var connection = new VerletConnection_1.VerletConnection(v1, v2, dist, this._rigidity);
	        this._connections.push(connection);
	    };
	    return Cloth;
	}(Modifier_1.Modifier));
	exports.Cloth = Cloth;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var ModConstant_1 = __webpack_require__(8);
	var Modifier_1 = __webpack_require__(12);
	var Noise = (function (_super) {
	    __extends(Noise, _super);
	    function Noise(f) {
	        if (f === void 0) { f = 0; }
	        var _this = _super.call(this) || this;
	        _this.axc = ModConstant_1.ModConstant.NONE;
	        _this.start = 0;
	        _this.end = 0;
	        _this.frc = f;
	        return _this;
	    }
	    Object.defineProperty(Noise.prototype, "force", {
	        get: function () {
	            return this.frc;
	        },
	        set: function (f) {
	            this.frc = f;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Noise.prototype.constraintAxes = function (c) {
	        this.axc = c;
	    };
	    Noise.prototype.setFalloff = function (start, end) {
	        if (start === void 0) { start = 0; }
	        if (end === void 0) { end = 1; }
	        this.start = start;
	        this.end = end;
	    };
	    Noise.prototype.apply = function () {
	        var vs = this.mod.getVertices();
	        var vc = vs.length;
	        for (var i = 0; i < vc; i++) {
	            var v = vs[i];
	            var r = (Math.random() * this.force) - (this.force / 2);
	            var p = v.getRatio(this.mod.maxAxis);
	            if (this.start < this.end) {
	                if (p < this.start)
	                    p = 0;
	                if (p > this.end)
	                    p = 1;
	            }
	            else if (this.start > this.end) {
	                p = 1 - p;
	                if (p > this.start)
	                    p = 0;
	                if (p < this.end)
	                    p = 1;
	            }
	            else {
	                p = 1;
	            }
	            if (!(this.axc & 1))
	                v.x += r * p;
	            if (!(this.axc >> 1 & 1))
	                v.y += r * p;
	            if (!(this.axc >> 2 & 1))
	                v.z += r * p;
	        }
	    };
	    return Noise;
	}(Modifier_1.Modifier));
	exports.Noise = Noise;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Vector3_1 = __webpack_require__(7);
	var Modifier_1 = __webpack_require__(12);
	var Pivot = (function (_super) {
	    __extends(Pivot, _super);
	    function Pivot(x, y, z) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (z === void 0) { z = 0; }
	        var _this = _super.call(this) || this;
	        _this.pivot = new Vector3_1.Vector3(x, y, z);
	        return _this;
	    }
	    Pivot.prototype.setMeshCenter = function () {
	        var vx = -(this.mod.minX + this.mod.width / 2);
	        var vy = -(this.mod.minY + this.mod.height / 2);
	        var vz = -(this.mod.minZ + this.mod.depth / 2);
	        this.pivot = new Vector3_1.Vector3(vx, vy, vz);
	    };
	    Pivot.prototype.apply = function () {
	        var vs = this.mod.getVertices();
	        var vc = vs.length;
	        for (var i = 0; i < vc; i++) {
	            var v = vs[i];
	            v.vector = v.vector.add(this.pivot);
	        }
	        var npivot = this.pivot.clone();
	        this.mod.updateMeshPosition(npivot.negate());
	    };
	    return Pivot;
	}(Modifier_1.Modifier));
	exports.Pivot = Pivot;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var ModConstant_1 = __webpack_require__(8);
	var XMath_1 = __webpack_require__(20);
	var Modifier_1 = __webpack_require__(12);
	var Skew = (function (_super) {
	    __extends(Skew, _super);
	    function Skew(f) {
	        if (f === void 0) { f = 0; }
	        var _this = _super.call(this) || this;
	        _this._offset = .5;
	        _this._constraint = ModConstant_1.ModConstant.NONE;
	        _this._power = 1;
	        _this._falloff = 1;
	        _this._inverseFalloff = false;
	        _this._oneSide = false;
	        _this._swapAxes = false;
	        _this._force = f;
	        return _this;
	    }
	    Skew.prototype.setModifiable = function (mod) {
	        _super.prototype.setModifiable.call(this, mod);
	        this._skewAxis = this._skewAxis || mod.maxAxis;
	    };
	    Skew.prototype.apply = function () {
	        var vertices = this.mod.getVertices();
	        var verticesLength = vertices.length;
	        for (var i = 0; i < verticesLength; i++) {
	            var v = vertices[i];
	            if (this._constraint == ModConstant_1.ModConstant.LEFT && v.getRatio(this._skewAxis) <= this._offset)
	                continue;
	            if (this._constraint == ModConstant_1.ModConstant.RIGHT && v.getRatio(this._skewAxis) > this._offset)
	                continue;
	            var r = v.getRatio(this._skewAxis) - this._offset;
	            if (this._oneSide)
	                r = Math.abs(r);
	            var dr = v.getRatio(this.displaceAxis);
	            if (this._inverseFalloff)
	                dr = 1 - dr;
	            var f = this._falloff + dr * (1 - this._falloff);
	            var p = Math.pow(Math.abs(r), this._power) * XMath_1.XMath.sign(r, 1);
	            var vl = v.getValue(this.displaceAxis) + this.force * p * f;
	            v.setValue(this.displaceAxis, vl);
	        }
	    };
	    Object.defineProperty(Skew.prototype, "displaceAxis", {
	        get: function () {
	            switch (this._skewAxis) {
	                case ModConstant_1.ModConstant.X:
	                    return (this._swapAxes) ? ModConstant_1.ModConstant.Z : ModConstant_1.ModConstant.Y;
	                case ModConstant_1.ModConstant.Y:
	                    return (this._swapAxes) ? ModConstant_1.ModConstant.Z : ModConstant_1.ModConstant.X;
	                case ModConstant_1.ModConstant.Z:
	                    return (this._swapAxes) ? ModConstant_1.ModConstant.Y : ModConstant_1.ModConstant.X;
	                default:
	                    return 0;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "force", {
	        get: function () {
	            return this._force;
	        },
	        set: function (f) {
	            this._force = f;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "constraint", {
	        get: function () {
	            return this._constraint;
	        },
	        set: function (c) {
	            this._constraint = c;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "offset", {
	        get: function () {
	            return this._offset;
	        },
	        set: function (o) {
	            this._offset = XMath_1.XMath.trim(0, 1, o);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "power", {
	        get: function () {
	            return this._power;
	        },
	        set: function (power) {
	            this._power = Math.max(1, power);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "falloff", {
	        get: function () {
	            return this._falloff;
	        },
	        set: function (falloff) {
	            this._falloff = XMath_1.XMath.trim(0, 1, falloff);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "oneSide", {
	        get: function () {
	            return this._oneSide;
	        },
	        set: function (oneSide) {
	            this._oneSide = oneSide;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "skewAxis", {
	        get: function () {
	            return this._skewAxis;
	        },
	        set: function (skewAxis) {
	            this._skewAxis = skewAxis;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "swapAxes", {
	        get: function () {
	            return this._swapAxes;
	        },
	        set: function (spawAxes) {
	            this._swapAxes = spawAxes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Skew.prototype, "inverseFalloff", {
	        get: function () {
	            return this._inverseFalloff;
	        },
	        set: function (inverseFalloff) {
	            this._inverseFalloff = inverseFalloff;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Skew;
	}(Modifier_1.Modifier));
	exports.Skew = Skew;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Matrix4_1 = __webpack_require__(17);
	var Vector3_1 = __webpack_require__(7);
	var Modifier_1 = __webpack_require__(12);
	var Taper = (function (_super) {
	    __extends(Taper, _super);
	    function Taper(f) {
	        var _this = _super.call(this) || this;
	        _this.start = 0;
	        _this.end = 1;
	        _this._vector = new Vector3_1.Vector3(1, 0, 1);
	        _this._vector2 = new Vector3_1.Vector3(0, 1, 0);
	        _this.frc = f;
	        _this.pow = 1;
	        return _this;
	    }
	    Taper.prototype.setFalloff = function (start, end) {
	        if (start === void 0) { start = 0; }
	        if (end === void 0) { end = 1; }
	        this.start = start;
	        this.end = end;
	    };
	    Object.defineProperty(Taper.prototype, "force", {
	        get: function () {
	            return this.frc;
	        },
	        set: function (value) {
	            this.frc = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Taper.prototype, "power", {
	        get: function () {
	            return this.pow;
	        },
	        set: function (value) {
	            this.pow = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Taper.prototype.apply = function () {
	        var vertices = this.mod.getVertices();
	        var verticesLength = vertices.length;
	        for (var i = 0; i < verticesLength; i++) {
	            var v = vertices[i];
	            var ar = v.ratioVector.multiply(this._vector2);
	            var sc = this.frc * Math.pow(ar.magnitude, this.pow);
	            var m = Matrix4_1.Matrix4.scaleMatrix(1 + sc * this._vector.x, 1 + sc * this._vector.y, 1 + sc * this._vector.z);
	            var n = v.vector;
	            Matrix4_1.Matrix4.multiplyVector(m, n);
	            v.vector = n;
	        }
	    };
	    return Taper;
	}(Modifier_1.Modifier));
	exports.Taper = Taper;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Matrix4_1 = __webpack_require__(17);
	var Vector3_1 = __webpack_require__(7);
	var Modifier_1 = __webpack_require__(12);
	var Twist = (function (_super) {
	    __extends(Twist, _super);
	    function Twist(a) {
	        if (a === void 0) { a = 0; }
	        var _this = _super.call(this) || this;
	        _this._vector = new Vector3_1.Vector3(0, 1, 0);
	        _this.center = Vector3_1.Vector3.ZERO;
	        _this._angle = a;
	        return _this;
	    }
	    Object.defineProperty(Twist.prototype, "angle", {
	        get: function () {
	            return this._angle;
	        },
	        set: function (value) {
	            this._angle = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Twist.prototype, "vector", {
	        get: function () {
	            return this._vector;
	        },
	        set: function (value) {
	            this._vector = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Twist.prototype.apply = function () {
	        this._vector.normalize();
	        var dv = new Vector3_1.Vector3(this.mod.maxX / 2, this.mod.maxY / 2, this.mod.maxZ / 2);
	        var d = -Vector3_1.Vector3.dot(this._vector, this.center);
	        for (var i = 0; i < this.mod.getVertices().length; i++) {
	            var vertex = this.mod.getVertices()[i];
	            var dd = Vector3_1.Vector3.dot(new Vector3_1.Vector3(vertex.x, vertex.y, vertex.z), this._vector) + d;
	            this.twistPoint(vertex, (dd / dv.magnitude) * this._angle);
	        }
	    };
	    Twist.prototype.twistPoint = function (v, a) {
	        var mat = Matrix4_1.Matrix4.translationMatrix(v.x, v.y, v.z);
	        mat = Matrix4_1.Matrix4.multiply(Matrix4_1.Matrix4.rotationMatrix(this._vector.x, this._vector.y, this._vector.z, a), mat);
	        v.x = mat.n14;
	        v.y = mat.n24;
	        v.z = mat.n34;
	    };
	    return Twist;
	}(Modifier_1.Modifier));
	exports.Twist = Twist;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Matrix4_1 = __webpack_require__(17);
	var Vector3_1 = __webpack_require__(7);
	var Modifier_1 = __webpack_require__(12);
	var Wheel = (function (_super) {
	    __extends(Wheel, _super);
	    function Wheel() {
	        var _this = _super.call(this) || this;
	        _this.steerVector = new Vector3_1.Vector3(0, 1, 0);
	        _this.rollVector = new Vector3_1.Vector3(0, 0, 1);
	        _this.speed = 0;
	        _this.turn = 0;
	        _this.roll = 0;
	        return _this;
	    }
	    Wheel.prototype.setModifiable = function (mod) {
	        _super.prototype.setModifiable.call(this, mod);
	        this._radius = mod.width / 2;
	    };
	    Wheel.prototype.apply = function () {
	        this.roll += this.speed;
	        var vs = this.mod.getVertices();
	        var vc = vs.length;
	        var ms;
	        if (this.turn != 0) {
	            var mt = Matrix4_1.Matrix4.rotationMatrix(this.steerVector.x, this.steerVector.y, this.steerVector.z, this.turn);
	            var rv = this.rollVector.clone();
	            Matrix4_1.Matrix4.multiplyVector(mt, rv);
	            ms = Matrix4_1.Matrix4.rotationMatrix(rv.x, rv.y, rv.z, this.roll);
	        }
	        else {
	            ms = Matrix4_1.Matrix4.rotationMatrix(this.rollVector.x, this.rollVector.y, this.rollVector.z, this.roll);
	        }
	        for (var i = 0; i < vc; i++) {
	            var v = vs[i];
	            var c = v.vector.clone();
	            if (this.turn != 0)
	                Matrix4_1.Matrix4.multiplyVector(mt, c);
	            Matrix4_1.Matrix4.multiplyVector(ms, c);
	            v.x = c.x;
	            v.y = c.y;
	            v.z = c.z;
	        }
	    };
	    Object.defineProperty(Wheel.prototype, "step", {
	        get: function () {
	            return this._radius * this.speed / Math.PI;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Wheel.prototype, "perimeter", {
	        get: function () {
	            return this._radius * 2 * Math.PI;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Wheel.prototype, "radius", {
	        get: function () {
	            return this._radius;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Wheel;
	}(Modifier_1.Modifier));
	exports.Wheel = Wheel;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Modifier_1 = __webpack_require__(12);
	var EventEmitter_1 = __webpack_require__(22);
	var UserDefined = (function (_super) {
	    __extends(UserDefined, _super);
	    function UserDefined() {
	        var _this = _super.call(this) || this;
	        _this.eventEmitter = new EventEmitter_1.EventEmitter();
	        return _this;
	    }
	    UserDefined.prototype.apply = function () {
	        var vertices = this.mod.getVertices();
	        var verticesLength = vertices.length;
	        for (var i = 0; i < verticesLength; i++) {
	            var v = vertices[i];
	            this.renderVector && this.renderVector(v);
	        }
	        this.dispatchEvent("CHANGE");
	    };
	    UserDefined.prototype.addEventListener = function (type, listener) {
	        this.eventEmitter.on(type, listener);
	    };
	    UserDefined.prototype.dispatchEvent = function (eventName) {
	        return this.eventEmitter.emit(eventName);
	    };
	    UserDefined.prototype.hasEventListener = function (type) {
	        return this.eventEmitter.has(type);
	    };
	    UserDefined.prototype.removeEventListener = function (type, listener) {
	        this.eventEmitter.off(type, listener);
	    };
	    return UserDefined;
	}(Modifier_1.Modifier));
	exports.UserDefined = UserDefined;


/***/ }
/******/ ])
});
;