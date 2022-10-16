
export interface  ProtectRequestDate
{
  fecha:Date,
  id_usuario:string,
  nombre:string,
  apellido:string
}

export interface ResponseMessage
{
  message:string,
  count: number,
  responseTime: Date,
  data: any,
  code: number
}
