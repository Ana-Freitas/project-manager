import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormGroupComponent } from './group/form-group/form-group.component';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
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
import { NgxMaskModule } from 'ngx-mask';
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

registerLocaleData(localePt);

const routes: Routes = [
  { path: 'group', component: GroupListComponent},
  { path: 'group/new', component: FormGroupComponent },
  { path: 'group/:code', component: FormGroupComponent},
  { path: 'sector', component: SectorListComponent},
  { path: 'sector/new', component: FormSectorComponent },
  { path: 'sector/:code', component: FormSectorComponent},
  { path: 'employee', component: EmployeeListComponent},
  { path: 'employee/new', component: FormEmployeeComponent },
  { path: 'employee/:code', component: FormEmployeeComponent},
  { path: 'project', component: ProjectListComponent},
  { path: 'project/new', component: FormProjectComponent },
  { path: 'project/:code', component: FormProjectComponent},
  { path: 'alocation', component: AlocationListComponent},
  { path: 'alocation/new', component: FormAlocationComponent },
  { path: 'alocation/:code', component: FormAlocationComponent},
  { path: '**', redirectTo: 'group' }
];


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
    AlocationListComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
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
    CalendarModule
  ],
  providers: [GroupService, SectorService, ProjectService, EmployeeService, MessageService, ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'},],

  bootstrap: [AppComponent]
})
export class AppModule { }
