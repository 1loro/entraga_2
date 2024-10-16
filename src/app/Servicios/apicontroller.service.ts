import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIControllerService {

  /* Configuramos URL de nuestar API a consumir */
  apiURL = "http://127.0.0.1:8000/api/usuarios/";

  constructor(private http: HttpClient) { }
  /* Cada funcion que realizaremos de la linea API Consume esta ligada a uyna llamada HTTP
    GET = Obtener datos
    POST = insertar Datos
    PUT = Actualizar datos
    DELETE = eliminar datos

    Cada llamada realizada retorna un objeto de tipo Observable
    El observable es una representacion de datos que llega de forma asincrona , similar a la promise
    Este tipo de Dato o retorno puede funcionar como no funcionar , 
    pero sus respuestas estan mas ligadas a los codigos de estado de respuesta HTTP
    dando respuestas de la linea 200-300 como positivos y 400-500 en caso de errores 

  */
  getUsers(): Observable<any> {
    return this.http.get(this.apiURL);
  }

  postUser(data: any): Observable<any> {
    return this.http.post(this.apiURL, data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(this.apiURL + id + "/", data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiURL + id + "/");
  }

  addUser(nuevoUsuario: any): Observable<any> {
    return this.http.post<any>(this.apiURL, nuevoUsuario);
  }

  login(nombre: string, password: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', { nombre, password });
  }
}
