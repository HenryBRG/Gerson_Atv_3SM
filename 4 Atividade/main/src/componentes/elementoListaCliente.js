import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

export default function ElementoListaCliente({
  id,
  nome,
  nomeSocial,
  email,
  endereco,
  telefones,
  onUpdate: getClientes,
}) {
  const [editData, setEditData] = useState({
    nome: nome || "",
    nomeSocial: nomeSocial || "",
    email: email || "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
      ...endereco,
    },
    telefones: telefones || [{ numero: "", ddd: "" }],
  });

  const [showDetails, setShowDetails] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setEditData({
      nome: nome || "",
      nomeSocial: nomeSocial || "",
      email: email || "",
      endereco: {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        codigoPostal: "",
        informacoesAdicionais: "",
        ...endereco,
      },
      telefones: telefones || [{ numero: "", ddd: "" }],
    });
  }, [nome, nomeSocial, email, endereco, telefones]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => {
      const keys = name.split(".");
      if (keys.length === 1) {
        return { ...prev, [name]: value };
      }
      const updated = { ...prev };
      keys.reduce((acc, key, idx) => {
        if (idx === keys.length - 1) {
          acc[key] = value;
        }
        return acc[key];
      }, updated);
      return updated;
    });
  };

  const handleTelefoneChange = (index, field, value) => {
    setEditData((prev) => {
      const updatedTelefones = [...prev.telefones];
      updatedTelefones[index][field] = value;
      return { ...prev, telefones: updatedTelefones };
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:32831/cliente/atualizar`, editData);
      alert("Cliente atualizado com sucesso!");
      setStatus("success");
      getClientes();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setStatus("error");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:32831/cliente/excluir`, { data: { id } });
      alert("Cliente excluído com sucesso!");
      getClientes();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  const renderTelefoneInputs = () =>
    editData.telefones.map((tel, index) => (
      <div key={index} className="mb-3">
        <InputMask
          mask="99"
          className="form-control mb-2"
          placeholder="DDD"
          value={tel.ddd}
          onChange={(e) => handleTelefoneChange(index, "ddd", e.target.value)}
        />
        <InputMask
          mask="99999-9999"
          className="form-control"
          placeholder="Telefone"
          value={tel.numero}
          onChange={(e) => handleTelefoneChange(index, "numero", e.target.value)}
        />
      </div>
    ));

  return (
    <div style={{ backgroundColor: "white", borderRadius: "20px", marginTop: "15px" }}>
      <div className="cliente-card" style={{ borderRadius: "20px" }}>
        <div
          className="cliente-header"
          onClick={() => setShowDetails(!showDetails)}
          style={{ cursor: "pointer" }}
        >
          <h3>{editData.nome}</h3>
          <button className="toggle-details-btn" style={{ borderRadius: "20px" }}>
            {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
          </button>
        </div>

        {showDetails && (
          <div className="cliente-details">
            <p>
              <strong>Nome Social:</strong> {editData.nomeSocial}
            </p>
            <p>
              <strong>Email:</strong> {editData.email}
            </p>
            <p>
              <strong>Endereço:</strong>{" "}
              {`${editData.endereco.rua}, ${editData.endereco.numero}, ${editData.endereco.bairro}, ${editData.endereco.cidade} - ${editData.endereco.estado}, CEP: ${editData.endereco.codigoPostal}`}
            </p>
            <p>
              <strong>Informações Endereço:</strong>{" "}
              {editData.endereco.informacoesAdicionais}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {editData.telefones
                .map((tel) => `(${tel.ddd}) ${tel.numero}`)
                .join(", ")}
            </p>
            <div className="button-group">
              <button
                className="btn btn-edit"
                style={{ marginRight: "70%" }}
                data-bs-toggle="modal"
                data-bs-target={`#modalEditar-${id}`}
              >
                Editar
              </button>
              <button className="btn btn-delete" onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        )}

        <div
          className="modal fade"
          id={`modalEditar-${id}`}
          tabIndex="-1"
          aria-labelledby={`modalEditarLabel-${id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Atualizar Dados do Cliente</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" >
                <form>
                  {[
                    { placeholder: "Nome", name: "nome", value: editData.nome },
                    { placeholder: "Nome Social", name: "nomeSocial", value: editData.nomeSocial },
                    { placeholder: "Email", name: "email", value: editData.email },
                  ].map((input, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="form-control mb-3"
                      placeholder={input.placeholder}
                      name={input.name}
                      value={input.value}
                      onChange={handleInputChange}
                      style={{ borderRadius:'0px'}}
                    />
                  ))}
                  {[
                    "estado",
                    "cidade",
                    "bairro",
                    "rua",
                    "numero",
                    "informacoesAdicionais",
                  ].map((field, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="form-control mb-3"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={`endereco.${field}`}
                      value={editData.endereco[field]}
                      onChange={handleInputChange}
                      style={{ borderRadius:'0px'}}
                    />
                  ))}
                  <InputMask
                    mask="99999-999"
                    className="form-control mb-3"
                    placeholder="Código Postal"
                    name="endereco.codigoPostal"
                    value={editData.endereco.codigoPostal}
                    onChange={handleInputChange}
                  />
                  {renderTelefoneInputs()}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  data-bs-dismiss="modal"
                  style={{backgroundColor:'gray', borderColor:'gray'}}
                >
                  Salvar Mudanças
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




















// Vamos todos cantar com alegria  
// De coração para coração  
// Um canto cheio de energia  
// De amor e de emoção  

// Paysandu, Paysandu  
// O orgulho de ser bicolor  
// Paysandu, Paysandu  
// Time de raça e de amor  

// Sob o azul do céu de anil  
// E o branco das nuvens de algodão  
// Tu és o maior do meu Brasil  
// Te amamos de paixão  

// Paysandu, Paysandu  
// O orgulho de ser bicolor  
// Paysandu, Paysandu  
// Time de raça e de amor  

// Teu estádio é uma fortaleza  
// Onde a tua torcida faz tremer  
// És o mais querido da Princesa  
// O teu nome é vencer  

// Paysandu, Paysandu  
// O orgulho de ser bicolor  
// Paysandu, Paysandu  
// Time de raça e de amor
