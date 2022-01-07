import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
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
                private route: ActivatedRoute) {}

    ngOnInit(): void {
      const code = this.route.snapshot.params['code'];
      if(code){
        this.loadGroup(code);
      }
    }

    loadGroup(code: number){
        this.groupService.getById(code)
        .then((group: Group) => {
          this.entity = group;
        })
    }

    save(form: NgForm){
      if(this.isEdition()){
        this.updateGroup(form);
      }else{
        this.addGroup(form);
      }
    }

    async addGroup(form: NgForm){
      const saved = await this.groupService.add(this.entity);
      if(saved){
        this.entity.code = saved.code;
        this.messageService.add(
          {
            severity: 'success', 
            summary: "Salvo",
            detail: 'Grupo gravado com sucesso!'
          });
      }
    }

    updateGroup(form: NgForm){
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
     // .catch((error: any) => this.errorHandler.handle(error));
    }

    isEdition(): boolean {
      return Boolean(this.entity.code);
    }

    newGroup(form: NgForm){
      form.reset(new Group());
      this.router.navigate(['/group/new'])
    }
}