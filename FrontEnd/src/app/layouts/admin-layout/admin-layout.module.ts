import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NewsComponent} from '../../pages/news/news.component'
import { ComplainComponent } from '../../pages/complain/complain.component';
import { DenounceComponent } from '../../pages/denounce/denounce.component';
import { FuncionaryComponent } from '../../pages/funcionary/funcionary.component';
import { DepartmentsComponent } from '../../pages/departments/departments.component';
import { EditprofileComponent } from '../../pages/editprofile/editprofile.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    NewsComponent,
    ComplainComponent,
    DenounceComponent,
    FuncionaryComponent,
    DepartmentsComponent,
    EditprofileComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
