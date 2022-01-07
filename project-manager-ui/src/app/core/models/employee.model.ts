import { Group } from "./group.model";
import { Sector } from "./sector.model";

export class Employee {
    constructor(){
        this.name= "";
        this.cpf = "";
        this.group = new Group;
        this.sector = new Sector();
        this.active = true;

    }
    code?: number;
    name: string;
    cpf: string;
    salary?: number;
    group: Group;
    sector: Sector
    active: boolean;

    static toJson(employee: Employee): any{
        return {
            code: employee.code,
            name: employee.name,
            cpf: employee.cpf,
            salary: employee.salary,
            group: {
                code: employee.group.code
            },
            sector: {
                code: employee.sector.code
            },
            active: employee.active,
          };
    }
}