import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { D3Service } from '../../services/d3.service';
import * as mapboxgl from 'mapbox-gl';


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
      style: 'mapbox://styles/mapbox/outdoors-v10',
      zoom: 9,
      center: [31.3, 30.05] // Cairo, Egypt
    });

    let _map = this.mapService.map;
// Add zoom and rotation controls to the map.
this.mapService.map.addControl(new mapboxgl.NavigationControl(
  { showCompass: false }
));

this.mapService.map.on('load',()=>{

  this.mapService.map.addSource('trips', {
    type: 'geojson',
    data: '../../../data/trips.geojson'
  });

  this.mapService.map.addLayer({
    'id':'trips',
    'type': 'line',
    'source': 'trips',
    'layout': {
        'visibility': 'visible',
        'line-join': 'round',
        'line-cap': 'round'
    },
    'paint': {
        'line-color': [
          'match',
          ['get', 'agency_id'],
          'BOX', '#f0e542',
          'COOP', '#eaafec',
          'CTA', '#2229fd',
          'CTA_M', '#ed0a4d',
          'P_B_8', '#56e4e5',
          'P_O_14', '#37ff91',
          /* other */ '#ccc'
        ],
        'line-width': 1
    }

  });


});

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    this.mapService.map.on('click', 'trips', function (e) {
      new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties['trip_id'])
          .addTo(_map);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  this.mapService.map.on('mouseenter', 'trips', function () {
    _map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  this.mapService.map.on('mouseleave', 'trips', function () {
    _map.getCanvas().style.cursor = '';
  });

   } // end initMap

}
