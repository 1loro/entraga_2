import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private viajes: any[] = []; // Array para almacenar múltiples viajes

  constructor() {}

  setData(viaje: any) {
    this.viajes.push(viaje); // Agregar el nuevo viaje al array
  }

  getData() {
    return this.viajes; // Devolver el array de viajes
  }
}