import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-widgets',
  animations: [
    trigger('fadeIn',[
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ],
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit, AfterViewInit {

  hide:boolean = true;

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef) { }

  toggleMenu(){
    this.hide=!this.hide;
  }
  get menuState() {
    return this.hide? 'hide':'show'
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    // append geocoder to DOM https://bl.ocks.org/tristen/a09627f01d3a3bc54139d52a5eb01386
    // Most probably will drop Mapbox's Geocoder and make our own search inputs
    //Map.on and Map.off to register/remove. Also declare the event function by itself and then pass it
    let fromGeocoder= this.mapService.fromGeocoder;
    document.getElementById('fromDirections').appendChild(fromGeocoder.onAdd(this.mapService.map));
    let toGeocoder = this.mapService.toGeocoder;
    document.getElementById('toDirections').appendChild(toGeocoder.onAdd(this.mapService.map));



  }

}
