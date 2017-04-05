/*  
Starter JS
==========

A planetary visualiser for the ABC/Zooniverse's Stargazing 2017 event.
Exoplanets ahoy!

(Shaun A. Noordin || shaunanoordin.com || 20170405)
********************************************************************************
 */

import {ImportExample} from "./importExample.js";

//const STAR_RADIUS_SCALE   = 0.00000003;
//const PLANET_RADIUS_SCALE = 0.00000003;
//const DISTANCE_SCALE      = 0.00000003;
const RADIUS_SUN = 695700000;  //m
const RADIUS_EARTH = 6371000;  //m
const AU = 149597870700;  //m
const FRAMES_PER_SECOND = 50;
const TIME_STEP = 0.005;
const PLANET_NAMES = ["exoPlanet1", "exoPlanet2", "exoPlanet3", "exoPlanet4"];

/*  Primary App Class
 */
//==============================================================================
class App {
  constructor() {
    //Set up the App
    //----------------------------------------------------------------
    this.html = {
      app: document.getElementById("app"),
      svg: document.getElementById("svg"),
      control_zoom: document.getElementById("control_zoom"),
      control_starScale: document.getElementById("control_starScale"),
      control_orbitScale: document.getElementById("control_orbitScale"),
      control_planetScale: document.getElementById("control_planetScale"),
      control_daysPerSecond: document.getElementById("control_daysPerSecond"),
    };
    this.actors = {};
    this.time = 0;  //Number of days passed
    
    this.input = {
      control_zoom: parseFloat(this.html.control_zoom.value),
      control_starScale: parseFloat(this.html.control_starScale.value),
      control_orbitScale: parseFloat(this.html.control_orbitScale.value),
      control_planetScale: parseFloat(this.html.control_planetScale.value),
      control_daysPerSecond: parseFloat(this.html.control_daysPerSecond.value),
    };
    this.html.control_zoom.onchange = this.control_onChange.bind(this);
    this.html.control_starScale.onchange = this.control_onChange.bind(this);
    this.html.control_orbitScale.onchange = this.control_onChange.bind(this);
    this.html.control_planetScale.onchange = this.control_onChange.bind(this);
    this.html.control_daysPerSecond.onchange = this.control_onChange.bind(this);
    this.html.control_zoom.onkeyup = this.control_onChange.bind(this);
    this.html.control_starScale.onkeyup = this.control_onChange.bind(this);
    this.html.control_orbitScale.onkeyup = this.control_onChange.bind(this);
    this.html.control_planetScale.onkeyup = this.control_onChange.bind(this);
    this.html.control_daysPerSecond.onkeyup = this.control_onChange.bind(this);
    //----------------------------------------------------------------
    
    //Set up the SVG
    //----------------------------------------------------------------
    this.appWidth = this.html.app.offsetHeight;
    this.appHeight = this.html.app.offsetHeight;
    this.appOffsetX = this.appWidth / 2;
    this.appOffsetY = this.appHeight / 2;

    const viewbox = -this.appOffsetX + " " + -this.appOffsetY + " " + this.appWidth + " " + this.appHeight;
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
    
    this.actors.exoStar = document.getElementById("exoStar");
    for (let name of PLANET_NAMES) {
      this.actors[name] = document.getElementById(name);
    }
    this.updateSizes();
    
    //----------------------------------------------------------------
    
    this.runCycle = setInterval(this.run.bind(this), 1000 / FRAMES_PER_SECOND);
  }
  
  run() {
    for (let name of PLANET_NAMES) {
      let planet = this.actors[name];
      let distanceFromStar = parseFloat(planet.dataset.distancefromstar) * AU * this.input.control_zoom * this.input.control_orbitScale;
      let orbitalPeriod = parseFloat(planet.dataset.orbitalperiod);
      let angle = (this.time % orbitalPeriod) / orbitalPeriod * 2 * Math.PI;
            
      planet.setAttribute("cx", Math.cos(angle) * distanceFromStar);
      planet.setAttribute("cy", Math.sin(angle) * distanceFromStar);
    }
    this.time += (this.input.control_daysPerSecond / FRAMES_PER_SECOND);
  }
  
  updateSizes() {
    let distanceFromStar, planet, orbit;
    
    this.actors.exoStar.setAttribute("r", parseFloat(this.actors.exoStar.dataset.radiusrelativetosol) * RADIUS_SUN * this.input.control_zoom * this.input.control_starScale);
    this.actors.exoStar.setAttribute("cx", 0);
    this.actors.exoStar.setAttribute("cy", 0);
    
    for (let name of PLANET_NAMES) {
      planet = document.getElementById(name);
      planet.setAttribute("r", parseFloat(planet.dataset.radiusrelativetoearth) * RADIUS_EARTH  * this.input.control_zoom * this.input.control_planetScale);
      distanceFromStar = parseFloat(planet.dataset.distancefromstar) * AU * this.input.control_zoom * this.input.control_orbitScale;
      planet.setAttribute("cx", 0);
      planet.setAttribute("cy", distanceFromStar);
      orbit = document.getElementById(name + "_orbit");
      orbit.setAttribute("r", distanceFromStar);
    }
  }
  
  control_onChange(e) {
    if (!e.target || e.target.value === undefined || Number.isNaN(parseFloat(e.target.value))) return;
    this.input[e.target.id] = parseFloat(e.target.value);
    this.updateSizes();
  }
}
//==============================================================================

/*  Initialisations
 */
//==============================================================================
var app;
window.onload = function() {
  window.app = new App();
};
//==============================================================================
