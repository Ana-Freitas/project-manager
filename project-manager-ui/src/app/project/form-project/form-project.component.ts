import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Project } from "src/app/core/models/project.model";
import { Sector } from "src/app/core/models/sector.model";
import { AuthService } from "src/app/core/security/auth.service";
import { SectorService } from "src/app/sector/sector.service";
import { ProjectService } from "../project.service";

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {

  entity = new Project();
  sectors: Sector[] = [];

  constructor(private projectService: ProjectService,
    private sectorService: SectorService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.params['code'];
    if (code) {
      this.loadProject(code);
    }
    this.loadSectors();
  }

  loadProject(code: number) {
    this.projectService.getById(code)
      .then((project: Project) => {
        this.entity = project;
      })
      .catch((error: any) => this.errorHandler.handle(error));
  }


  loadSectors() {
    this.sectorService.search()
      .then((result: Sector[]) => {
        this.sectors = result;
      })
      .catch((error: any) => this.errorHandler.handle(error));
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

  save(form: NgForm) {
    if (this.verifyPermission("ROLE_SAVE_PROJECT")) {
      if (this.isEdition()) {
        this.updateProject(form);
      } else {
        this.addProject(form);
      }
    }
  }

  async addProject(form: NgForm) {
    this.projectService.add(this.entity)
    .then(saved => {
      if (saved) {
        this.entity.code = saved.code;
        this.messageService.add(
          {
            severity: 'success',
            summary: "Salvo",
            detail: 'Projeto gravado com sucesso!'
          });
      }
    }).catch((error: any) => this.errorHandler.handle(error));
  }

  updateProject(form: NgForm) {
    this.projectService.update(this.entity)
      .then((project: any) => {
        this.entity = project;
        this.messageService.add(
          {
            severity: 'success',
            summary: "Atualizado",
            detail: 'Projeto alterado com sucesso!'
          });
      })
    .catch((error: any) => this.errorHandler.handle(error));
  }

  isEdition(): boolean {
    return Boolean(this.entity.code);
  }

  newProject(form: NgForm) {
    form.reset(new Project());
    this.router.navigate(['/project/new'])
  }
}