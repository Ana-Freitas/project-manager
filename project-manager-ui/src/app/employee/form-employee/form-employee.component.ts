import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Employee } from "src/app/core/models/employee.model";
import { Group } from "src/app/core/models/group.model";
import { Sector } from "src/app/core/models/sector.model";
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
                private route: ActivatedRoute) {}

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
    }

    loadGroups(){
      this.groupService.search()
      .then((result: Group[]) => {
        this.groups = result;
      })
    }

    loadSectors(){
      this.sectorService.search()
      .then((result: Sector[]) => {
        this.sectors = result;
      })
    }

    save(form: NgForm){
      if(this.isEdition()){
        this.updateEmployee(form);
      }else{
        this.addEmployee(form);
      }
    }

    async addEmployee(form: NgForm){
      const saved = await this.employeeService.add(this.entity);
      if(saved){
        this.entity.code = saved.code;
        this.messageService.add(
          {
            severity: 'success', 
            summary: "Salvo",
            detail: 'Funcionário gravado com sucesso!'
          });
      }
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
     // .catch((error: any) => this.errorHandler.handle(error));
    }

    isEdition(): boolean {
      return Boolean(this.entity.code);
    }

    newEmployee(form: NgForm){
      form.reset(new Employee());
      this.router.navigate(['/employee/new'])
    }
}