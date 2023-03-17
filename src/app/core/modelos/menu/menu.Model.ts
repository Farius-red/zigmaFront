export interface MenuModel{
    
    icon: string,
    name:string,
    redirecto: string,
    nameRol:string[],
    
}

export interface MenuActive{
    
    rolActive:string,
    menuModel:MenuModel[];
}