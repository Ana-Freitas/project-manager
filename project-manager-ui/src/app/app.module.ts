import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormGroupComponent } from './group/form-group/form-group.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ExamplesModule } from './examples/examples.module';
import { ButtonModule } from 'primeng/button';
import { GroupService } from './group/group.service';
import { GroupListComponent } from './group/group-list/group-list.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormSectorComponent } from './sector/form-sector/form-sector.component';
import { SectorService } from './sector/sector.service';
import { SectorListComponent } from './sector/sector-list/sector-list.component';
import { FormEmployeeComponent } from './employee/form-employee/form-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeService } from './employee/employee.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormProjectComponent } from './project/form-project/form-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectService } from './project/project.service';
import { AlocationListComponent } from './alocation/alocation-list/alocation-list.component';
import { FormAlocationComponent } from './alocation/form-alocation/form-alocation.component';
import { MenuModule } from 'primeng/menu';
import { MenuComponent } from './core/menu/menu.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './core/security/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ErrorHandlerService } from '../app/core/error-handler.service';
import { AuthGuard } from './core/security/auth.guard';
import { NotAuthorizedComponent } from './core/not-authorized.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { LogoutService } from './core/security/logout.service';
import { ProjectHttpInterceptor } from './core/security/project-http-interceptor';
import {ToggleButtonModule} from 'primeng/togglebutton';

registerLocaleData(localePt);

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'group', component: GroupListComponent, canActivate: [AuthGuard],   data: { roles: ['ROLE_SEARCH_GROUP'] }},
  { path: 'group/new', component: FormGroupComponent,  canActivate: [AuthGuard], data: { roles: ['ROLE_SAVE_GROUP'] }},
  { path: 'group/:code', component: FormGroupComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_GROUP'] }},
  { path: 'sector', component: SectorListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_SECTOR'] }},
  { path: 'sector/new', component: FormSectorComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SAVE_SECTOR'] }},
  { path: 'sector/:code', component: FormSectorComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_SECTOR'] }},
  { path: 'employee', component: EmployeeListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_EMPLOYEE'] }},
  { path: 'employee/new', component: FormEmployeeComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SAVE_EMPLOYEE'] }},
  { path: 'employee/:code', component: FormEmployeeComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_EMPLOYEE']}},
  { path: 'project', component: ProjectListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_PROJECT']}},
  { path: 'project/new', component: FormProjectComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SAVE_PROJECT']}},
  { path: 'project/:code', component: FormProjectComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_PROJECT']}},
  { path: 'alocation', component: AlocationListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_ALOCATION']}},
  { path: 'alocation/new', component: FormAlocationComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SAVE_ALOCATION']}},
  { path: 'alocation/:code', component: FormAlocationComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SEARCH_ALOCATION']}},
  { path: 'login', component: LoginFormComponent },
  { path: '', component: LoginFormComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'employee' }
];

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    FormGroupComponent,
    FormSectorComponent,
    SectorListComponent,
    FormEmployeeComponent,
    EmployeeListComponent,
    FormProjectComponent,
    ProjectListComponent,
    FormAlocationComponent,
    AlocationListComponent,
    MenuComponent,
    NavbarComponent,
    LoginFormComponent,
    NotAuthorizedComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ExamplesModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ToastModule,
    RouterModule.forRoot(routes),
    ConfirmDialogModule,
    CurrencyMaskModule,
    DropdownModule,
    CalendarModule,
    MenuModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    MenubarModule,
    AutoCompleteModule,
    ToggleButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),
  ],
  providers: [
    GroupService,
    SectorService,
    ProjectService, 
    EmployeeService, 
    MessageService, 
    ConfirmationService,
    AuthService,
    JwtHelperService,
    ErrorHandlerService,
    LogoutService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectHttpInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },],

  bootstrap: [AppComponent]
})
export class AppModule { }
