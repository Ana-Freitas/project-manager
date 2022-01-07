import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { AlocationService } from "../alocation.service";

@Component({
    selector: 'app-alocation-list',
    templateUrl: './alocation-list.component.html',
    styleUrls: ['./alocation-list.component.css']
})

export class AlocationListComponent implements OnInit {

    alocations = [];

    constructor(private alocationService: AlocationService,
        private confirmation: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.alocationService.search()
            .then((result: any) => {
                this.alocations = result;
            });
    }

    confirmDeletion(alocation: any): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.delete(alocation);
            }
        });
    }


    delete(alocation: any) {
        this.alocationService.delete(alocation.code)
            .then(() => {
                this.search();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Excluído',
                    detail: 'Alocação excluída com sucesso!'
                });
            })
    }
}