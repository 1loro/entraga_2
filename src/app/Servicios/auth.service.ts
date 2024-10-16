// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/login/';  // URL de tu API de Django

  constructor(private http: HttpClient) {}

  loginBDD(nombre: string, password: string): Observable<boolean> {
    const loginData = { nombre: nombre, password: password };
    
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      map(response => {
        
        if (response.success) {
          return true;  // Usuario autenticado
        } else {
          return false;  // Credenciales inválidas
        }
      })
    );
  }
}
