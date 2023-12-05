export class Medicine {
    medicineId: number;
    name: string;
    expirationDate: Date | null;
    selected: boolean = false;

    constructor(){
        this.medicineId=0;
        this.name="";
        this.expirationDate=null;
    }
}
