import { Usuario } from "./Usuario"

export class CestaCompras {
    public id: number
    public nome: string
    public preco: number
    public quantidade: number
    public usuario: Usuario
    public categoria: string
    public foto: string
}