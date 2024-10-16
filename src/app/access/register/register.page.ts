import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    nombre: "",
    email: "",
    password: ""
  } 

  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private router: Router,
    private authService: AuthenticatorService 
  ) {}

  ngOnInit() {}

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, 
      position: 'bottom', 
    });
    await toast.present();
  }

  async registrar() {
    console.log(this.user);

    
    const registroExitoso = await this.authService.register(this.user.nombre, this.user.email, this.user.password);

    if (registroExitoso) {
        
        this.mostrarToast('Registro exitoso');
        this.router.navigate(['/home']);
    } else {
        
        this.mostrarAlerta('Error en el registro, intenta de nuevo');
    }
}

}
