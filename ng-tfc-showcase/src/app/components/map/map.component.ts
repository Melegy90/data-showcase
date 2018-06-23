import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { D3Service } from '../../services/d3.service';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterContentInit {

  constructor(private mapService: MapService, private d3Service: D3Service) { }

  ngOnInit() {
    this.initMap();
  }

  ngAfterContentInit() {

    //Never mind the motherfucking animation for now
    // this.d3Service.initD3();
    // this.d3Service.getData();

  }

  initMap(){

    this.mapService.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
      zoom: 9,
      center: [31.3, 30.05] // Cairo, Egypt
    });


// Add zoom and rotation controls to the map.
this.mapService.map.addControl(new mapboxgl.NavigationControl(
  { showCompass: false }
));


// Add auto-complete for "from - to"
var fromGeocoder = new MapboxGeocoder({
  // limit results to Egypt
  country: 'eg',
  placeholder: 'Enter origin or click on the Map',
  accessToken: mapboxgl.accessToken
});

var toGeocoder = new MapboxGeocoder({
  country: 'eg',
  placeholder: 'Enter destination',
  accessToken: mapboxgl.accessToken
});

toGeocoder.on('click', function(e){console.log(e)});
// TODO: append geocoder to DOM https://bl.ocks.org/tristen/a09627f01d3a3bc54139d52a5eb01386
this.mapService.map.addControl(fromGeocoder);
this.mapService.map.addControl(toGeocoder);

   } // end initMap

}
