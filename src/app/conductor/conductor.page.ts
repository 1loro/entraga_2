import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { AuthenticatorService } from '../Servicios/authenticator.service';
import { AlertController } from '@ionic/angular'; // Importar AlertController
import { ToastController } from '@ionic/angular'; // Importar ToastController
import { DataService } from '../Servicios/data.services';
import { ViajeService } from '../Servicios/viaje.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  private router: Router; // Declarar router
  private alertController: AlertController; // Declarar alertController
  private toastController: ToastController; // Declarar toastController
  comunaOrigen: string = ''; // Inicializar con un valor por defecto
  comunaDestino: string = ''; // Inicializar con un valor por defecto
  valorKilometro: number = 0; // Inicializar con un valor por defecto
  Detalles: string = ''; // Declarar la propiedad detalles

  constructor(private auth: AuthenticatorService, router: Router, alertController: AlertController, toastController: ToastController, private dataService: DataService, private viajeService: ViajeService) { // Inyectar Router y AlertController en el constructor
    this.router = router; // Asignar router
    this.alertController = alertController; 
    this.toastController = toastController; 
  }

  ngOnInit() {
    // Método ngOnInit requerido por la interfaz OnInit
  }

  openMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.open(); // Abre el menú
      console.log('Menú abierto');
    } else {
      console.error('no se encontró el menú');
    }
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

  logout() {
    this.auth.logout(); 
    this.router.navigate(['/home']); 
  }

  async guardarDatos() {
    console.log('Guardando datos...');
    const datos = {
      comunaOrigen: this.comunaOrigen,
      comunaDestino: this.comunaDestino,
      valorKilometro: this.valorKilometro,
      detalles: this.Detalles,
      Text: 'Viaje disponible' // Cambia esto según tus datos
    };

    await this.viajeService.guardarViaje(datos); // Guardar el viaje en el almacenamiento
    console.log('Datos guardados correctamente.');
  }
}
