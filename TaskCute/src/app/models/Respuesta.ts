export class Respuesta{
  ok:boolean;
  msg:string;
  data:any;

  constructor(ok: boolean, msg: string) {
    this.ok = ok;
    this.msg = msg;
  }

}
