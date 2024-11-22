import { Component } from "react";

// Tipos para Produto e Serviço
type Produto = {
    nomeprod: string;
    valorprod: number;
    tipoprod: string;
    descricaoprod: string;
};

type Servico = {
    nomeserv: string;
    valorserv: number;
    tiposerv: string;
    descricaoserv: string;
};

// Tipos de State
type State = {
    produtos: Produto[]; // Lista de produtos
    servicos: Servico[]; // Lista de serviços
    expandedProdutoIndex: number | null; // Índice do produto expandido
    expandedServicoIndex: number | null; // Índice do serviço expandido
    editingProduto: Produto | null; // Produto em edição
    editingServico: Servico | null; // Serviço em edição
    editIndex: number | null; // Índice do item em edição
};

export default class ListaProdutosServicos extends Component<{}, State> {
    state: State = {
        produtos: [], // Inicializando a lista de produtos como vazia
        servicos: [], // Inicializando a lista de serviços como vazia
        expandedProdutoIndex: null, // Nenhum produto está expandido inicialmente
        expandedServicoIndex: null, // Nenhum serviço está expandido inicialmente
        editingProduto: null, // Nenhum produto está sendo editado inicialmente
        editingServico: null, // Nenhum serviço está sendo editado inicialmente
        editIndex: null, // Nenhum índice de edição
    };

    // Carrega os produtos e serviços do localStorage quando o componente é montado
    componentDidMount() {
        const produtos = localStorage.getItem("produtos");
        const servicos = localStorage.getItem("servicos");

        // Se encontrar produtos no localStorage, tenta parseá-los
        if (produtos) {
            try {
                const parsedProdutos = JSON.parse(produtos);
                if (Array.isArray(parsedProdutos)) {
                    this.setState({ produtos: parsedProdutos });
                } else {
                    console.error("Os dados de produtos no localStorage não estão no formato esperado.");
                }
            } catch (error) {
                console.error("Erro ao analisar os dados de produtos do localStorage:", error);
            }
        }

        // Se encontrar serviços no localStorage, tenta parseá-los
        if (servicos) {
            try {
                const parsedServicos = JSON.parse(servicos);
                if (Array.isArray(parsedServicos)) {
                    this.setState({ servicos: parsedServicos });
                } else {
                    console.error("Os dados de serviços no localStorage não estão no formato esperado.");
                }
            } catch (error) {
                console.error("Erro ao analisar os dados de serviços do localStorage:", error);
            }
        }
    }

    // Toggla a visibilidade do dropdown do produto
    toggleProdutoDropdown = (index: number) => {
        this.setState(prevState => ({
            expandedProdutoIndex: prevState.expandedProdutoIndex === index ? null : index,
            expandedServicoIndex: null // Fecha qualquer serviço aberto
        }));
    };

    // Toggla a visibilidade do dropdown do serviço
    toggleServicoDropdown = (index: number) => {
        this.setState(prevState => ({
            expandedServicoIndex: prevState.expandedServicoIndex === index ? null : index,
            expandedProdutoIndex: null // Fecha qualquer produto aberto
        }));
    };

    // Deleta um produto e atualiza o localStorage
    deleteProduto = (nomeprod: string) => {
        const updatedProdutos = this.state.produtos.filter(produto => produto.nomeprod !== nomeprod);
        this.setState({ produtos: updatedProdutos });
        localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
    };

    // Deleta um serviço e atualiza o localStorage
    deleteServico = (nomeserv: string) => {
        const updatedServicos = this.state.servicos.filter(servico => servico.nomeserv !== nomeserv);
        this.setState({ servicos: updatedServicos });
        localStorage.setItem("servicos", JSON.stringify(updatedServicos));
    };

    // Habilita a edição de um produto
    enableEditProduto = (produto: Produto, index: number) => {
        this.setState({ editIndex: index, editingProduto: { ...produto } });
    };

    // Habilita a edição de um serviço
    enableEditServico = (servico: Servico, index: number) => {
        this.setState({ editIndex: index, editingServico: { ...servico } });
    };

    // Salva as alterações feitas em um produto
    saveEditProduto = () => {
        const { editingProduto, produtos, editIndex } = this.state;
        if (editingProduto && editIndex !== null) {
            const updatedProdutos = [...produtos];
            updatedProdutos[editIndex] = editingProduto;
            this.setState({ produtos: updatedProdutos, editIndex: null, editingProduto: null });
            localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
        }
    };

    // Salva as alterações feitas em um serviço
    saveEditServico = () => {
        const { editingServico, servicos, editIndex } = this.state;
        if (editingServico && editIndex !== null) {
            const updatedServicos = [...servicos];
            updatedServicos[editIndex] = editingServico;
            this.setState({ servicos: updatedServicos, editIndex: null, editingServico: null });
            localStorage.setItem("servicos", JSON.stringify(updatedServicos));
        }
    };

