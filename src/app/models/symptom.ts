export class Symptom {
  private _symptomId: number | null = null;
  private _umlsCode: string;
  private _description: string;
  selected: boolean = false;

  constructor(symptomId: number | null = null, umlsCode: string = '', description: string = '') {
    this._symptomId = symptomId;
    this._umlsCode = umlsCode;
    this._description = description;
  }


  get symptomId(): number | null {
    return this._symptomId;
  }

  set symptomId(value: number | null) {
    this._symptomId = value;
  }

  // Getter and Setter for umlsCode
  get umlsCode(): string {
    return this._umlsCode;
  }

  set umlsCode(value: string) {
    this._umlsCode = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

}

