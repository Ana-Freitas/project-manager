import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../core/security/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  msg: any;
  constructor(private auth: AuthService, 
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login(usuario:string, senha:string){
    this.auth.login(usuario, senha).then(() => {
      this.router.navigate(['/employee']);
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Não encontrado',
        detail: 'Usuário e/ou senha inválidos!'
      });
    });
  }

}
