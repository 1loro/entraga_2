import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './Servicios/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    loadChildren: () => import('./access/perfil/perfil.module').then(m => m.PerfilPageModule),
    
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./access/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./access/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'controller',
    loadChildren: () => import('./Admin/controller/controller.module').then(m => m.ControllerPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'conductor',
    loadChildren: () => import('./conductor/conductor.module').then( m => m.ConductorPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'esperando',
    loadChildren: () => import('./esperando/esperando.module').then( m => m.EsperandoPageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  },
  
  { 
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },

  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
