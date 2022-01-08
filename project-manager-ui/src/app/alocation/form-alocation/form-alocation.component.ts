import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Alocation } from "src/app/core/models/alocation.model";
import { Employee } from "src/app/core/models/employee.model";
import { Project } from "src/app/core/models/project.model";
import { AuthService } from "src/app/core/security/auth.service";
import { EmployeeService } from "src/app/employee/employee.service";
import { ProjectService } from "src/app/project/project.service";
import { AlocationService } from "../alocation.service";

@Component({
  selector: 'app-form-alocation',
  templateUrl: './form-alocation.component.html',
  styleUrls: ['./form-alocation.component.css']
})
export class FormAlocationComponent implements OnInit {

  entity = new Alocation();
  employees: Employee[] = [];
  projects: Project[] = [];

  constructor(
    private alocationService: AlocationService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.params['code'];
    if (code) {
      this.loadAlocation(code);
    }

    this.loadEmployees();
    this.loadProjects();
  }

  loadAlocation(code: number) {
    this.alocationService.getById(code)
      .then((alocation: Alocation) => {
        this.entity = alocation;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  loadEmployees() {
    this.employeeService.search()
      .then(result => {
        this.employees = result;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  loadProjects() {
    this.projectService.search()
      .then(result => {
        this.projects = result;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  save(form: NgForm) {
    if (this.verifyPermission("ROLE_SAVE_ALOCATION")) {
      if (this.isEdition()) {
        this.updateAlocation(form);
      } else {
        this.addAlocation(form);
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

  async addAlocation(form: NgForm) {
    this.alocationService.add(this.entity)
      .then(saved => {
        if (saved) {
          this.entity.code = saved.code;
          this.messageService.add(
            {
              severity: 'success',
              summary: "Salvo",
              detail: 'Alocação gravada com sucesso!'
            });
        }
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  updateAlocation(form: NgForm) {
    this.alocationService.update(this.entity)
      .then((alocation: any) => {
        this.entity = alocation;
        this.messageService.add(
          {
            severity: 'success',
            summary: "Atualizado",
            detail: 'Alocação alterado com sucesso!'
          });
      })
      .catch((error: any) => this.errorHandler.handle(error));
  }

  isEdition(): boolean {
    return Boolean(this.entity.code);
  }

  newAlocation(form: NgForm) {
    form.reset(new Alocation());
    this.router.navigate(['/alocation/new'])
  }
}