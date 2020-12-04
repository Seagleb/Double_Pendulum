/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}; // Event Listeners

addEventListener('mousedown', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('mouseup', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}); // Objects

var Pendulum = /*#__PURE__*/function () {
  function Pendulum(anchor_x, anchor_y, arm_len1, start_theta1, arm_len2, start_theta2, mass1, mass2) {
    _classCallCheck(this, Pendulum);

    this.factor = .005;
    this.gravity = 9.8 * this.factor;
    this.anchor_x = anchor_x;
    this.anchor_y = anchor_y;
    this.arm_len1 = arm_len1;
    this.arm_len2 = arm_len2;
    this.theta1 = start_theta1;
    this.theta2 = start_theta2;
    this.mass1 = mass1 * this.factor;
    this.mass2 = mass2 * this.factor;
    this.bob_radius1 = mass1 * .5;
    this.bob_radius2 = mass2 * .5;
    this.bob_x1 = this.anchor_x + this.arm_len1 * Math.cos(this.theta1);
    this.bob_y1 = this.anchor_y + this.arm_len1 * Math.sin(this.theta1);
    this.bob_x2 = this.bob_x1 + this.arm_len2 * Math.cos(this.theta2);
    this.bob_y2 = this.bob_y1 + this.arm_len2 * Math.sin(this.theta2);
    this.angular_acceleration1 = 0;
    this.angular_velocity1 = 0;
    this.angular_acceleration2 = 0;
    this.angular_velocity2 = 0;
  }

  _createClass(Pendulum, [{
    key: "draw",
    value: function draw() {
      //Bob 1
      c.beginPath();
      c.moveTo(this.anchor_x, this.anchor_y);
      c.lineTo(this.bob_x1, this.bob_y1);
      c.stroke();
      c.closePath();
      c.beginPath();
      c.arc(this.bob_x1, this.bob_y1, this.bob_radius1, 0, 2 * Math.PI, false);
      c.fill();
      c.closePath(); //Bob 2

      c.beginPath();
      c.moveTo(this.bob_x1, this.bob_y1);
      c.lineTo(this.bob_x2, this.bob_y2);
      c.stroke();
      c.closePath();
      c.beginPath();
      c.arc(this.bob_x2, this.bob_y2, this.bob_radius2, 0, 2 * Math.PI, false);
      c.fill();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      this.bob_x1 = this.anchor_x + this.arm_len1 * Math.cos(this.theta1);
      this.bob_y1 = this.anchor_y + this.arm_len1 * Math.sin(this.theta1);
      this.bob_x2 = this.bob_x1 + this.arm_len2 * Math.cos(this.theta2);
      this.bob_y2 = this.bob_y1 + this.arm_len2 * Math.sin(this.theta2);
      this.angular_velocity1 += this.angular_acceleration1;
      this.angular_velocity2 += this.angular_acceleration2;
      this.angular_velocity1 *= .998;
      this.angular_velocity2 *= .998;
      this.angular_acceleration1 = (-this.gravity * (2 * this.mass1 + this.mass2) * Math.sin(this.theta1) - this.mass2 * this.gravity * Math.sin(this.theta1 - 2 * this.theta2) - 2 * Math.sin(this.theta1 - this.theta2) * this.mass2 * (Math.pow(this.angular_velocity2, 2) * this.arm_len2 + Math.pow(this.angular_velocity1, 2) * this.arm_len1 * Math.cos(this.theta1 - this.theta2))) / (this.arm_len1 * (2 * this.mass1 + this.mass2 - this.mass2 * Math.cos(2 * this.theta1 - 2 * this.theta2)));
      this.angular_acceleration2 = 2 * Math.sin(this.theta1 - this.theta2) * (Math.pow(this.angular_velocity1, 2) * this.arm_len1 * (this.mass1 + this.mass2) + this.gravity * (this.mass1 + this.mass2) * Math.cos(this.theta1) + Math.pow(this.angular_velocity2, 2) * this.arm_len2 * this.mass2 * Math.cos(this.theta1 - this.theta2)) / (this.arm_len2 * (2 * this.mass1 + this.mass2 - this.mass2 * Math.cos(2 * this.theta1 - 2 * this.theta2)));
      this.theta1 += this.angular_velocity1;
      this.theta2 += this.angular_velocity2;
      this.draw();
    }
  }]);

  return Pendulum;
}(); // Implementation


var objects;

function init() {
  objects = [new Pendulum(canvas.width / 2, canvas.height / 2, 100, Math.PI, 100, Math.PI / 2, 20, 20)]; // for (let i = 0; i < 400; i++) {
  //    objects.push()
  // }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach(function (object) {
    object.update();
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map