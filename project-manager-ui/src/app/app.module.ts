import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    GroupListComponent,
    AppComponent,
    FormGroupComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ExamplesModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
