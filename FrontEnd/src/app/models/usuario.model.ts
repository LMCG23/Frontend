import { Persona,Departamento } from './model.index';
import { Department } from './Department.model';


export class Usuario {

    constructor(
        public usuario_Id: number,
        public nombre: string,
        public rol:number,
        public password: string,
        public persona:Persona,
        public departamento:Department,
        public photo?:any
        

    ) { }

}