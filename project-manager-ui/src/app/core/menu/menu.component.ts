import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    
    menuItems = [{
        label: 'Funcionário',
        items: [
            { label: 'Todos', icon: 'pi pi-book', routerLink: ['/employee'] },
            { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/employee/new']  },
        ]},
        { label: 'Projeto',
        items: [
            { label: 'Todos', icon: 'pi pi-book', routerLink: ['/project'] },
            { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/project/new'] },
        ]},
        {label: 'Grupos',
        items: [
            { label: 'Todos', icon: 'pi pi-book', routerLink: ['/group'] },
            { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/group/new'] },
        ]},
        {label: 'Setores',
        items: [
            { label: 'Todos', icon: 'pi pi-book', routerLink: ['/sector'] },
            { label: 'Novo', icon: 'pi pi-plus', routerLink: ['/sector/new'] },
        ]}
    ];

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

}
