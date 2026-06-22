import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <div>
      <h1>MonoLog</h1>
      {mode === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}

      <button
        onClick={() =>
          setMode(mode === "login" ? "register" : "login")
        }
      >
        {mode === "login"
          ? "Create Workspace"
          : "Already have an account?"}
      </button>
    </div>
  )
}

export default AuthPage