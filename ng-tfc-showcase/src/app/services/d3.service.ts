import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { MapService } from './map.service';
import { GeodataService } from './geodata.service';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  // Setup our svg layer that we can manipulate with d3
  container: any ;
  svg: any;
  g: any;
  linePath: any;
  path: any;
  d3Projection: any;
  toLine: any;
  dots: any;

  url: string;
  
  constructor(private mapService: MapService, private geodataService: GeodataService) {

  // Setup our svg layer that we can manipulate with d3
    this.path = d3.geoPath();

    this.url = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_geography_regions_points.geojson";
   } // end constructor

   initD3(){
       let ref = this;
    this.container = this.mapService.map.getCanvasContainer();
    this.svg = d3.select(this.container).append("svg");
    this.g = this.svg.append("g");
      // calculate the original d3 projection
  this.d3Projection = this.getD3();
  this.toLine = d3.line()
  .curve(d3.curveLinear)
  .x(function (d) {
      var x = ref.d3Projection(d.geometry.coordinates)[0];
      return x
  })
  .y(function (d) {
      var y = ref.d3Projection(d.geometry.coordinates)[1];
      return y
  });

    // re-render our visualization whenever the view changes
    this.mapService.map.on("viewreset", function () {
        //this.render()
    })
    this.mapService.map.on("move", function () {
        //this.render()
    })

   }

  getD3() {
    var bbox = document.body.getBoundingClientRect();
    var center = this.mapService.map.getCenter();
    var zoom = this.mapService.map.getZoom();
    // 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
    var scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);

    var d3projection = d3.geoMercator()
        .center([center.lng, center.lat])
        .translate([bbox.width / 2, bbox.height / 2])
        .scale(scale);

    return d3projection;
}

  transition() {
      let ref = this;
    ref.linePath.transition()
        .duration(7500)
        .attrTween("stroke-dasharray", ()=>{
            return function (t) {
                //total length of path (single value)
                var l = ref.linePath.node().getTotalLength();
        
                var interpolate = d3.interpolateString("0," + l, l + "," + l);
                //t is fraction of time 0-1 since transition began
                var marker = d3.select("#marker");
                
                var p = ref.linePath.node().getPointAtLength(t * l);
        
                //Move the marker to that point
                marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
                // console.log(interpolate(t))
                return interpolate(t);
            }
        })
        .on("end", function () {
            // d3.select(ref.linePath).call(ref.transition);// infinite loop
        });
} //end transition

initSVG(data){

  let points = data;
  
  this.dots = this.svg.selectAll("circle.dot")
      .data(data.features);

  this.linePath = this.svg.selectAll(".lineConnect")
      .data([data.features])
      .enter()
      .append("path")
      .attr("class", "lineConnect");

    // console.log('after',this.dots);
    // console.log('line', this.linePath);
    
  this.dots.enter().append("circle").classed("dot", true)
  .attr("r", 1)
  .style('fill', "#0082a3").style('fill-opacity', 0.6)
  .style('stroke', "#004d60").style('stroke-width', 1).attr("r",6);
      

  let marker = this.g.append("circle")
      .attr("r", 10)
      .attr("id", "marker")
      .attr("class", "travelMarker");

        // render our initial visualization
  this.render();
  this.transition();
}

render() {
  this.d3Projection = this.getD3();
  this.path.projection(this.d3Projection);

  this.dots
  .attr('cx', function (d) {
              var x = this.d3Projection(d.geometry.coordinates)[0];
              return x
          }).attr(
          'cy', function (d) {
              var y = this.d3Projection(d.geometry.coordinates)[1];
              return y
          })

  this.linePath.attr("d", this.toLine);
}

getData(){
    
    let ref = this;
  d3.json(this.geodataService.url).then(function(data) {

    ref.initSVG(data);
    
  });
  
}


}
