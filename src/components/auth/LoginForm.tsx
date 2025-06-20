import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onLoginError: () => void;
}

function LoginForm({ onLoginSuccess, onLoginError }: LoginFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    try {
      const { status } = await authService.login(params);

      if (status === 200) {
        navigate("/room");
        onLoginSuccess();
      } else {
        onLoginError();
      }
    } catch (error) {
      onLoginError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <h2>Bem-vindo de volta!</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">
            Email
          </label>
          <input 
            type="email" 
            name="email" 
            className="form-input"
            placeholder="seu@email.com"
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Senha
          </label>
          <input 
            type="password" 
            name="password" 
            className="form-input"
            placeholder="••••••••"
            required 
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary submit-btn" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              <span>Entrando...</span>
            </>
          ) : (
            <>
              <span>Entrar</span>
              <span>🚀</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
