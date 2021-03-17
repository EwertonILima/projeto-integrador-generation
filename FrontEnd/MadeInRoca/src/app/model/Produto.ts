import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"

export class Produto {
    public id: number
    public nome: string
    public preco: number
    public qtdeEstoque: number
    public usuario: Usuario
    public categoria: Categoria
    public foto: string
    public descricao: string 
}