import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private connnectionStatus = false;
  private apiUrlLogin = 'http://127.0.0.1:8000/api/login/';
  private apiUrlUsuarios = 'http://127.0.0.1:8000/api/usuarios/';
  private apiUrlRegister = 'http://127.0.0.1:8000/api/register/';

  constructor(private http: HttpClient, private router: Router) {}

  async login(user: string, pass: string, apiUrl: string): Promise<boolean> { 
    const loginData = { nombre: user, password: pass };
    

    try {
      const response = await this.http.post<any>(apiUrl, loginData).toPromise();

      if (response.id || response.token || response.message === 'Login successful') { 
        console.log("Usuario autenticado");
        localStorage.setItem('user', JSON.stringify({ id: response.id, username: user })); 
        this.router.navigate(['/perfil']);
        this.connnectionStatus = true;
        return true; 
      } else {
        console.log("Error en las credenciales: respuesta de la API", response);
      }
    } catch (error: any) { 
      console.error("Error en la petición de login:", error);
    }

    this.connnectionStatus = false;
    return false; 
  }

  
  logout() {
    this.connnectionStatus = false;
    localStorage.removeItem('user'); 
  }


  isConected() {
    return this.connnectionStatus;
  }

  async register(nombre: string, email: string, password: string): Promise<boolean> {
    if (!nombre || !email || !password) {
      console.error("Todos los campos son requeridos");
      return false;
    }

    const registerData = { nombre, email, password };

    try {
      const response = await this.http.post<any>(this.apiUrlRegister, registerData).toPromise();

      return response.message === 'User registered successfully';
    } catch (error: any) {
      console.error("Error en la petición de registro:", error.error || error); 
      return false;
    }
  }

  loginUsuario(user: string, pass: string): Promise<boolean> {
    return this.login(user, pass, this.apiUrlUsuarios);
  }


  loginBDD(user: string, pass: string): Promise<boolean> {
    return this.login(user, pass, this.apiUrlLogin);
  }

  async obtenerUsuario(): Promise<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
    console.log('ID del usuario:', user.id); 
    const apiUrl = this.apiUrlUsuarios + user.id; 

    try {
      const response = await this.http.get<any>(apiUrl).toPromise();
      return response;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error; 
    }
  }
}
