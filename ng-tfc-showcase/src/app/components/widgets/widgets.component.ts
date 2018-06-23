import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit, AfterViewInit {

  hide:boolean = true;
  fromGeocoder: any;

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef) { }

  toggleMenu(){
    this.hide=!this.hide;
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    // append geocoder to DOM https://bl.ocks.org/tristen/a09627f01d3a3bc54139d52a5eb01386
    let fromGeocoder= this.mapService.fromGeocoder;
    document.getElementById('fromDirections').appendChild(fromGeocoder.onAdd(this.mapService.map));
    let toGeocoder = this.mapService.toGeocoder;
    document.getElementById('toDirections').appendChild(toGeocoder.onAdd(this.mapService.map));
    // this.fromGeocoder = this.mapService.fromGeocoder.onAdd(this.mapService.map);
    // this.cdr.detectChanges();
    // document.getElementById('fromDirections').appendChild(fromGeocoder);

  }

}
