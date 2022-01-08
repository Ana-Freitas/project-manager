import * as moment from "moment";
import { Sector } from "./sector.model";

export class Project {
    constructor(){
        this.name= "";
        this.description = "";
        this.endDate = new Date();
        this.startDate = new Date();
        this.active = true;
        this.sector = new Sector();
    }
    code?: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    active: boolean;
    sector: Sector;

    static toJson(project: Project): any{
        return {
            code: project.code,
            name: project.name,
            description: project.description,
            startDate: moment(project.startDate).format('DD/MM/YYYY'),
            endDate: moment(project.endDate).format('DD/MM/YYYY'),
            active: project.active,
            sector: {
                code: project.sector.code
            }
          };
    }
}