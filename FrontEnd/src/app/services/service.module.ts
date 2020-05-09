import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginGuard,
  HttphInterceptorService,
  MessageService,
  CryptoService,
  UsuarioService,

} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    HttphInterceptorService,
    MessageService,
    CryptoService,
    UsuarioService,
  ]
})
export class ServiceModule { }
