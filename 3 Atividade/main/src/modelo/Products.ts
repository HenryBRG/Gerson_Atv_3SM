export default class Produto {
    public idprod: number;
    public nomeprod!: string;
    public valorprod: number;
    public descricaoprod: string;
    public tipoprod: string;

    constructor(
        idprod: number,
        nomeprod: string,
        valorprod: number,
        descricaoprod: string,
        tipoprod: string
    ) {
        // Inicializa as propriedades do produto
        this.idprod = idprod;
        this.nomeprod = nomeprod;
        this.valorprod = valorprod;
        this.descricaoprod = descricaoprod;
        this.tipoprod = tipoprod;
    }

    // Retorna o ID do produto
    public get getIdProduto() {
        return this.idprod;
    }

    // Retorna o nome do produto
    public get getNomeProduto() {
        return this.nomeprod;
    }

    // Retorna o valor do produto
    public get getValorProduto() {
        return this.valorprod;
    }

    // Retorna a descrição do produto
    public get getDescricaoProduto() {
        return this.descricaoprod;
    }

    // Retorna o tipo do produto
    public get getTipoProduto() {
        return this.tipoprod;
    }
}
