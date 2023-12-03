export class Disease {
  diseaseId: number | null; // or just 'number' if you always initialize it
  umlsCode: string;
  name: string;
  selected: boolean = false;

  constructor(diseaseId: number | null = null, umlsCode: string = '', name: string = '') {
    this.diseaseId = diseaseId;
    this.umlsCode = umlsCode;
    this.name = name;
  }
}
