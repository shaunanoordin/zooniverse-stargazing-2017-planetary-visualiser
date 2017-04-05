/******/ (function(modules) { // webpackBootstrap
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

	"use strict";

	var _importExample = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*  
	                                                                                                                                                          Starter JS
	                                                                                                                                                          ==========
	                                                                                                                                                          
	                                                                                                                                                          Starter tempalte for JS projects
	                                                                                                                                                          
	                                                                                                                                                          (Shaun A. Noordin || shaunanoordin.com || 20160509)
	                                                                                                                                                          ********************************************************************************
	                                                                                                                                                           */

	var RADIUS_SCALE = 0.00000005;
	var DISTANCE_SCALE = 0.00000005;
	var RADIUS_SUN = 695700000; //m
	var RADIUS_EARTH = 6371000; //m
	var AU = 149597870700; //m

	/*  Primary App Class
	 */
	//==============================================================================

	var App = function App() {
	  _classCallCheck(this, App);

	  //Set up the App
	  //----------------------------------------------------------------
	  this.html = {
	    app: document.getElementById("app"),
	    svg: document.getElementById("svg")
	  };
	  this.actors = {};
	  //----------------------------------------------------------------

	  //Set up the SVG
	  //----------------------------------------------------------------
	  this.appWidth = this.html.app.offsetHeight;
	  this.appHeight = this.html.app.offsetHeight;
	  this.appOffsetX = this.appWidth / 2;
	  this.appOffsetY = this.appHeight / 2;

	  var viewbox = -this.appOffsetX + " " + -this.appOffsetY + " " + this.appWidth + " " + this.appHeight;
	  this.html.svg.setAttribute("viewBox", viewbox);
	  //----------------------------------------------------------------

	  //Add elements to the SVG
	  //----------------------------------------------------------------
	  /*let ele;
	  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	  const svgTool = document.createElementNS(, "use");
	  
	  ele = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	  ele.id = "exoStar";
	  ele.setAttribute("r", 100);
	  ele.setAttribute("cx", 0);
	  ele.setAttribute("cy", 0);
	  ele.setAttribute("fill", "#fc3");
	  this.html.svg.append(ele);
	  this.refs[ele.id] = ele;*/

	  var distanceFromStar = void 0,
	      planet = void 0,
	      orbit = void 0;

	  this.actors.exoStar = document.getElementById("exoStar");
	  this.actors.exoStar.setAttribute("r", parseFloat(this.actors.exoStar.dataset.radiusrelativetosol) * RADIUS_SUN * RADIUS_SCALE);
	  this.actors.exoStar.setAttribute("cx", 0);
	  this.actors.exoStar.setAttribute("cy", 0);

	  planet = document.getElementById("exoPlanet1");
	  console.log();
	  planet.setAttribute("r", parseFloat(planet.dataset.radiusrelativetoearth) * RADIUS_EARTH * RADIUS_SCALE);
	  distanceFromStar = parseFloat(planet.dataset.distancefromstar) * AU * DISTANCE_SCALE;
	  planet.setAttribute("cx", 0);
	  planet.setAttribute("cy", distanceFromStar);
	  orbit = document.getElementById("exoPlanet1_orbit");
	  orbit.setAttribute("cx", 0);
	  orbit.setAttribute("cy", 0);
	  orbit.setAttribute("r", distanceFromStar);
	  this.actors.exoPlanet1 = planet;

	  //----------------------------------------------------------------
	};
	//==============================================================================

	/*  Initialisations
	 */
	//==============================================================================


	var app;
	window.onload = function () {
	  window.app = new App();
	};
	//==============================================================================

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*  Example Class
	    Demonstrates ES6 import function in main.js
	 */
	//==============================================================================
	var ImportExample = exports.ImportExample = function () {
	  function ImportExample() {
	    var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "DEFAULT TEXT";

	    _classCallCheck(this, ImportExample);

	    this.txt = txt;
	  }

	  _createClass(ImportExample, [{
	    key: "getText",
	    value: function getText() {
	      return "An ImportExample class was imported and has the text: " + this.txt;
	    }
	  }]);

	  return ImportExample;
	}();
	//==============================================================================

/***/ }
/******/ ]);