import Listagem from "./Lista"
import Produto from "../modelo/Produto"
import * as fs from 'fs';

export default class ListagemProduto extends Listagem {
    private produto: Array<Produto>
    constructor(produto: Array<Produto>) {
        super()
        this.produto = produto

        this.carregarProdutosPredefinidos()
    }
    
    private carregarProdutosPredefinidos():void{

        const dadosPredefinidos = JSON.parse(fs.readFileSync('src/modelo/produto.json','utf-8'))

        dadosPredefinidos.produto.forEach((produtoData:any) => {
            const produto = new Produto(
                produtoData.idprod,    
                produtoData.nomeprod,    
                produtoData.valorprod,     
                produtoData.descricaoprod,  
                produtoData.tipoprod      
            )
            this.produto.push(produto)
        })
    }
    public listar(): void {
        console.log(`\nLista de todos os Produtos:`)

        this.produto.forEach(produto => {;
            console.log(`ID:`+ produto.getIdProduto)
            console.log(`Nome: ` + produto.getNomeProduto)
            console.log(`Valor: ` + produto.getValorProduto)
            console.log(`Descrição: ` + produto.getDescricaoProduto)
            console.log(`Tipo:`+ produto.getTipoProduto)
            console.log(`--------------------------------------`)
        });
        console.log(`\n`)
    }
}
