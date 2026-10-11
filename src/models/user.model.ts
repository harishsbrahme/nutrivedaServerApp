export interface User{
id:number,
name:string,
email:string,
role:string,
password:Date
}

export interface JwtPayload {
    id: number;
    name: string;
    role: string;
    type:string;
}