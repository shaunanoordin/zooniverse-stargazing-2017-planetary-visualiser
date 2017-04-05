/*  
Starter JS
==========

Starter tempalte for JS projects

(Shaun A. Noordin || shaunanoordin.com || 20160509)
********************************************************************************
 */

import {ImportExample} from "./importExample.js";

const RADIUS_SCALE = 0.00000005;
const DISTANCE_SCALE = 0.00000005;
const RADIUS_SUN = 695700000;  //m
const RADIUS_EARTH = 6371000;  //m
const AU = 149597870700;  //m

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
