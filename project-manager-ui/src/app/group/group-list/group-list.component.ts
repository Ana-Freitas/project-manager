import { Component, OnInit } from "@angular/core";
import { GroupService } from "../group.service";

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
  })

  export class GroupListComponent implements OnInit {
      
      groups = [];

    constructor(private groupService: GroupService) {}
    
    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.groupService.search()
          .then((result: any) => {
            this.groups = result;
          });
      }
  }