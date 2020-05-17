// Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
// import { AgmCoreModule } from '@agm/core';

// routes
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

//Component
import { LoginComponent } from './login/login.component';

// Modules
import { ServiceModule } from './services/service.module';

// Services
import { NewService,UsuarioService, HttphInterceptorService } from './services/service.index';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';








@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ServiceModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
   
 
   
  
   
    
   
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttphInterceptorService,
    multi: true,
    deps: [ UsuarioService ]
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
