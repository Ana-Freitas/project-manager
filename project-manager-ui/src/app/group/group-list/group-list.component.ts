import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { GroupService } from "../group.service";

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})

export class GroupListComponent implements OnInit {

    groups = [];

    constructor(private groupService: GroupService,
        private confirmation: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.groupService.search()
            .then((result: any) => {
                this.groups = result;
            });
    }

    confirmDeletion(group: any): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.delete(group);
            }
        });
    }


    delete(group: any) {
        this.groupService.delete(group.code)
            .then(() => {
                this.search();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Excluído',
                    detail: 'Grupo excluído com sucesso!'
                });
            })
    }
}