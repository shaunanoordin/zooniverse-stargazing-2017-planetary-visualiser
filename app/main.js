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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Starter JS
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ==========
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Starter tempalte for JS projects
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     (Shaun A. Noordin || shaunanoordin.com || 20160509)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ********************************************************************************
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _importExample = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STAR_RADIUS_SCALE = 0.00000003;
	var PLANET_RADIUS_SCALE = 0.00000003;
	var DISTANCE_SCALE = 0.00000003;
	var RADIUS_SUN = 695700000; //m
	var RADIUS_EARTH = 6371000; //m
	var AU = 149597870700; //m
	var FRAMES_PER_SECOND = 50;
	var TIME_STEP = 0.005;
	var PLANET_NAMES = ["exoPlanet1", "exoPlanet2", "exoPlanet3", "exoPlanet4"];

	/*  Primary App Class
	 */
	//==============================================================================

	var App = function () {
	  function App() {
	    _classCallCheck(this, App);

	    //Set up the App
	    //----------------------------------------------------------------
	    this.html = {
	      app: document.getElementById("app"),
	      svg: document.getElementById("svg")
	    };
	    this.actors = {};
	    this.time = 0; //Number of days passed
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
	    this.actors.exoStar.setAttribute("r", parseFloat(this.actors.exoStar.dataset.radiusrelativetosol) * RADIUS_SUN * STAR_RADIUS_SCALE);
	    this.actors.exoStar.setAttribute("cx", 0);
	    this.actors.exoStar.setAttribute("cy", 0);

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = PLANET_NAMES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var name = _step.value;

	        planet = document.getElementById(name);
	        planet.setAttribute("r", parseFloat(planet.dataset.radiusrelativetoearth) * RADIUS_EARTH * PLANET_RADIUS_SCALE);
	        distanceFromStar = parseFloat(planet.dataset.distancefromstar) * AU * DISTANCE_SCALE;
	        planet.setAttribute("cx", 0);
	        planet.setAttribute("cy", distanceFromStar);
	        orbit = document.getElementById(name + "_orbit");
	        orbit.setAttribute("cx", 0);
	        orbit.setAttribute("cy", 0);
	        orbit.setAttribute("r", distanceFromStar);
	        this.actors[name] = planet;
	      }

	      //----------------------------------------------------------------
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    this.runCycle = setInterval(this.run.bind(this), 1000 / FRAMES_PER_SECOND);
	  }

	  _createClass(App, [{
	    key: "run",
	    value: function run() {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = PLANET_NAMES[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var name = _step2.value;

	          var _planet = this.actors[name];
	          var _distanceFromStar = parseFloat(_planet.dataset.distancefromstar) * AU * DISTANCE_SCALE;
	          var orbitalPeriod = parseFloat(_planet.dataset.orbitalperiod);
	          var angle = this.time % orbitalPeriod / orbitalPeriod * 2 * Math.PI;

	          _planet.setAttribute("cx", Math.cos(angle) * _distanceFromStar);
	          _planet.setAttribute("cy", Math.sin(angle) * _distanceFromStar);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      this.time += TIME_STEP;
	    }
	  }]);

	  return App;
	}();
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