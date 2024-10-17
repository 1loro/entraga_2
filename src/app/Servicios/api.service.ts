// app/services/api.service.ts
import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://127.0.0.1:8000/api/usuarios/';

  constructor() { }

  // Obtener todos los usuarios
  getUsuarios() {
    return axios.get(this.API_URL);
  }

  // Agregar un nuevo usuario
  addUsuario(usuario: any) {
    return axios.post(this.API_URL, usuario);
  }

  // Modificar un usuario existente
  updateUsuario(id: number, usuario: any) {
    return axios.put(`${this.API_URL}${id}/`, usuario);
  }

  // Eliminar un usuario
  deleteUsuario(id: number) {
    return axios.delete(`${this.API_URL}${id}/`);
  }

  
  
}
