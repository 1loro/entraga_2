import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private datos: any[] = [
    { nombreConductor: 'Juan Pérez', comunaOrigen: 'Comuna A', comunaDestino: 'Comuna B', valorKilometro: 1000 },
   
  ];

  constructor() {}

  getData() {
    return this.datos;
  }
}
