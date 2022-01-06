import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Group } from "../../core/models/group.model";
import { GroupService } from "../group.service";

@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.css']
  })
  export class FormGroupComponent implements OnInit {

    constructor(private groupService: GroupService) {}

    ngOnInit(): void {}

    entity = new Group();

    save(form: NgForm){
      this.addGroup(form);
    }

    async addGroup(form: NgForm){
      const saved = await this.groupService.add(this.entity);
      if(saved){
        this.entity.code = saved.code;
        console.log("Gravado com sucesso!");
        console.log(saved);
      }
    }

    isEdition(): boolean {
      return false;
    }
}