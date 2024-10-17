import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../Servicios/viaje.service'; 
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  datosViaje: any[] = [];
  nombreConductor: string = '';
  comunaOrigen: string = '';
  comunaDestino: string = '';
  valorKilometro: number = 0;
  Detalles: string = '';
  auth: any; 
  constructor(private viajeService: ViajeService, private toastController: ToastController, private alertController: AlertController, private authService: AuthService, private router: Router) {
    this.auth = authService; 
  }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.datosViaje = await this.viajeService.obtenerViajes();
    if (this.datosViaje.length > 0) {
      const viaje = this.datosViaje[0];
      console.log(viaje); 
      this.nombreConductor = viaje.nombreConductor;
      this.comunaOrigen = viaje.comunaOrigen;
      this.comunaDestino = viaje.comunaDestino;
      this.valorKilometro = viaje.valorKilometro;
      this.Detalles = viaje.Detalles; 
    } else {
      console.log('No hay datos disponibles');
    }
  }

  async agregarViaje() {
    const nuevoViaje = {
      nombreConductor: this.nombreConductor,
      comunaOrigen: this.comunaOrigen,
      comunaDestino: this.comunaDestino,
      valorKilometro: this.valorKilometro,
      Detalles: this.Detalles
    };
    await this.viajeService.guardarViaje(nuevoViaje);
    this.cargarDatos(); 
  }



  async contratar(viaje: any) {
    const mensajeConfirmacion = `¿Te gustaría contratar este viaje por $${viaje.valorKilometro} de tarifa?`;
    const confirmacion = await this.mostrarAlertaConfirmacion(mensajeConfirmacion);

    if (confirmacion) {
      const mensaje = `Viaje contratado por: $${viaje.valorKilometro}. Desde: ${viaje.comunaOrigen} - Hasta ${viaje.comunaDestino}`;
      this.mostrarToast(mensaje);

      setTimeout(() => {
        this.router.navigate(['/esperando']);
      }, 2000);
    }
  }

  async mostrarAlertaConfirmacion(mensaje: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: mensaje,
      backdropDismiss: false, 
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false; 
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            return true; 
          }
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role !== 'cancel'; 
  }

  
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, 
      position: 'bottom' 
    });
    toast.present();
  }

  logout() {
    this.auth.logout(); 
    this.router.navigate(['/home']); 
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async pass() {
    const alert = await this.alertController.create({
      header: 'Admin password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            if (data.password === '1234') {
              this.router.navigate(['/controller']);
            } else {
              this.presentToast('Contraseña incorrecta');
            }
          }
        }
      ]
    });
    
    await alert.present(); 
    const { data: { values: { password } } } = await alert.onDidDismiss(); 
  }
}
