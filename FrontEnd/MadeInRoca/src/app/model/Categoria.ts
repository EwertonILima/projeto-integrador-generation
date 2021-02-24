import { Produto } from "./Produto"

export class Categoria {
    public id: number
    public nome: string
    public descricao: string 
    public imagem: string
    public produto: Produto[]

}