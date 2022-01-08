import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/core/security/auth.service";
import { ProjectService } from "../project.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {

    projects = [];

    constructor(private projectService: ProjectService,
        private confirmation: ConfirmationService,
        private messageService: MessageService,
        public auth: AuthService,
        private errorHandler: ErrorHandlerService) { }

    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.projectService.search()
            .then((result: any) => {
                this.projects = result;
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }

    confirmDeletion(project: any): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.delete(project);
            }
        });
    }


    delete(project: any) {
        this.projectService.delete(project.code)
            .then(() => {
                this.search();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Inativado',
                    detail: 'Projeto inativado com sucesso!'
                });
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }
}