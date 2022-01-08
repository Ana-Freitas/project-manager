import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  menuItems = [{
    label: 'Funcionário',
    icon: 'pi pi-fw pi-user',
    items: [
      { label: 'Todos', icon: 'pi pi-book', routerLink: ['/employee'] },
      { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/employee/new'] },
    ]
  },
  {
    label: 'Projeto',
    items: [
      { label: 'Todos', icon: 'pi pi-book', routerLink: ['/project'] },
      { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/project/new'] },
    ]
  },
  {
    label: 'Grupo',
    items: [
      { label: 'Todos', icon: 'pi pi-book', routerLink: ['/group'] },
      { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/group/new'] },
    ]
  },
  {
    label: 'Setor',
    items: [
      { label: 'Todos', icon: 'pi pi-book', routerLink: ['/sector'] },
      { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/sector/new'] },
    ]
  },
  {
    label: 'Alocação',
    items: [
      { label: 'Todos', icon: 'pi pi-book', routerLink: ['/alocation'] },
      { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/alocation/new'] },
    ]
  },
  {
    label: 'Sair',
    routerLink: ['/login'],
    icon: 'pi pi-fw pi-power-off'
  }
  ];

  constructor() { }

  @Input() hiddenMenu: boolean = false;
  ngOnInit(): void {
  }

}
