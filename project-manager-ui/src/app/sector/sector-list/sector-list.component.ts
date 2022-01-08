import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/core/security/auth.service";
import { SectorService } from "../sector.service";

@Component({
    selector: 'app-sector-list',
    templateUrl: './sector-list.component.html',
    styleUrls: ['./sector-list.component.css']
})

export class SectorListComponent implements OnInit {

    sectors = [];

    constructor(private sectorService: SectorService,
        private confirmation: ConfirmationService,
        private messageService: MessageService,
        public auth: AuthService,
        private errorHandler: ErrorHandlerService) { }

    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.sectorService.search()
            .then((result: any) => {
                this.sectors = result;
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }

    confirmDeletion(sector: any): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.delete(sector);
            }
        });
    }

    delete(sector: any) {
        this.sectorService.delete(sector.code)
            .then(() => {
                this.search();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Excluído',
                    detail: 'Setor excluído com sucesso!'
                });
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }
}