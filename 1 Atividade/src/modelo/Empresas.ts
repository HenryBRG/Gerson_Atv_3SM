import Cliente from "./Cliente"
import Produto from "./Produto"
import Servico from "./Servico"
import Compra from "./Compra"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private compras : Array<Compra>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.compras =  []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public get getCompras(){
        return this.compras
    }
}