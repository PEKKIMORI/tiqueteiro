import { FormEvent, useState } from 'react';
import authService from '../../services/authService';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  onRegisterError: () => void;
}

function RegisterForm({ onRegisterSuccess, onRegisterError }: RegisterFormProps) {
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")!.toString();
    const email = formData.get("email")!.toString();
    const rm = formData.get("rm")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();

    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      setIsLoading(false);
      return;
    }
    setPasswordMismatchError(false);

    try {
      const params = { name, email, rm, password };
      const res = await authService.register(params);

      if (res.status === 201) {
        onRegisterSuccess();
      } else {
        onRegisterError();
      }
    } catch (error) {
      onRegisterError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <h2>Crie sua conta</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="form-label">
            Nome completo
          </label>
          <input 
            type="text" 
            name="name" 
            className="form-input"
            placeholder="Seu nome completo"
            required 
          />
        </div>
        
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
            RM (Registro do Aluno)
          </label>
          <input 
            type="text" 
            name="rm" 
            className="form-input"
            placeholder="Seu RM da ETEC"
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
        
        <div className="form-group">
          <label className="form-label">
            Confirmar senha
          </label>
          <input 
            type="password" 
            name="confirmPassword" 
            className="form-input"
            placeholder="••••••••"
            required 
          />
        </div>
        
        {passwordMismatchError && (
          <div className="error-message">
            <span>❌</span>
            <p>As senhas não conferem</p>
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-secondary submit-btn" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              <span>Criando conta...</span>
            </>
          ) : (
            <>
              <span>Criar conta</span>
              <span>🎉</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
