import { Categoria } from "./Categoria"

export class Produto {
    public id: number
    public nome: string
    public preco: number
    public fornecedor: string 
    public qtdeEstoque: string
    public categoria: Categoria
}