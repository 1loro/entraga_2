import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root' 
})
export class ViajeService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async guardarViaje(viaje: any) {
    const viajes = await this.storage.get('viajes') || [];
    viajes.push(viaje);
    await this.storage.set('viajes', viajes);
  }

  async obtenerViajes() {
    return await this.storage.get('viajes') || [];
  }
}
