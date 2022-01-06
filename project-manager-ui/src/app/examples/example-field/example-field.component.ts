import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-field',
  templateUrl: './example-field.component.html',
  styleUrls: ['./example-field.component.css']
})
export class ExampleFieldComponent implements OnInit {

  disabled: boolean = true;

  value1: string = "";

  value2: string = "";

  value3: string = "";

  value4: string = "";

  value5: string = 'Disabled';
  value6: string = 'Disabled';
  constructor() { }

  ngOnInit(): void {
  }

}
