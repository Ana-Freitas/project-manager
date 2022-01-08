export class Group {
    constructor(){
        this.name= "";
    }
    code?: number;
    name: string;

    static toJson(group: Group): any{
        return {
            code: group.code,
            name: group.name
          };
    }
}