import Entrada from "../io/entrada";
import Cliente from "../modelo/Cliente";
import Atualizar from "./Att";

export default class AtualizarCliente extends Atualizar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nIniciando o processo de atualização do cliente.`);
        let cpfAtualizar = this.entrada.receberTexto(`Informe o CPF do cliente que deseja alterar: `);

        let clienteEncontrado = this.clientes.find(cliente => cliente.getCpf.getValor === cpfAtualizar);

        if (clienteEncontrado) {
            console.log(`\nCliente localizado! Agora, forneça as novas informações.\n`);

            let novoNome = this.entrada.receberTexto(`Digite o novo nome do cliente (ou pressione Enter para manter o nome atual): `);
            let desejaNomeSocial = this.entrada.receberTexto(`Deseja cadastrar um nome social? (S/N): `);
            let novoNomeSocial = "";
            if (desejaNomeSocial.toLowerCase() === 's') {
                novoNomeSocial = this.entrada.receberTexto(`Informe o nome social do cliente: `);
            }
            let novoEmail = this.entrada.receberTexto(`Insira o novo email do cliente (ou pressione Enter para manter o email atual): `);
            let novoNumeroRG = this.entrada.receberTexto(`Informe o novo RG (ou pressione Enter para manter o RG atual): `);
            let novoDDD = this.entrada.receberTexto(`Informe o novo DDD (ou pressione Enter para manter o DDD atual): `);
            let novoNumero = this.entrada.receberTexto(`Informe o novo número de telefone (ou pressione Enter para manter o número atual): `);

            if (novoNome) clienteEncontrado.nome = novoNome;
            if (novoNomeSocial) clienteEncontrado.nomeSocial = novoNomeSocial;
            if (novoEmail) clienteEncontrado.email = novoEmail;
            if (novoNumeroRG) clienteEncontrado.rg.valorrg = novoNumeroRG;
            if (novoDDD) clienteEncontrado.telefone.ddd = novoDDD;
            if (novoNumero) clienteEncontrado.telefone.numero = novoNumero;

            if (clienteEncontrado.pet.length > 1) {
                console.log(`\nO cliente possui vários pets cadastrados.`);
                clienteEncontrado.pet.forEach((pet, index) => {
                    console.log(`${index + 1}. Nome: ${pet.nome}, Tipo: ${pet.tipo}, Raça: ${pet.raca}, Gênero: ${pet.genero}`);
                });

                let indicePet = parseInt(this.entrada.receberTexto(`Informe o número do pet que deseja alterar (ou pressione Enter para ignorar a atualização dos pets): `)) - 1;
                if (!isNaN(indicePet) && indicePet >= 0 && indicePet < clienteEncontrado.pet.length) {
                    let petSelecionado = clienteEncontrado.pet[indicePet];

                    let novoNomePet = this.entrada.receberTexto(`Digite o novo nome do pet (ou pressione Enter para manter o nome atual): `);
                    let novoTipoPet = this.entrada.receberTexto(`Digite o novo tipo do pet (ou pressione Enter para manter o tipo atual): `);
                    let novaRacaPet = this.entrada.receberTexto(`Digite a nova raça do pet (ou pressione Enter para manter a raça atual): `);
                    let novoGeneroPet = this.entrada.receberTexto(`Digite o novo gênero do pet (ou pressione Enter para manter o gênero atual): `);

                    if (novoNomePet) petSelecionado.nome = novoNomePet;
                    if (novoTipoPet) petSelecionado.tipo = novoTipoPet;
                    if (novaRacaPet) petSelecionado.raca = novaRacaPet;
                    if (novoGeneroPet) petSelecionado.genero = novoGeneroPet;
                }
            } else if (clienteEncontrado.pet.length === 1) {
                let petSelecionado = clienteEncontrado.pet[0];

                let novoNomePet = this.entrada.receberTexto(`Digite o novo nome do pet (ou pressione Enter para manter o nome atual): `);
                let novoTipoPet = this.entrada.receberTexto(`Digite o novo tipo do pet (ou pressione Enter para manter o tipo atual): `);
                let novaRacaPet = this.entrada.receberTexto(`Digite a nova raça do pet (ou pressione Enter para manter a raça atual): `);
                let novoGeneroPet = this.entrada.receberTexto(`Digite o novo gênero do pet (ou pressione Enter para manter o gênero atual): `);

                if (novoNomePet) petSelecionado.nome = novoNomePet;
                if (novoTipoPet) petSelecionado.tipo = novoTipoPet;
                if (novaRacaPet) petSelecionado.raca = novaRacaPet;
                if (novoGeneroPet) petSelecionado.genero = novoGeneroPet;
            }

            console.log(`\nAs informações do cliente foram atualizadas com sucesso!\n`);
        } else {
            console.log(`\nNenhum cliente com o CPF ${cpfAtualizar} foi encontrado.\n`);
        }
    }
}
