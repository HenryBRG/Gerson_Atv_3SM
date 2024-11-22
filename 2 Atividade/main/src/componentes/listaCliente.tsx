import { Component } from "react";
import { insertMaskInCpf } from "../functions/cpf";
import { insertMaskInTelefone } from "../functions/telefonemask";

// Tipagem para os componentes
type props = {};

type Pet = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

type Cliente = {
    nome: string;
    nomeSocial?: string;
    email: string;
    telefone: { numero: string };
    cpf: { valor: string };
    rg: { valorrg: string };
    pet: Pet[]; // Lista de pets do cliente
    compras: { nomeProduto: string; valor: number }[];  // Produtos comprados pelo cliente
};

type State = {
    clientes: Cliente[]; // Lista de clientes
    expandedIndex: number | null; // Índice do cliente expandido
    editIndex: number | null; // Índice do cliente em modo de edição
    editingCliente: Cliente | null; // Cliente em edição
    cpfCliente: string; // CPF do cliente a ser editado
};

export default class ListaCliente extends Component<props, State> {
    state: State = {
        clientes: [], // Inicializando lista de clientes vazia
        expandedIndex: null, 
        editIndex: null, 
        editingCliente: null,
        cpfCliente: "" // Inicialmente sem cliente para editar
    };

    // Carrega os dados de clientes do localStorage ao montar o componente
    componentDidMount() {
        const clientesLocalStorage = localStorage.getItem("clientes");
        if (clientesLocalStorage) {
            try {
                const parsedClientes = JSON.parse(clientesLocalStorage);
                if (Array.isArray(parsedClientes) && parsedClientes.every(cliente => cliente.nome)) {
                    this.setState({ clientes: parsedClientes });
                }
            } catch (error) {
                console.error("Erro ao analisar os dados do localStorage:", error);
            }
        }
    }

    // Função para alternar a exibição de detalhes do cliente
    toggleDropdown = (index: number) => {
        this.setState(prevState => {
            const newIndex = prevState.expandedIndex === index ? null : index;
            return { expandedIndex: newIndex };
        });
    };

    // Função para deletar um cliente da lista
    deleteCliente = (cpf: string) => {
        const { clientes } = this.state;
        const updatedClientes = clientes.filter(cliente => cliente.cpf.valor !== cpf);
        this.setState({ clientes: updatedClientes });
        localStorage.setItem("clientes", JSON.stringify(updatedClientes));
    };

    // Ativa o modo de edição para um cliente
    enableEdit = (cliente: Cliente, index: number) => {
        this.setState({ editIndex: index, editingCliente: { ...cliente } });
    };

    // Função para atualizar os campos do cliente, incluindo informações de pet
    handleChange = (field: string, value: string, petIndex?: number) => {
        const { editingCliente } = this.state;
        if (editingCliente) {
            if (petIndex !== undefined) {
                // Atualiza as informações de um pet específico
                const updatedPets = [...editingCliente.pet];
                updatedPets[petIndex] = { ...updatedPets[petIndex], [field]: value };
                this.setState({
                    editingCliente: { ...editingCliente, pet: updatedPets }
                });
            } else if (field === "telefone") {
                // Aplica a máscara de telefone antes de atualizar o campo
                const maskedTelefone = insertMaskInTelefone(value);
                this.setState({
                    editingCliente: {
                        ...editingCliente,
                        telefone: { ...editingCliente.telefone, numero: maskedTelefone }
                    }
                });
            } else {
                // Atualiza os outros campos diretamente
                this.setState({
                    editingCliente: { ...editingCliente, [field]: value }
                });
            }
        }
    };

    // Salva as alterações feitas no cliente
    saveEdit = () => {
        const { editingCliente, clientes, editIndex } = this.state;
        if (editingCliente && editIndex !== null) {
            const updatedClientes = [...clientes];
            updatedClientes[editIndex] = editingCliente; // Atualiza o cliente com os novos dados
            this.setState({ clientes: updatedClientes, editIndex: null, editingCliente: null });
            localStorage.setItem("clientes", JSON.stringify(updatedClientes)); // Salva os dados no localStorage
        }
    };

