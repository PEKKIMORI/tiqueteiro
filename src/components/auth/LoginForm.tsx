import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onLoginError: () => void;
}

function LoginForm({ onLoginSuccess, onLoginError }: LoginFormProps) {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      navigate("/room");
      onLoginSuccess();
    } else {
      onLoginError();
    }
  };

  return (
    <div className="form sign-in">
      <h2>Faça o login abaixo :)</h2>
      <form onSubmit={handleLogin}>
        <label>
          <span>Email</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" name="password" required />
        </label>
        <button type="submit" className="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
