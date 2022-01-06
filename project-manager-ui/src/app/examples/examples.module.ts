import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ExampleFieldComponent } from './example-field/example-field.component';
import { ExampleButtonComponent } from './example-button/example-button.component';

@NgModule({
  declarations: [
    ExampleFieldComponent,
    ExampleButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
  exports: [ExampleFieldComponent, ExampleButtonComponent]
})
export class ExamplesModule { }
