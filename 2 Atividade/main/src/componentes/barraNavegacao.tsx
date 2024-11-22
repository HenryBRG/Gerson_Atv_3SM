/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    botoes: string[];
    seletorView: (valor: string, event: React.MouseEvent) => void; // Definição mais clara do tipo de seletorView
};

export default class BarraNavegacao extends Component<Props> {
    // Transformando gerarListaBotoes em uma função de seta
    gerarListaBotoes = () => {
        const { botoes, seletorView } = this.props;
        return botoes.length > 0 ? (
            botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => seletorView(valor, e)}>
                        {valor}
                    </a>
                </li>
            ))
        ) : (
            <></>
        );
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: '#ffffff', marginBottom: 10, borderRadius: '15px' }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1" style={{ fontSize: '19pt', color: '#b8daa9' }}>
                        PetLovers
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {this.gerarListaBotoes()}
                        </ul>
                    </div>
                    <span className="navbar-brand mb-0 h1" style={{ fontSize: '19t', color: '#b8daa9', marginLeft:'1%' }}>
                        Menu
                    </span>
                </div>
            </nav>
        );
    }
}
