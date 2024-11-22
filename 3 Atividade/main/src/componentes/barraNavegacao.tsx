import React, { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Propriedades do componente BarraNavegacao
type BarraNavegacaoProps = {
  botoes: string[]; // Lista de botões para exibir na barra de navegação
  seletorView: (valor: string, event: React.MouseEvent<HTMLAnchorElement>) => void; // Função para tratar cliques nos botões
};

const BarraNavegacao: FC<BarraNavegacaoProps> = ({ botoes, seletorView }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // Estado para controle de colapso da navegação

  // Gera a lista de botões com base na propriedade `botoes`
  const gerarListaBotoes = () => {
    if (botoes.length <= 0) return null; // Retorna nulo se não houver botões

    return botoes.map((valor) => (
      <li key={valor} className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={(e) => seletorView(valor, e)} // Chama a função seletorView no clique
        >
          {valor}
        </a>
      </li>
    ));
  };

  // Atualiza o título da página com base no primeiro botão da lista
  useEffect(() => {
    document.title = `PetLovers - ${botoes[0] || "Home"}`;
  }, [botoes]);

  // Alterna o estado de colapso da navegação
  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav
      className="navbar navbar-expand-lg flex-column align-items-start"
      data-bs-theme="light"
      style={{
        backgroundColor: "#ffffff",
        marginBottom: 10,
        borderRadius: "15px",
      }}
    >
      {/* Título principal */}
      <div
        className="navbar-header w-100 text-center"
        style={{
          fontSize: "19pt",
          color: "#b8daa9",
          marginBottom: "10px",
        }}
      >
        PetLovers
      </div>

      {/* Botões do menu */}
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={handleToggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isNavCollapsed ? "" : "show"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav w-100">{gerarListaBotoes()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacao;
