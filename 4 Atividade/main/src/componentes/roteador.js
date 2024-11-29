/* eslint-disable no-unused-vars */
import { useState } from "react";
import BarraNavegacao from "./barraNavegacao"
import ListaCliente from "./listaCliente";
import FormularioCadastroCliente from "./CadastroCliente";

export default function Roteador() {
    const corpadrao = "white"
    const botoes = ['Cadastros', 'Clientes']
    const [tela, setTela] = useState('Cadastros')
    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
    }

    const construirView = () => {
        if (tela === 'Clientes') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema={corpadrao} botoes={botoes} />
                    <ListaCliente tema="#e3f2fd" />
                </>
            )
        } if(tela === 'Cadastros') {
            return (
                <>
                    <BarraNavegacao seletorView={selecionarView} tema={corpadrao} botoes={botoes} />
                    <FormularioCadastroCliente tema={corpadrao} />
                </>
            )
        }
    }

    return (
        construirView()
    )
}