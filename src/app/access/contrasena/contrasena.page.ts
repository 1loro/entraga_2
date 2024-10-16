import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {
  correo = ''; 

  constructor(
    private toastController: ToastController,
    private alertController: AlertController 
  ) {}

  ngOnInit() {}

  
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: 'Enlace de recuperación enviado correctamente',
      duration: 5000, 
      position: 'bottom', 
    });
    await toast.present();
  }

 
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }


  enviarEnlace() {
    if (this.correo.trim() === '') {
      this.mostrarAlerta('Por favor, ingrese su correo electrónico');
    } else if (!this.validarCorreo(this.correo)) {
      this.mostrarAlerta('Por favor, ingrese un correo electrónico válido');
    } else {

      this.mostrarToast();

    }
  }


  validarCorreo(correo: string): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Expresión regular para validar el correo
    return regex.test(correo);
  }
}
