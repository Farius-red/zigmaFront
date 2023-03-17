export interface Address{
    idAddress:number,
    adress:string,
    propertyTypes:PropertyType[],
    country:Country
   }

export interface PropertyType{
    idPropertyType:number,
    namePropertyType:string,
}

export interface Country{
    idCoutry:number,
    nameCountry:string
    cities:City[]
    
}

export interface City{
    idCity:number,
    nameCity:string
}