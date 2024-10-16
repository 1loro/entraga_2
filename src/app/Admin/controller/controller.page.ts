import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIControllerService } from 'src/app/Servicios/apicontroller.service';
import { AuthenticatorService } from './../../Servicios/authenticator.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {
  users: any[] = [];

  constructor(private api: APIControllerService,
              private auth: AuthenticatorService,
              private alertController: AlertController,
              private toastController: ToastController,
              private http: HttpClient) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/usuarios/')
      .subscribe(data => {
        this.users = data;
      }, error => {
        console.error('Error al cargar usuarios', error);
      });
  }

  async modificarUsuario(id: any) {
    const usuario = this.users.find(user => user.id === id);
    if (!usuario) {
      await this.mostrarToast("Usuario no encontrado.");
      return; 
    }

    const modal = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: usuario.nombre
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Contraseña',
          value: usuario.password
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo',
          value: usuario.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edición cancelada.');
          }
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.nombre && data.password && data.email) {
              
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(data.email)) {
                await this.mostrarToast("Por favor ingrese un correo válido.");
                return;
              }

              const existeUsuario = this.users.some(user => user.nombre === data.nombre && user.id !== id);
              const existeEmail = this.users.some(user => user.email === data.email && user.id !== id);
              
              if (existeUsuario) {
                await this.mostrarToast("El nombre ya está en uso.");
                return;
              }
              if (existeEmail) {
                await this.mostrarToast("El correo ya está en uso.");
                return;
              }

             
              usuario.nombre = data.nombre;
              usuario.password = data.password;
              usuario.email = data.email;

              
              this.api.updateUser(id, usuario).subscribe(
                async () => {
                  console.log("Usuario modificado:", usuario);
                  await this.mostrarToast("Usuario editado con éxito");
                },
                async (error) => {
                  console.error("Error al modificar usuario:", error);
                  await this.mostrarToast("Error al editar usuario");
                }
              );
            } else {
              console.log("No se editó el usuario, faltan datos.");
              await this.mostrarToast("Usuario no editado, faltan datos");
            }
          }
        }
      ]
    });

    await modal.present(); 
  }

  async eliminarUsuario(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada.');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
      
            this.api.deleteUser(id).subscribe(
              () => {
                this.users = this.users.filter(user => user.id !== id); 
                console.log("Usuario eliminado con id:", id);
                this.mostrarToast("Usuario eliminado con éxito"); 
              },
              (error) => {
                console.error("Error al eliminar usuario:", error);
                this.mostrarToast("Error al eliminar usuario");
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async agregarUsuario() {
    const modal = await this.alertController.create({
      header: 'Agregar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Contraseña'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Adición cancelada.');
          }
        },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (data.nombre && data.password && data.email) {
              // Validación del correo electrónico
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(data.email)) {
                await this.mostrarToast("Por favor ingrese un correo válido.");
                return;
              }

              const nuevoUsuario = {
                nombre: data.nombre,
                password: data.password,
                email: data.email
              };

              //funcion para agregar usuario pero la borre porq se pueden agregar desde el mismo registro
              this.api.addUser(nuevoUsuario).subscribe(
                (response: any) => {
                  this.users.push(response);
                  console.log("Usuario agregado:", response);
                  this.mostrarToast("Usuario agregado con éxito");
                },
                (error) => {
                  console.error("Error al agregar usuario:", error);
                  this.mostrarToast("Error al agregar usuario");
                }
              );
            } else {
              console.log("No se agregó el usuario, faltan datos.");
              await this.mostrarToast("Usuario no agregado, faltan datos");
            }
          }
        }
      ]
    });

    await modal.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
