import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeodataService {

  // Replace this with your point data source
  url: string;

  constructor() { 
  // Replace this with your point data source
  this.url = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_geography_regions_points.geojson";
  }
}
