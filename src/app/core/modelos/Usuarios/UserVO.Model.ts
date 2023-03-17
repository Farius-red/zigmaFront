import { JwtVO } from "./jwtVO.Model";
import { Address, } from "./PlacesVO";

export interface UserVO{
    idUser:string;
    username:string;
    password:string;
    idUrl:string;
    balance:number;
    email: string;
    createDate:string;
    creator: string,
    idBussines:number;
    updateDate:string,
    token:JwtVO,
    state: EstatesUser,
    dateUser: DatesUser,
    idRol:UserRol[],
    
}




 export interface EstatesUser{
    idStateUser: number,
    nameState: string,
 }

export interface DatesUser{
    idDateUser : number,
    firsName:string,
    seconName?:string,
    firsLastName:string,
    secondLastName?:string,
    phone:number,
    address:Address

}

export interface UserRol{
    rol:Rol;
    user:UserVO;
}


export interface Rol {
    idRol:number,
    nameRol:string;
    createDate:string
    updateDate:string,

}