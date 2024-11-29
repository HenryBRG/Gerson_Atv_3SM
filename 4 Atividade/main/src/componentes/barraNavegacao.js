/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function BarraNavegacao(props) {
    const gerarListaBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>;
        } else {
            let lista = props.botoes.map((valor) => (
                
                <li key={valor} className="nav-item" style={{marginRight:'100px', borderRadius:'200px'}}>
                    <a
                        className="nav-link px-3 py-2 text-light rounded mx-1"
                        href="#"
                        style={{ transition: "0.3s", backgroundColor: "gray",marginLeft:"", marginBottom:'35px', marginTop:'20px', marginRight:'300px', borderRadius:'0px' }}
                        onClick={(e) => props.seletorView(valor, e)}
                    >
                        {valor}
                    </a>
                </li>
            ));
            return lista;
        }
    };

    let tema =  "white"; 
    return (
        <nav
            className="navbar navbar-expand-lg"
            data-bs-theme="light"
            style={{
                backgroundColor: tema,
                marginBottom: 10,
                padding: "10px 20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
        >

            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{backgroundColor:'white'}}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <h3>PetLovers</h3>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        {gerarListaBotoes()}
                    </ul>
                </div>
                <h3>Menu</h3>
            </div>
        </nav>
    );
}
