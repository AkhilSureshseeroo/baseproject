export class ApiResponse<dataType> {
  public constructor() {

      this.success = true;
      this.status = true;
      this.message = '';
  }
  _id!:number;
  success?: boolean;
  status?: boolean;
  message: string;
  data!: dataType;
  result!:dataType;
}
