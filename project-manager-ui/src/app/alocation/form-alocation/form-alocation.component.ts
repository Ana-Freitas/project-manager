import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Alocation } from "src/app/core/models/alocation.model";
import { Employee } from "src/app/core/models/employee.model";
import { Project } from "src/app/core/models/project.model";
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
    private route: ActivatedRoute) { }

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
  }

  loadEmployees() {
    this.employeeService.search()
      .then(result => {
        this.employees = result;
      })
  }

  loadProjects() {
    this.projectService.search()
      .then(result => {
        this.projects = result;
      })
  }

  save(form: NgForm) {
    if (this.isEdition()) {
      this.updateAlocation(form);
    } else {
      this.addAlocation(form);
    }
  }

  async addAlocation(form: NgForm) {
    const saved = await this.alocationService.add(this.entity);
    if (saved) {
      this.entity.code = saved.code;
      this.messageService.add(
        {
          severity: 'success',
          summary: "Salvo",
          detail: 'Alocação gravada com sucesso!'
        });
    }
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
    // .catch((error: any) => this.errorHandler.handle(error));
  }

  isEdition(): boolean {
    return Boolean(this.entity.code);
  }

  newAlocation(form: NgForm) {
    form.reset(new Alocation());
    this.router.navigate(['/alocation/new'])
  }
}