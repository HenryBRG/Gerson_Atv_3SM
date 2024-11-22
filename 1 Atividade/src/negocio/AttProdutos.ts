import Entrada from "../io/entrada";
import Atualizar from "./Att";
import Produto from "../modelo/Produto";

export default class AtualizarProduto extends Atualizar {
    private produto: Array<Produto>;
    private entrada: Entrada;

    constructor(produto: Array<Produto>) {
        super();
        this.produto = produto;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nIniciando a atualização das informações do produto.`);
        let idAtualizar = this.entrada.receberNumero(`Informe o ID do produto que deseja alterar: `);

        let produtoEncontrado = this.produto.find(produto => produto.getIdProduto === idAtualizar);

        if (produtoEncontrado) {
            console.log(`\nProduto localizado! Insira as novas informações a seguir.\n`);

            let novoNome = this.entrada.receberTexto(`Digite o novo nome do produto (ou pressione Enter para manter o nome atual): `);
            let novoValorInput = this.entrada.receberTexto(`Informe o novo valor do produto (ou pressione Enter para manter o valor atual): `);
            let novoValor = novoValorInput ? Number(novoValorInput) : undefined;

            if (novoValorInput && isNaN(novoValor)) {
                console.error("Erro: O valor informado não é válido.");
                return;
            }

            let novaDescricao = this.entrada.receberTexto(`Digite a nova descrição do produto (ou pressione Enter para manter a descrição atual):`);

            if (novoNome) produtoEncontrado.nomeprod = novoNome;
            if (novoValor) produtoEncontrado.valorprod = novoValor;
            if (novaDescricao) produtoEncontrado.descricaoprod = novaDescricao;

            console.log(`\nAs informações do produto foram atualizadas com sucesso!\n`);
        } else {
            console.log(`\nNenhum produto com o ID ${idAtualizar} foi encontrado.\n`);
        }
    }
}
