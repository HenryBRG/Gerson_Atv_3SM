import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";
import CadastroPage from "./navigatetocadastros"; // Página de cadastro de produtos/serviços
import ListaProdutosServicos from "./listaprodeserv";
import CadastroCompra from "./cadastrocompra";
import Listas from "./listas";

type Cliente = {
    nome: string;
    nomeSocial: string;
    categoriaNomeSocial: string;
    email: string;
    pet: Array<any>;
    nomepet: string;
    tipo: string;
    raca: string;
    genero: string;
    telefone: any;
    telefoneCompleto: string;
    rg: any;
    dataEmissaoRG: string;
    cpf: any;
    dataEmissaoCpf: string;
    dataCadastro: Date;
    compras: Array<any>;
    cadastroConcluido: boolean;
    erros: { [key: string]: string };
};

type State = {
    tela: string; // Tela atual
    clientes: Cliente[];
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: "Clientes", // Tela inicial
            clientes: [],
        };
        this.selecionarView = this.selecionarView.bind(this);
    }

    // Altera a tela exibida
    selecionarView(novaTela: string) {
        this.setState({ tela: novaTela });
    }

    render() {
        // Barra de navegação com a lista de telas
        let barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                botoes={[
                    "Cadastro de Cliente",
                    "Clientes",
                    "Cadastro de Produtos E Serviços",
                    "Produtos / Serviços",
                    "Cadastro De Compras",
                    "Estatísticas",
                ]}
            />
        );

        // Renderiza a tela correspondente
        if (this.state.tela === "Clientes") {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente />
                </>
            );
        }

        if (this.state.tela === "Cadastro de Cliente") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente
                        cadastrarCliente={(clienteData) => {
                            console.log(clienteData); // Processar o cadastro de cliente
                        }}
                    />
                </>
            );
        }

        if (this.state.tela === "Cadastro de Produtos E Serviços") {
            return (
                <>
                    {barraNavegacao}
                    <CadastroPage />
                </>
            );
        }

        if (this.state.tela === "Produtos / Serviços") {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutosServicos />
                </>
            );
        }

        if (this.state.tela === "Cadastro De Compras") {
            return (
                <>
                    {barraNavegacao}
                    <CadastroCompra />
                </>
            );
        }

        if (this.state.tela === "Estatísticas") {
            return (
                <>
                    {barraNavegacao}
                    <Listas />
                </>
            );
        }

        return null;
    }
}
