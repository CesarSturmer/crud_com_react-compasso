import React, { useState, useEffect } from "react";
import api from "service/api";
import { Badge, Button, Table, Nav, Container } from "react-bootstrap";
import "./ListUser.css";
import { useHistory } from "react-router-dom";

const ListUser = () => {
  const [user, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleList();
  }, []);

  async function handleList() {
    await api.get("/usuarios").then((response) => {
      setUser(response.data.content);
    });
  }

  function createUser() {
    history.push("/register");
  }

  

  return (
    <Container fluid="md">
      <Nav className="justify-content-end">
        <Button
          variant="dark"
          size="sm"
          className="nav-button"
          onClick={createUser}
        >
          Cadastrar
        </Button>
        <Button variant="dark" size="sm" className="nav-button">
          Sair
        </Button>
      </Nav>

      <Table striped bordered hover variant="dark" className="text-center">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Telefone</th>
            <th>Nascimento</th>
            <th>E-mail</th>
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr>
              <td>{user.nome}</td>
              <td>{user.usuario}</td>
              <td>{user.telefone}</td>
              <td>{user.dataNascimento}</td>
              <td>{user.email}</td>
              <td>{user.perfilTipo}</td>
            </tr>
          ))}

          <tr>
            <td>{}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ListUser;
