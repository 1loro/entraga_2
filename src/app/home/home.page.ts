import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { AuthenticatorService } from './../Servicios/authenticator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private router: Router, private alertController: AlertController,  private auth: AuthenticatorService) {} 

  user = {
    username: '',
    password: '',
  };
  mensaje = '';


  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Campos incompletos',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert'  
    });

    await alert.present();
  }

  async validar() { 
    if (this.user.username.length === 0) { 
      this.mensaje = 'Usuario vacío';
      this.mostrarAlerta('Por favor, ingrese su usuario');
      return; 
    }

    if (this.user.password.length === 0) { 
      this.mensaje = 'Contraseña vacía';
      this.mostrarAlerta('Por favor, ingrese su contraseña');
      return; 
    }

    this.auth.loginBDD(this.user.username, this.user.password).then(
      isLoggedIn => {
        if (isLoggedIn) {
          this.mensaje = '';
          let navigationExtras: NavigationExtras = {
            state: {
              username: this.user.username,
              password: this.user.password,
            },
          };
          this.router.navigate(['/perfil'], navigationExtras);
        } else {
          this.mostrarAlerta('Credenciales erróneas');
        }
      },
      error => {
        this.mostrarAlerta('Error en el servidor');
        console.error('Error en el login:', error);
      }
    );
}

}
