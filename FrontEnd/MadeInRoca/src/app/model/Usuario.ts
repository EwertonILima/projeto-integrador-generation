import { CestaCompras } from "./CestaCompras"
import { Produto } from "./Produto"

export class Usuario {
    public id: number
    public nome: string
    public tipoUsuario: string
    public usuario: string 
    public senha: string
    public foto: string
    public produto: Produto[]
    public cestaCompras: CestaCompras[]
    public email: string
}