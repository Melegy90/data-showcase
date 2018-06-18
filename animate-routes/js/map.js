window.onload = function(){
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsZWd5IiwiYSI6ImNpeGVxeDNkaTAwNWEyeW8zMTQ3cml2N2YifQ.w3UA7psgrvBB0upwc_wNUg'

//Setup mapbox-gl map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
    center: [31.3, 30.05],
    zoom: 9

})
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(
    { showCompass: false }
));

// Add auto-complete for "from - to"
var fromGeocoder = new MapboxGeocoder({
    // limit results to Egypt
    country: 'eg',
    placeholder: 'Choose an origin or click on the Map',
    accessToken: mapboxgl.accessToken
});

var toGeocoder = new MapboxGeocoder({
    country: 'eg',
    placeholder: 'Enter destination',
    accessToken: mapboxgl.accessToken
});

toGeocoder.on('click', function(e){console.log(e)});
// TODO: append geocoder to DOM https://bl.ocks.org/tristen/a09627f01d3a3bc54139d52a5eb01386
map.addControl(fromGeocoder);
map.addControl(toGeocoder);

// Setup our svg layer that we can manipulate with d3
var container = map.getCanvasContainer();
var svg = d3.select(container).append("svg");
var g = svg.append("g");

// calculate the original d3 projection
var d3Projection = getD3();

var path = d3.geo.path();
// Replace this with your point data source
var url = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_geography_regions_points.geojson";

// we calculate the scale given mapbox state (derived from viewport-mercator-project's code)
// to define a d3 projection
function getD3() {
    var bbox = document.body.getBoundingClientRect();
    var center = map.getCenter();
    var zoom = map.getZoom();
    // 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
    var scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);

    var d3projection = d3.geo.mercator()
        .center([center.lng, center.lat])
        .translate([bbox.width / 2, bbox.height / 2])
        .scale(scale);

    return d3projection;
}


var toLine = d3.svg.line()
    .interpolate("linear")
    .x(function (d) {
        var x = d3Projection(d.geometry.coordinates)[0];
        return x
    })
    .y(function (d) {
        var y = d3Projection(d.geometry.coordinates)[1];
        return y
    });

d3.json(url, function (err, data) {
    var points = data;
    var dots = svg.selectAll("circle.dot")
        .data(points.features)

    var linePath = svg.selectAll(".lineConnect")
        .data([points.features])
        .enter()
        .append("path")
        .attr("class", "lineConnect");

    dots.enter().append("circle").classed("dot", true)
        .attr("r", 1)
        .style({
            fill: "#0082a3",
            "fill-opacity": 0.6,
            stroke: "#004d60",
            "stroke-width": 1
        })
        .attr("r", 6)

    var marker = g.append("circle")
        .attr("r", 10)
        .attr("id", "marker")
        .attr("class", "travelMarker");

    function transition() {
        linePath.transition()
            .duration(7500)
            .attrTween("stroke-dasharray", tweenDash)
            .each("end", function () {
                d3.select(this).call(transition);// infinite loop
            });
    } //end transition

    function tweenDash() {
        return function (t) {
            //total length of path (single value)
            var l = linePath.node().getTotalLength();

            interpolate = d3.interpolateString("0," + l, l + "," + l);
            //t is fraction of time 0-1 since transition began
            var marker = d3.select("#marker");

            var p = linePath.node().getPointAtLength(t * l);

            //Move the marker to that point
            marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
            // console.log(interpolate(t))
            return interpolate(t);
        }
    } //end tweenDash


    function render() {
        d3Projection = getD3();
        path.projection(d3Projection)

        dots
            .attr({
                cx: function (d) {
                    var x = d3Projection(d.geometry.coordinates)[0];
                    return x
                },
                cy: function (d) {
                    var y = d3Projection(d.geometry.coordinates)[1];
                    return y
                },
            })

        linePath.attr("d", toLine)
    }

    // re-render our visualization whenever the view changes
    map.on("viewreset", function () {
        render()
    })
    map.on("move", function () {
        render()
    })

    // render our initial visualization
    render();
    transition();
})


}
