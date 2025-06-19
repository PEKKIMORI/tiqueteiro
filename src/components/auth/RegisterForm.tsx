import { FormEvent, useState } from 'react';
import authService from '../../services/authService';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  onRegisterError: () => void;
}

function RegisterForm({ onRegisterSuccess, onRegisterError }: RegisterFormProps) {
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")!.toString();
    const email = formData.get("email")!.toString();
    const rm = formData.get("rm")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();

    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }
    setPasswordMismatchError(false);

    const params = { name, email, rm, password };
    const res = await authService.register(params);

    if (res.status === 201) {
      onRegisterSuccess();
    } else {
      onRegisterError();
    }
  };

  return (
    <div className="sub-cont">
      <div className="form">
        <h2>Criar conta</h2>
        <form onSubmit={handleRegister}>
          <label>
            <span>Nome</span>
            <input type="text" name="name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>RM</span>
            <input type="text" name="rm" required />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" name="password" required />
          </label>
          <label>
            <span>Confirmar Senha</span>
            <input type="password" name="confirmPassword" required />
          </label>
          {passwordMismatchError && <p className="error">As senhas não conferem</p>}
          <button type="submit" className="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
