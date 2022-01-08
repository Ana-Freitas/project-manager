import * as moment from "moment";
import { Employee } from "./employee.model";
import { Project } from "./project.model";

export class Alocation {
    constructor(){
        this.employee = new Employee();
        this.project = new Project();
        this.startParticipation = new Date();
        this.endParticipation = new Date();
        this.manager = false;

    }
    code?: number;
    employee: Employee;
    project: Project;
    workload?: number;
    manager: boolean;
    startParticipation: Date;
    endParticipation: Date;

    static toJson(alocation: Alocation): any{
        return {
            code: alocation.code,
            workload: alocation.workload,
            manager: alocation.manager,
            startParticipation:  moment(alocation.startParticipation).format('DD/MM/YYYY'),
            endParticipation: moment(alocation.endParticipation).format('DD/MM/YYYY'),
            employee: {
                code: alocation.employee.code
            },
            project: {
                code: alocation.project.code
            }
          };
    }
}