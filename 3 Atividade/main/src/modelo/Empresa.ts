import Cliente from "./Client";
import Produto from "./Products";
import Servico from "./Services";
import Compra from "./Buy";

export default class Empresa {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private compras: Array<Compra>;

    constructor() {
        // Inicializa listas vazias
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
        this.compras = [];
    }

    // Retorna a lista de clientes
    public get getClientes() {
        return this.clientes;
    }

    // Retorna a lista de produtos
    public get getProdutos() {
        return this.produtos;
    }

    // Retorna a lista de serviços
    public get getServicos() {
        return this.servicos;
    }

    // Retorna a lista de compras
    public get getCompras() {
        return this.compras;
    }
}
