import { useEffect, useState } from "react";
import ElementoListaCliente from "./elementoListaCliente";
import axios from "axios";
import '../App.css'

export default function ListaCliente(props) {
    let tema = props.tema;
    const [data, setData] = useState([]);
    const getClientes = () => {
        let url = 'http://localhost:32831/cliente/clientes';
        axios.get(url)
        .then(response => {
        })
        .catch(found => {
            setData(found.response.data);
            console.log(found.response.data[0]);
        });
    };
    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div className="container-fluid">
            <div className="container mt-5" style={{marginLeft:'25%'}}>
            <h1 style={{color:'white'}}>Clientes Cadastrados</h1>

            <table className="table" style={{width: '55%'}}>
                <thead>
                    <tr>

                    </tr>
                </thead>
                <tbody>
                    <div>
                    {data.map(element => (
                        <ElementoListaCliente
                            key={element.id}
                            onUpdate={getClientes}
                            tema={tema}
                            id={element.id}
                            nome={element.nome}
                            nomeSocial={element.nomeSocial}
                            email={element.email}
                            endereco={element.endereco}
                            telefones={element.telefones}
                        />
                    ))}
                    </div>
                </tbody>
            </table>
        </div>
        </div>
    );
}
