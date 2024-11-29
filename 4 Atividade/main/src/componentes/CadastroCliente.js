import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import "../index.css";

// Componente reutilizável para inputs simples
const InputField = ({ label, name, value, onChange, error, placeholder, type = "text" }) => (
  <div className="mb-3">
    <input
      type={type}
      className={`inputscadastrocliente ${error ? "input-error" : ""}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

// Componente reutilizável para inputs com máscara
const MaskedInputField = ({ label, name, value, onChange, error, placeholder, mask }) => (
  <div className="mb-3">
    <InputMask
      mask={mask}
      className={`inputscadastrocliente ${error ? "input-error" : ""}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default function FormularioCadastroCliente() {
  const [formData, setFormData] = useState({
    nome: "",
    nomeSocial: "",
    email: "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
    },
    telefones: [
      {
        numero: "",
        ddd: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("endereco.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [fieldName]: value },
      }));
    } else if (name.startsWith("telefones.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        telefones: [{ ...prev.telefones[0], [fieldName]: value }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.nome) validationErrors.nome = "O nome é obrigatório";
    if (!formData.email) validationErrors.email = "O e-mail é obrigatório";
    if (!formData.telefones[0].numero)
      validationErrors["telefones.numero"] = "O telefone é obrigatório";
    if (!formData.endereco.estado)
      validationErrors["endereco.estado"] = "O estado é obrigatório";

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://localhost:32831/cliente/cadastrar", formData)
      .then(() => {
        alert("Cadastrado com sucesso");
        setFormData({
          nome: "",
          nomeSocial: "",
          email: "",
          endereco: {
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            codigoPostal: "",
            informacoesAdicionais: "",
          },
          telefones: [
            {
              numero: "",
              ddd: "",
            },
          ],
        });
      })
      .catch(() => {
        alert("Erro ao cadastrar cliente. Tente novamente mais tarde.");
      });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <InputField
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          error={errors.nome}
          placeholder="Nome"
        />
        <InputField
          name="nomeSocial"
          value={formData.nomeSocial}
          onChange={handleInputChange}
          placeholder="Nome Social (Opcional)"
        />
        <InputField
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="E-mail"
          type="email"
        />
        <MaskedInputField
          name="telefones.numero"
          value={formData.telefones[0].numero}
          onChange={handleInputChange}
          error={errors["telefones.numero"]}
          placeholder="Telefone"
          mask="99999-9999"
        />
        <MaskedInputField
          name="telefones.ddd"
          value={formData.telefones[0].ddd}
          onChange={handleInputChange}
          placeholder="DDD"
          mask="99"
        />
        <InputField
          name="endereco.estado"
          value={formData.endereco.estado}
          onChange={handleInputChange}
          error={errors["endereco.estado"]}
          placeholder="Estado"
        />
        <InputField
          name="endereco.cidade"
          value={formData.endereco.cidade}
          onChange={handleInputChange}
          placeholder="Cidade"
        />
        <InputField
          name="endereco.bairro"
          value={formData.endereco.bairro}
          onChange={handleInputChange}
          placeholder="Bairro"
        />
        <InputField
          name="endereco.rua"
          value={formData.endereco.rua}
          onChange={handleInputChange}
          placeholder="Rua"
        />
        <InputField
          name="endereco.numero"
          value={formData.endereco.numero}
          onChange={handleInputChange}
          placeholder="Número"
        />
        <MaskedInputField
          name="endereco.codigoPostal"
          value={formData.endereco.codigoPostal}
          onChange={handleInputChange}
          placeholder="Código Postal"
          mask="99999-999"
        />
        <InputField
          name="endereco.informacoesAdicionais"
          value={formData.endereco.informacoesAdicionais}
          onChange={handleInputChange}
          placeholder="Informações adicionais (Opcional)"
        />
        <button type="submit" className="btn btn-primary" style={{ marginLeft: "35%",marginTop: "40px",marginBottom: "40px", backgroundColor:'gray', borderColor:'gray', width:'20%' }}>Cadastrar Cliente</button>
      </form>
    </div>
  );
}
