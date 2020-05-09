import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  canActivate(): boolean {
    
    if ( this.usuarioService.isAuthenticated() ) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
