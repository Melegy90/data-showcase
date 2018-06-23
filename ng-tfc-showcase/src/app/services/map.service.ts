import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: mapboxgl.Map;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
   }

   // Add auto-complete for "from - to"
fromGeocoder = new MapboxGeocoder({
  // limit results to Egypt
  country: 'eg',
  placeholder: 'Enter origin or click on the Map',
  accessToken: environment.mapbox.accessToken
});

toGeocoder = new MapboxGeocoder({
  country: 'eg',
  placeholder: 'Enter destination',
  accessToken: environment.mapbox.accessToken
});

}
