import React from "react";
import PropTypes from "prop-types";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
  handleLogin,
}) {
  return (
    <div className="login-form-container">
      <div className="login-form-content">
        <h2>Acesso ao Sistema</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email-input">
              E-mail
              <input
                id="email-input"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password-input">
              Senha
              <input
                id="password-input"
                name="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  error: "",
  loading: false,
};
