import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { AuthService } from '../security/auth.service';
import { LogoutService } from '../security/logout.service';

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
    command: () => this.logout(),
    // routerLink: ['/login'],
    icon: 'pi pi-fw pi-power-off'
  }
  ];

  constructor(public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  @Input() hiddenMenu: boolean = false;
  ngOnInit(): void {
  }

  logout(): void {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
