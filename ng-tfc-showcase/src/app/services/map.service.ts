import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: mapboxgl.Map;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
   }

  initMap(){

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
      zoom: 9,
      center: [31.3, 30.05] // Cairo, Egypt
    });


// Add zoom and rotation controls to the map.
this.map.addControl(new mapboxgl.NavigationControl(
  { showCompass: false }
));

   } // end initMap

}
