/*  
Starter JS
==========

Starter tempalte for JS projects

(Shaun A. Noordin || shaunanoordin.com || 20160509)
********************************************************************************
 */

import {ImportExample} from "./importExample.js";

const STAR_RADIUS_SCALE   = 0.00000003;
const PLANET_RADIUS_SCALE = 0.00000003;
const DISTANCE_SCALE      = 0.00000003;
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
    };
    this.actors = {};
    this.time = 0;  //Number of days passed
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
    
    let distanceFromStar, planet, orbit;
    
    this.actors.exoStar = document.getElementById("exoStar");
    this.actors.exoStar.setAttribute("r", parseFloat(this.actors.exoStar.dataset.radiusrelativetosol) * RADIUS_SUN * STAR_RADIUS_SCALE);
    this.actors.exoStar.setAttribute("cx", 0);
    this.actors.exoStar.setAttribute("cy", 0);
    
    for (let name of PLANET_NAMES) {
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
    
    this.runCycle = setInterval(this.run.bind(this), 1000 / FRAMES_PER_SECOND);
  }
  
  run() {
    for (let name of PLANET_NAMES) {
      let planet = this.actors[name];
      let distanceFromStar = parseFloat(planet.dataset.distancefromstar) * AU * DISTANCE_SCALE;
      let orbitalPeriod = parseFloat(planet.dataset.orbitalperiod);
      let angle = (this.time % orbitalPeriod) / orbitalPeriod * 2 * Math.PI;
            
      planet.setAttribute("cx", Math.cos(angle) * distanceFromStar);
      planet.setAttribute("cy", Math.sin(angle) * distanceFromStar);
    }
    
    this.time += TIME_STEP;
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
