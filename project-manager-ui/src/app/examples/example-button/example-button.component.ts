import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-button',
  templateUrl: './example-button.component.html',
  styleUrls: ['./example-button.component.css']
})
export class ExampleButtonComponent implements OnInit {

  constructor() { }

  loading = [false, false, false, false]

  load(index: number) {
      this.loading[index] = true;
      setTimeout(() => this.loading[index] = false, 1000);
  }

  ngOnInit(): void {
  }

}
