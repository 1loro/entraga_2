import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, AnimationController, ModalController } from '@ionic/angular';
import { AuthenticatorService } from './../../Servicios/authenticator.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, AfterViewInit {
  @ViewChild('logoImg', { static: false }) logoImg!: ElementRef<HTMLIonImgElement>;
  username: string = '';
  ubicacionActual = '';
  destino = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private animationController: AnimationController,
    private auth: AuthenticatorService,
    private modalController: ModalController,
    private http: HttpClient
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string;
    };
    this.username = state?.username || '';
  }

  ngOnInit() {
    this.obtenerUsuario(); 
  }

  ngAfterViewInit() {
    console.log('Gengar cargado', this.logoImg);
  }

  async obtenerUsuario() {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
    this.username = user.username || ''; 
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: `Buscando viaje desde ${this.ubicacionActual} a ${this.destino}`,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

   buscarViajes() {
    if (this.ubicacionActual.length === 0) {
      this.mostrarAlerta('Por favor, ingrese su ubicación actual');
    } else if (this.destino.length === 0) {
      this.mostrarAlerta('Por favor, ingrese su destino');
    } else {
      this.mostrarToast();
     this.animarLogo();
    }
  }

// logs para ver donde esta el error  
  async animarLogo() {
    const element = document.querySelector('ion-img.logo') as HTMLIonImgElement;
    if (!element) {
      console.error('no se encontro al maldito gengar');
      return;
    }

    console.log('Gengar Gotcha!:', element);

    const animationA = this.animationController
      .create()
      .addElement(element)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0');

    await animationA.play();

    console.log('Gengar se fue');

    const animationReset = this.animationController
      .create()
      .addElement(element)
      .duration(0)
      .fromTo('transform', 'translateX(-200%)', 'translateX(200%)');

    await animationReset.play();

    console.log('Gengar volvio');

    const animationB = this.animationController
      .create()
      .addElement(element)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(200%)', 'translateX(0)')
      .fromTo('opacity', '0', '1');

    await animationB.play();

    console.log('good');
  }

  logout() {
    this.auth.logout(); 
    this.router.navigate(['/home']); 
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

  openMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.open(); // Abre el menú
      console.log('Menú abierto');
    } else {
      console.error('no se encontró el menú');
    }
  }

  conductor() {
    this.router.navigate(['/conductor']);
  }

}