    render() {
        const { clientes, expandedIndex, editIndex, editingCliente } = this.state;

        return (
            <div className="container-fluid">
                <div className="list-group">
                    {clientes.map((cliente, index) => (
                        <div key={index}>
                            <a 
                                href="#" 
                                className="list-group-item list-group-item-action" 
                                onClick={() => this.toggleDropdown(index)}
                            >
                                {cliente.nome}
                            </a>

                            {expandedIndex === index && (
                                <div className="dropdown-content" style={{ padding: "20px", border: "1px solid #ddd", position: "relative" }}>

                                    {/* Verifica se não está em modo de edição antes de exibir os botões */}
                                    {editIndex !== index && (
                                        <>
                                            {/* Botão para deletar cliente */}
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.deleteCliente(cliente.cpf.valor)}
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "10px",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    padding: "5px 10px",
                                                }}
                                            >
                                                Deletar
                                            </button>

                                            {/* Botão para editar cliente */}
                                            <button
                                                className="btn btn-info"
                                                onClick={() => this.enableEdit(cliente, index)}
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "90px",
                                                    color: "white",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    padding: "5px 10px",
                                                }}
                                            >
                                                Atualizar
                                            </button>
                                        </>
                                    )}

                                    {/* Exibe o formulário de edição se estiver no modo de edição */}
                                    {editIndex === index && editingCliente ? (
                                        <div>
                                            <input 
                                                type="text"
                                                className="inputscadastrocliente2"
                                                value={editingCliente.nome}
                                                onChange={(e) => this.handleChange("nome", e.target.value)}
                                                placeholder="Nome"
                                            />
                                            <input 
                                                type="text" 
                                                className="inputscadastrocliente2"
                                                value={editingCliente.email}
                                                onChange={(e) => this.handleChange("email", e.target.value)}
                                                placeholder="Email"
                                            />
                                            <input 
                                                type="text" 
                                                className="inputscadastrocliente2"
                                                value={editingCliente.telefone.numero}
                                                onChange={(e) => this.handleChange("telefone", e.target.value)}
                                                placeholder="Telefone"
                                            />

                                            <div>
                                                {editingCliente.pet.map((pet, petIndex) => (
                                                    <div key={petIndex} style={{ marginBottom: "10px" }}>
                                                        <input 
                                                            type="text"
                                                            className="inputscadastrocliente2"
                                                            value={pet.nome}
                                                            onChange={(e) => this.handleChange("nome", e.target.value, petIndex)}
                                                            placeholder="Nome do Pet"
                                                        />
                                                        <input 
                                                            type="text" 
                                                            className="inputscadastrocliente2"
                                                            value={pet.tipo}
                                                            onChange={(e) => this.handleChange("tipo", e.target.value, petIndex)}
                                                            placeholder="Tipo do Pet"
                                                        />
                                                        <input 
                                                            type="text" 
                                                            className="inputscadastrocliente2"
                                                            value={pet.raca}
                                                            onChange={(e) => this.handleChange("raca", e.target.value, petIndex)}
                                                            placeholder="Raça do Pet"
                                                        />
                                                        <input 
                                                            type="text" 
                                                            className="inputscadastrocliente2"
                                                            value={pet.genero}
                                                            onChange={(e) => this.handleChange("genero", e.target.value, petIndex)}
                                                            placeholder="Gênero do Pet"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="btn btn-success" onClick={this.saveEdit} style={{ backgroundColor: "green", color: "white", padding: "5px 10px", }}>
                                                Salvar
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            {cliente.nomeSocial && (
                                                <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                                            )}
                                            <p><strong>Email:</strong> {cliente.email || "Não informado"}</p>
                                            <p><strong>Telefone:</strong> {cliente.telefone.numero || "Não informado"}</p>
                                            <p><strong>CPF:</strong> {cliente.cpf.valor}</p>
                                            <p><strong>RG:</strong> {cliente.rg.valorrg}</p>

                                            {cliente.pet.length > 0 ? (
                                                <ul>
                                                    {cliente.pet.map((pet, petIndex) => (
                                                        <li key={petIndex}>
                                                            <p><strong>Nome do Pet:</strong> {pet.nome}</p>
                                                            <p><strong>Tipo:</strong> {pet.tipo}</p>
                                                            <p><strong>Raça:</strong> {pet.raca}</p>
                                                            <p><strong>Gênero:</strong> {pet.genero}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p><strong>Não possui pets cadastrados.</strong></p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
