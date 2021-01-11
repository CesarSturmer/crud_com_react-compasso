import React, { useState, useEffect } from "react";
import api from "service/api";
import { Button, Table, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./ListUser.css";

const ListUser = () => {
  const [user, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleList();
  }, []);

  var token = localStorage.getItem("token");
   const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function handleList() {
    await api.get("/usuarios").then((response) => {
      setUser(response.data.content);
    });
  }

  function createUser() {
    history.push("/register");
  }

  function logout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  function handleEdit(id) {
    history.push(`/register/${id}`);
  }

  async function handleDelete(id) {   
 
    await api
      .delete(`/usuarios/${id}`, config)
      .then(() => {
        alert('Usuario Deletado')
        handleList();
      })
      .catch(() => {
        alert("Não foi possível deletar o usuário");
      });
  }

  return (
    <>
      <Container>
        <Nav className="justify-content-end" id="list-nav">
          <Nav.Item>
            <Button
              variant="success"
              size="sm"
              className="nav-button"
              onClick={createUser}
            >
              Cadastrar
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              variant="danger"
              size="sm"
              className="nav-button"
              onClick={logout}
            >
              Sair
            </Button>
          </Nav.Item>
        </Nav>
      </Container>

      <br />

      <Container>
        <Table striped bordered hover variant="dark" className="text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Nascimento</th>
              <th>E-mail</th>
              <th>Perfil</th>             
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.usuario}</td>
                <td>{user.telefone}</td>
                <td>{user.dataNascimento}</td>
                <td>{user.email}</td>
                <td>{user.perfilTipo}</td>               

                <td>
                  <Button
                    className="list-button__action"
                    variant="info"
                    size="sm"
                    onClick={() => handleEdit(user.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    size="sm"
                    variant="warning"
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}

            <tr>
              <td>{}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ListUser;
