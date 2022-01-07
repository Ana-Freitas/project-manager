export class Sector {
    constructor(){
        this.name= "";
    }
    code?: number;
    name: string;

    static toJson(sector: Sector): any{
        return {
            code: sector.code,
            name: sector.name
          };
    }
}