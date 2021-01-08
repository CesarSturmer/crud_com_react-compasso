import React, { useState, useContext } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import api from "service/api";
import StoreContext from "../../components/Store/Context";
import { useHistory } from "react-router-dom";


const PagesUsers = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [contType, setContType] = useState("");
  const { token } = useContext(StoreContext);
  const history = useHistory();


  async function onSubmit(e) {
    e.preventDefault();

    

    const header ={

        headers: {'Authorization': 'Bearer' + token}
    }
   
    await api.post('/usuarios', {
        dataNascimento: birth,
        email: email,
        idade: age,
        nome: name,
        perfilId: contType,
        senha: password,
        sexo: gender,
        telefone: phone,
      usuario: user,
    }, header).then(() => {        
       history.push("/users")
    }).catch(() => {        
      console.log(token);
     
      });  


  }

  return (
    <Container fluid="md">
      <br />
      <Form onSubmit={onSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Nome"
              type="text"
              name="nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="senha"
              type="password"
              name="senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="usuário"
              type="text"
              name="usuario"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="tipo de perfil"
              type="text"
              name="tipoPerfil"
              onChange={(e) => setContType(e.target.value)}
              value={contType}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="idade"
              type="number"
              name="idade"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="sexo"
              type="text"
              name="sexo"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="data Nascimento"
              type="text"
              name="dataNascimento"
              onChange={(e) => setBirth(e.target.value)}
              value={birth}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="telefone"
              type="number"
              name="telefone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Col>
        </Form.Row>
        <br />
        <Button variant="dark" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

export default PagesUsers;
