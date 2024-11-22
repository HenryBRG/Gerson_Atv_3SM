import CPF from "./Cpf";
import Pet from "./Pets";
import RG from "./Rg";
import Telefone from "./Telephone";
import Compra from "./Buy";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    public email: string;
    public pet: Array<Pet>;
    public telefone: Telefone;
    public rg: RG;
    private cpf: CPF;
    private dataCadastro: Date;
    public compras: Array<Compra>;

    constructor(
        nome: string,
        nomeSocial: string,
        email: string,
        cpf: CPF,
        telefone: Telefone,
        pet: Array<Pet>,
        rg: RG,
        compras: Array<Compra>
    ) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.email = email;
        this.cpf = cpf;
        this.rg = rg;
        this.dataCadastro = new Date(); // Define a data de cadastro como a data atual
        this.telefone = telefone;
        this.pet = pet;
        this.compras = compras || []; // Inicializa a lista de compras vazia se nenhuma for fornecida
    }

    // Retorna todas as compras do cliente
    public compraCliente(): Array<Compra> {
        return this.compras;
    }

    // Retorna o nome do cliente
    public nomeCliente(): string {
        return this.nome;
    }

    // Getter para o email do cliente
    public get getEmail(): string {
        return this.email;
    }

    // Getter para o CPF do cliente
    public get getCpf(): CPF {
        return this.cpf;
    }

    // Getter para o RG do cliente
    public get getRgs(): RG {
        return this.rg;
    }

    // Retorna a data de cadastro do cliente
    public get getDataCadastro(): Date {
        return this.dataCadastro;
    }

    // Retorna o telefone do cliente
    public get getTelefones(): Telefone {
        return this.telefone;
    }

    // Retorna os pets do cliente
    public get getPets(): Array<Pet> {
        return this.pet;
    }

    // Adiciona uma compra à lista de compras do cliente
    public adicionarCompra(compras: Compra): void {
        this.compras.push(compras);
    }

    // Retorna todas as compras do cliente (redundante, mas útil em alguns contextos)
    public getCompras(): Array<Compra> {
        return this.compras;
    }
}
