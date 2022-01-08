import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/core/security/auth.service";
import { EmployeeService } from "../employee.service";

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

    employees = [];

    constructor(private employeeService: EmployeeService,
        private confirmation: ConfirmationService,
        private messageService: MessageService,
        public auth: AuthService,
        private errorHandler: ErrorHandlerService) { }

    ngOnInit(): void {
        this.search();
    }

    search(): void {
        this.employeeService.search()
            .then((result: any) => {
                this.employees = result;
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }

    confirmDeletion(employee: any): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja inativar?',
            accept: () => {
                this.delete(employee);
            }
        });
    }


    delete(employee: any) {
        this.employeeService.delete(employee.code)
            .then(() => {
                this.search();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Inativado',
                    detail: 'Funcionário excluído com sucesso!'
                });
            })
            .catch((erro: any) => this.errorHandler.handle(erro));
    }
}