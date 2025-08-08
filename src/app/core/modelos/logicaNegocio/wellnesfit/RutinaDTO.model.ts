import { Comida } from "./Comida.model";
import { Ejercicio } from "./Ejercicio.model";

export class RutinaDTO {
    idUrl: string;
    comida: Comida[];
    ejercicios: Ejercicio[];
  }