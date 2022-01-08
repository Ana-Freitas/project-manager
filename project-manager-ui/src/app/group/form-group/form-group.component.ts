import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/core/security/auth.service";
import { Group } from "../../core/models/group.model";
import { GroupService } from "../group.service";

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  entity = new Group();

  constructor(private groupService: GroupService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.params['code'];
    if (code) {
      this.loadGroup(code);
    }
  }

  loadGroup(code: number) {
    this.groupService.getById(code)
      .then((group: Group) => {
        this.entity = group;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  save(form: NgForm) {
    if (this.verifyPermission("ROLE_SAVE_GROUP")) {
      if (this.isEdition()) {
        this.updateGroup(form);
      } else {
        this.addGroup(form);
      }
    }
  }

  verifyPermission(permission: string) {
    if (!this.auth.hasPermission(permission)) {
      this.messageService.add(
        {
          severity: 'error',
          summary: "Não Autorizado",
          detail: 'Você não possui permissão!'
        });
      return false;
    }
    return true
  }

  async addGroup(form: NgForm) {
    this.groupService.add(this.entity)
      .then(saved => {
        if (saved) {
          this.entity.code = saved.code;
          this.messageService.add(
            {
              severity: 'success',
              summary: "Salvo",
              detail: 'Grupo gravado com sucesso!'
            });
        }
      }).catch((erro: any) => this.errorHandler.handle(erro));

  }

  updateGroup(form: NgForm) {
    this.groupService.update(this.entity)
      .then((group: any) => {
        this.entity = group;
        this.messageService.add(
          {
            severity: 'success',
            summary: "Atualizado",
            detail: 'Grupo alterado com sucesso!'
          });
      })
      .catch((error: any) => this.errorHandler.handle(error));
  }

  isEdition(): boolean {
    return Boolean(this.entity.code);
  }

  newGroup(form: NgForm) {
    form.reset(new Group());
    this.router.navigate(['/group/new'])
  }
}