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
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
      zoom: 9,
      center: [31.3, 30.05] // Cairo, Egypt
    });


// Add zoom and rotation controls to the map.
this.mapService.map.addControl(new mapboxgl.NavigationControl(
  { showCompass: false }
));

   } // end initMap

}
