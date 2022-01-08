import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Project } from "src/app/core/models/project.model";
import { Sector } from "src/app/core/models/sector.model";
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
                private route: ActivatedRoute) {}

    ngOnInit(): void {
      const code = this.route.snapshot.params['code'];
      if(code){
        this.loadProject(code);
      }
      this.loadSectors();
    }

    loadProject(code: number){
        this.projectService.getById(code)
        .then((project: Project) => {
          this.entity = project;
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
        this.updateProject(form);
      }else{
        this.addProject(form);
      }
    }

    async addProject(form: NgForm){
      const saved = await this.projectService.add(this.entity);
      if(saved){
        this.entity.code = saved.code;
        this.messageService.add(
          {
            severity: 'success', 
            summary: "Salvo",
            detail: 'Projeto gravado com sucesso!'
          });
      }
    }

    updateProject(form: NgForm){
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
     // .catch((error: any) => this.errorHandler.handle(error));
    }

    isEdition(): boolean {
      return Boolean(this.entity.code);
    }

    newProject(form: NgForm){
      form.reset(new Project());
      this.router.navigate(['/project/new'])
    }
}