    // Atualiza o valor de um campo no produto em edição
    handleChangeProduto = (field: string, value: string | number) => {
        const { editingProduto } = this.state;
        if (editingProduto) {
            this.setState({
                editingProduto: { ...editingProduto, [field]: field === "valorprod" ? Number(value) : value }
            });
        }
    };

    // Atualiza o valor de um campo no serviço em edição
    handleChangeServico = (field: string, value: string | number) => {
        const { editingServico } = this.state;
        if (editingServico) {
            this.setState({
                editingServico: { ...editingServico, [field]: field === "valorserv" ? Number(value) : value }
            });
        }
    };

    render() {
        const { produtos, servicos, expandedProdutoIndex, expandedServicoIndex, editIndex, editingProduto, editingServico } = this.state;

        return (
            <div className="container-fluid">
                <div className="list-group">
                    {produtos.length > 0 && (
                        <div>
                            <h3>Produtos</h3>
                            {produtos.map((produto, index) => (
                                <div key={index}>
                                    <a
                                        href="#"
                                        className="list-group-item list-group-item-action"
                                        style={{ backgroundColor: '#ffff', borderRadius:'20px' }}
                                        onClick={() => this.toggleProdutoDropdown(index)}
                                    >
                                        {produto.nomeprod}
                                    </a>
                                    {expandedProdutoIndex === index && (
                                        <div className="dropdown-content">
                                            {editIndex !== index && (
                                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                    <button className="btn btn-danger" onClick={() => this.deleteProduto(produto.nomeprod)}>
                                                        Deletar
                                                    </button>
                                                    <button className="btn btn-info" onClick={() => this.enableEditProduto(produto, index)}>
                                                        Atualizar
                                                    </button>
                                                </div>
                                            )}
                                            {editIndex === index && editingProduto ? (
                                                <div>
                                                    <input type="text" className="inputscadastroproduto2" value={editingProduto.nomeprod} onChange={(e) => this.handleChangeProduto("nomeprod", e.target.value)} />
                                                    <input type="number" className="inputscadastroproduto2" value={editingProduto.valorprod} onChange={(e) => this.handleChangeProduto("valorprod", e.target.value)} />
                                                    <input type="text" className="inputscadastroproduto2" value={editingProduto.tipoprod} onChange={(e) => this.handleChangeProduto("tipoprod", e.target.value)} />
                                                    <input type="text" className="inputscadastroproduto2" value={editingProduto.descricaoprod} onChange={(e) => this.handleChangeProduto("descricaoprod", e.target.value)} />
                                                    <button className="btn btn-success" onClick={this.saveEditProduto}>
                                                        Salvar
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p><strong>Valor:</strong> R${produto.valorprod}</p>
                                                    <p><strong>Tipo:</strong> {produto.tipoprod}</p>
                                                    <p><strong>Descrição:</strong> {produto.descricaoprod}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {servicos.length > 0 && (
                        <div>
                            <h3>Serviços</h3>
                            {servicos.map((servico, index) => (
                                <div key={index}>
                                    <a
                                        href="#"
                                        className="list-group-item list-group-item-action"
                                        style={{ backgroundColor: '#f8f9fa' }}
                                        onClick={() => this.toggleServicoDropdown(index)}
                                    >
                                        {servico.nomeserv}
                                    </a>
                                    {expandedServicoIndex === index && (
                                        <div className="dropdown-content">
                                            {editIndex !== index && (
                                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                    <button className="btn btn-danger" onClick={() => this.deleteServico(servico.nomeserv)}>
                                                        Deletar
                                                    </button>
                                                    <button className="btn btn-info" onClick={() => this.enableEditServico(servico, index)}>
                                                        Atualizar
                                                    </button>
                                                </div>
                                            )}
                                            {editIndex === index && editingServico ? (
                                                <div>
                                                    <input type="text" className="inputscadastroproduto2" value={editingServico.nomeserv} onChange={(e) => this.handleChangeServico("nomeserv", e.target.value)} />
                                                    <input type="number" className="inputscadastroproduto2" value={editingServico.valorserv} onChange={(e) => this.handleChangeServico("valorserv", e.target.value)} />
                                                    <input type="text" className="inputscadastroproduto2" value={editingServico.tiposerv} onChange={(e) => this.handleChangeServico("tiposerv", e.target.value)} />
                                                    <input type="text" className="inputscadastroproduto2" value={editingServico.descricaoserv} onChange={(e) => this.handleChangeServico("descricaoserv", e.target.value)} />
                                                    <button className="btn btn-success" onClick={this.saveEditServico}>
                                                        Salvar
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p><strong>Valor:</strong> R${servico.valorserv}</p>
                                                    <p><strong>Tipo:</strong> {servico.tiposerv}</p>
                                                    <p><strong>Descrição:</strong> {servico.descricaoserv}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
