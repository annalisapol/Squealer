import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-localization-post',
  templateUrl: './localization-post.component.html',
  styleUrls: ['./localization-post.component.css'],
})
export class LocalizationPostComponent {
  @Input() coordinates: string = '';
  latitudine: string = '';
  longitudine: string = '';
  map!: L.Map;
  

  ngOnInit(){
    const coordinatesArray = this.coordinates.split(',');
    this.latitudine = coordinatesArray[0];
    this.longitudine = coordinatesArray[1];
  }
  ngAfterViewInit() {
    // Inizializza la mappa dopo la visualizzazione dei componenti
    this.initMap();
  }

  private initMap() {
  
    // Crea una mappa Leaflet con le coordinate
    this.map = L.map('map').setView([parseFloat(this.latitudine), parseFloat(this.longitudine)], 13);

    // Aggiungi un layer di mappa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   
    }).addTo(this.map);

    const markerOptions: L.MarkerOptions = {
    icon: L.icon({
      iconUrl: './assets/SLogo.png', // Percorso all'immagine del marker personalizzato
      iconSize: [32, 32], // Dimensioni del marker
      iconAnchor: [16, 32], // Punto in cui il marker tocca la mappa
      popupAnchor: [0, -32], // Punto in cui il popup si apre rispetto al marker
     
    })
  };

    // Aggiungi un marker alla mappa
    L.marker([parseFloat(this.latitudine), parseFloat(this.longitudine)], markerOptions).addTo(this.map)
      .bindPopup(this.latitudine + ',' + this.longitudine).openPopup();
  }
  
  
}