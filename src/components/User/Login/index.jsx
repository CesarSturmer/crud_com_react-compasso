import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "components/Store/Context";
//import { Spinner } from "react-bootstrap";


import "./Login.css";

import api from "service/api";

function initialState() {
  
  return { user: "", password: "" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(StoreContext);
  const history = useHistory();


  async function onSubmit(event) {
    event.preventDefault();
   
  

    await api
      .post("/autenticacao", {
        usuario: username,
        senha: password,
      })
      .then((res) => {
        setToken(res.data.token);
        history.push("/users");
      })
      .catch(() => {        
        alert('Usuário e senha não correspondem')
        setValues(initialState)
       
      });
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Login Sistema</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            placeholder="usuário"
            type="text"
            name="user"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            placeholder="senha"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="user-login__submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
