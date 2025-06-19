/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '../css/door.css';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

function Door () {
  const { showErrorMessage, handleSuccess, handleError } = useAuth();

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
        <b>AS VENDAS ESTÃO FECHADAS, OS PDFS SERÃO ENVIADOS EM ATÉ 24HORAS. CASO HAJA MAIS ALGUMA DUVIDA MANDE PARA OS CONTATOS ABAIXO!</b>
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
        <LoginForm onLoginSuccess={() => { }} onLoginError={handleError} />
        <RegisterForm onRegisterSuccess={handleSuccess} onRegisterError={handleError} />
        {showErrorMessage && <p className="error">Ocorreu um erro. Tente novamente.</p>}
      </div>
    </div>
  );
}

export default Door
