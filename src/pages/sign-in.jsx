import React from "react";
import { Logo, LoginForm } from "components";
import { useAuth } from "hooks";
import "styles/signin.css";

function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  } = useAuth();

  return (
    <div className="signin-container">
      <div className="logo-section">
        <Logo />
      </div>
      <div className="form-section">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          loading={loading}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
}

export default SignIn;
