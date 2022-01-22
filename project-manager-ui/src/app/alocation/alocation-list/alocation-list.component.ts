import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/core/security/auth.service";
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
        private messageService: MessageService,
        private errorHandler: ErrorHandlerService,
        public auth: AuthService) { }

    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.alocationService.search()
            .then((result: any) => {
                this.alocations = result;
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
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
            .then((result: boolean) => {
                if(result){
                    this.search();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Excluído',
                        detail: 'Alocação excluída com sucesso!'
                    });
                }
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }
}