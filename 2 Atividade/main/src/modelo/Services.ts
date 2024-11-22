export default class Servico {
    public idserv: number; // ID do serviço
    public nomesserv!: string; // Nome do serviço
    public valorserv: number; // Valor do serviço
    public descricaoserv: string; // Descrição do serviço
    public tiposerv: string; // Tipo do serviço

    constructor(
        idserv: number,
        nomeserv: string,
        valorserv: number,
        descricaoserv: string,
        tiposerv: string
    ) {
        // Inicializa as propriedades do serviço
        this.idserv = idserv;
        this.nomesserv = nomeserv;
        this.valorserv = valorserv;
        this.descricaoserv = descricaoserv;
        this.tiposerv = tiposerv;
    }

    // Retorna o ID do serviço
    public get getIdServico() {
        return this.idserv;
    }

    // Retorna o nome do serviço
    public get getNomeServico() {
        return this.nomesserv;
    }

    // Retorna o valor do serviço
    public get getValorServico() {
        return this.valorserv;
    }

    // Retorna a descrição do serviço
    public get getDescricaoServico() {
        return this.descricaoserv;
    }

    // Retorna o tipo do serviço
    public get getTipoServico() {
        return this.tiposerv;
    }
}
