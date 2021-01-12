import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import api from "service/api";
import { useHistory, useParams } from "react-router-dom";
import "./Register.css";

const PagesUsers = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [contType, setContType] = useState("");

  async function updateUser(id) {
    const response = await api.get(`/usuarios/${id}`);
    setName(response.data.nome);
    setPassword(response.data.senha);
    setUser(response.data.usuario);
    setEmail(response.data.email);
    setAge(response.data.idade);
    setGender(response.data.sexo);
    setBirth(response.data.dataNascimento);
    setPhone(response.data.telefone);
    setContType(response.data.perfilId);
  }

  useEffect(() => {
    if (id !== undefined) {
      updateUser(id);
    }
  }, [id]);

  const token = localStorage.getItem("token");

  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (id !== undefined) {
      await api
        .put(
          `usuarios/${id}`,
          {
            dataNascimento: birth,
            email: email,
            idade: age,
            nome: name,
            sexo: gender,
            telefone: phone,
            perfilId: contType,
          },
          header
        )
        .then(() => {
          setTimeout(() => history.push("/users"), 2000);
        })
        .catch(() => alert("Não foi possível atualizar o cadastro"));
    } else {
      await api
        .post(
          "/usuarios",
          {
            dataNascimento: birth,
            email: email,
            idade: age,
            nome: name,
            perfilId: contType,
            senha: password,
            sexo: gender,
            telefone: phone,
            usuario: user,
          },
          header
        )
        .then(() => {
          alert("Usuário cadastrado  com sucesso");
          setTimeout(() => history.push("/users"), 2000);
        })
        .catch(() => {
          alert("Não foi possível adicionar o usuário");
        });
    }
  }

  return (
    <Container fluid="md">
      <br />
      <Form onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label className="form-label">Nome</Form.Label>
            <Form.Control
              placeholder="Nome"
              required
              type="text"
              name="nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="form-label">Senha</Form.Label>
            <Form.Control
              placeholder="senha"
              required
              type="password"
              name="senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
        </Form.Row>

        <br />

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label className="form-label">Usuário</Form.Label>
            <Form.Control
              name="usuario"
              required
              placeholder="usuário"
              type="text"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="form-label">Peril Usuário</Form.Label>
            <Form.Control
              as="select"
              name="perfilId"
              required
              placeholder="Perfil usuário"
              value={contType}
              onChange={(e) => setContType(e.target.value)}
            >              
              <option value={1}>aluno </option>
              <option value={2}>admin </option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <br />
        <Form.Row>
        <Form.Group as={Col}>
        <Form.Label className="form-label">Idade</Form.Label>
            <Form.Control
              placeholder="idade"
              type="number"
              required
              name="idade"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
           </Form.Group>
           <Form.Group as={Col}>
           <Form.Label className="form-label">Sexo</Form.Label>
            <Form.Control
              as="select"
              required
              name="sexo"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option>Sexo</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </Form.Control>
            </Form.Group>
        </Form.Row>
        <br />
        <Form.Row>
        <Form.Group as={Col}>
        <Form.Label className="form-label">Data de Nascimento</Form.Label>
            <Form.Control
              placeholder="DD/MM/AAAA"
              type="text"
              name="dataNascimento"
              onChange={(e) => setBirth(e.target.value)}
              value={birth}
            />
           </Form.Group>
           <Form.Group as={Col}>
           <Form.Label className="form-label">Telefone</Form.Label>
            <Form.Control
              placeholder="telefone"
              type="number"
              name="telefone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
         </Form.Group>
        </Form.Row>
        <br />
        <Form.Row>
        <Form.Group as={Col}>
        <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              placeholder="email@email.com"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            </Form.Group>
        </Form.Row>

        <div className="nav-buttons">
          <Button
            type="submit"
            variant="success"
            size="lg"
            className="nav-buttons__action"
          >
            Salvar
          </Button>
          <Button
            onClick={() => history.goBack()}
            type="submit"
            variant="danger"
            size="lg"
            className="nav-buttons__action"
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default PagesUsers;
