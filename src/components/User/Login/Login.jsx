import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "components/Store/Context";
import UIButton from "components/UI/Button/Button";

import "./Login.css";

import api from "service/api";

function initialState() {
  return { user: "", password: "" };
}

const UserLogin = () => {
  const [setValues] = useState(initialState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
        console.log(res.data.token);

        history.push("/users");
      })
      .catch(() => {
        setError(error);
        setValues(initialState);
      });
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
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
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && <div className="user-login__error">{error}</div>}
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
