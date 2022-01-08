import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Employee } from "src/app/core/models/employee.model";
import { Group } from "src/app/core/models/group.model";
import { Sector } from "src/app/core/models/sector.model";
import { AuthService } from "src/app/core/security/auth.service";
import { GroupService } from "src/app/group/group.service";
import { SectorService } from "src/app/sector/sector.service";
import { EmployeeService } from "../employee.service";

@Component({
    selector: 'app-form-employee',
    templateUrl: './form-employee.component.html',
    styleUrls: ['./form-employee.component.css']
  })
  export class FormEmployeeComponent implements OnInit {
    
    entity = new Employee();
    groups: Group[] = [];
    sectors: Sector[] = [];

    constructor(private employeeService: EmployeeService,  
                private groupService: GroupService,
                private sectorService: SectorService,
                private router: Router,
                private messageService: MessageService,
                private route: ActivatedRoute,
                public auth: AuthService,
                private errorHandler: ErrorHandlerService) {}

    ngOnInit(): void {
      const code = this.route.snapshot.params['code'];
      if(code){
        this.loadEmployee(code);
      }

      this.loadGroups();
      this.loadSectors();
    }

    loadEmployee(code: number){
      this.employeeService.getById(code)
      .then((employee: Employee) => {
        this.entity = employee;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
    }

    loadGroups(){
      this.groupService.search()
      .then((result: Group[]) => {
        this.groups = result;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
    }

    loadSectors(){
      this.sectorService.search()
      .then((result: Sector[]) => {
        this.sectors = result;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
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

    save(form: NgForm){
      if(this.verifyPermission("ROLE_SAVE_EMPLOYEE")){
        if(this.isEdition()){
          this.updateEmployee(form);
        }else{
          this.addEmployee(form);
        }
      }
    }

    async addEmployee(form: NgForm){
      this.employeeService.add(this.entity)
      .then(saved => {
        if(saved){
          this.entity.code = saved.code;
          this.messageService.add(
            {
              severity: 'success', 
              summary: "Salvo",
              detail: 'Funcionário gravado com sucesso!'
            });
        }
      }).catch((erro: any) => this.errorHandler.handle(erro));
    }

    updateEmployee(form: NgForm){
      this.employeeService.update(this.entity)
      .then((employee: any) => {
        this.entity = employee;
        this.messageService.add(
          {
            severity: 'success', 
            summary: "Atualizado",
            detail: 'Funcionário alterado com sucesso!'
          });
      })
     .catch((error: any) => this.errorHandler.handle(error));
    }

    isEdition(): boolean {
      return Boolean(this.entity.code);
    }

    newEmployee(form: NgForm){
      form.reset(new Employee());
      this.router.navigate(['/employee/new'])
    }
}