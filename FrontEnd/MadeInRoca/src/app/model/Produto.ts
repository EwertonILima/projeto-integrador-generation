import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"

export class Produto {
    public id: number
    public nome: string
    public preco: number
    public usuario: Usuario
    public qtdeEstoque: string
    public categoria: Categoria
}