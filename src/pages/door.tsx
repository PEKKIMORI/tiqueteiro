/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/door.css';
import authService from '../services/authService';

function Door () {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')!.toString();
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();
    const rm = formData.get('rm')!.toString();
    const confirmPassword = formData.get('confirmPassword')!.toString()

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const params = { name, email, password, rm };

    try {
      const { data, status } = await authService.register(params)
      if (status === 201) {
        setShowSuccessMessage(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      navigate("/room");
    }
  };

  const handleClick = () => {
    const contElement = document.querySelector('.cont');
    if (contElement instanceof HTMLElement) {
      contElement.classList.toggle('s--signup');
    }
  };

	return(
    <div>
		<h1 className="welcome">Oi! Seja bem-vindo :D</h1>
      <p className="info">
        Esse site foi desenolvido para a compra controlada de ingressos para a Festa Junina na ETEC Presidente Vargas,
        que ocorrerá no dia 24/06.
        <br />
        <br />
        Primeiramente: os alunos não pagam a entrada.
        <br />
        Cada aluno tem o direito de convidar até duas pessoas, que comprarão o ingresso em seu nome.
        <br />
        A compra do ingresso será feita através do PIX do grêmio: (11) 99934-3712.
        <br />
        <br />
        Para fazer a compra, antes o aluno deve criar uma conta, depois, o aluno deve realizar o pagamento no pix e deixar na mensagem: o código do seu ticket, o nome do seu convidado, e o email para ser enviado o ingresso digital.
        <br />
        <br />
        Contatos: (Caso tenham algum problema)
        <br />
        +55 11 94821-0236
        <br />
        +55 11 94175-6408
      
      </p>
      <p className="tip">OBRIGADO!</p>
      <div className="cont">
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
            <p className="forgot-pass">Não oferecemos meios de recuperar sua senha!</p>
            <button type="submit" className="submit">
              LOGIN
            </button>
          </form>
          
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>Sem conta?</h2>
              <p>Crie uma conta agora para comprar seus ingressos para a Festa Junina da ETEC Presidente Vargas!</p>
            </div>
            <div className="img__text m--in">
            <h2>É rápido!</h2>
            <p>Por favor, forneça seus dados! Após fazer o registro é só entrar e fazer a compra dos ingressos! <br/> ^ -^)</p>
            </div>
            <div className="img__btn" onClick={handleClick}>
              <span className="m--up">CRIAR</span>
              <span className="m--in">ENTRAR</span>
            </div>
          </div>
          <div className="form sign-up">
            <form onSubmit={handleRegister}>
              <label className="labela">
                <span>Nome Completo</span>
                <input type="text" name="name" required minLength={6} maxLength={60} />
              </label>
              <label>
                <span>Email Institucional</span>
                <input type="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@etec\.sp\.gov\.br$" />
              </label>
              <label>
                <span>RM</span>
                <input type="text" name="rm" required pattern="[0-9]{6}" />
              </label>
              <label>
                <span>Senha</span>
                <input type="password" name="password" required minLength={5} />
              </label>
              <label>
                <span>Confirmar Senha</span>
                <input type="password" name="confirmPassword"/>
              </label>
              <button type="submit" className="submit">
                CRIAR
              </button>
            </form>
            {showSuccessMessage && <p>Email de confirmação enviado. Verifique o lixo eletrônico!</p>}
          </div>
        </div>
      </div>

      <a href="https://github.com/PEKKIMORI" target="_blank" rel="noopener noreferrer" className="icon-link">
        <img
          src="https://cdn.discordapp.com/attachments/885280158704074884/1110750111774019724/icons8-waffle-58_1.png"
          alt="GitHub"
        />
      </a>
      <a href="https://github.com/c0ffex" target="_blank" rel="noopener noreferrer" className="icon-link icon-link--twitter">
        <img
          src="https://cdn.discordapp.com/attachments/885280158704074884/1110754271504388147/icons8-cup-64.png"
          alt="Twitter"
        />
      </a>
    </div>
  );
}

export default Door
