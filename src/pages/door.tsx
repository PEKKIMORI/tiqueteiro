/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '../css/door.css';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useCallback, useRef, useEffect } from 'react';

function Door () {
  const { showErrorMessage, handleSuccess, handleError } = useAuth();

  const refAnimationInstance = useRef<any>(null);
  const animationFrameId = useRef<number | null>(null);

  const onInit = useCallback(({ confetti }: { confetti: any }) => {
    refAnimationInstance.current = confetti;

    const frame = () => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current({
                particleCount: 1,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            refAnimationInstance.current({
                particleCount: 1,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });
        }

        animationFrameId.current = requestAnimationFrame(frame);
    };

    frame();
  }, []);

  useEffect(() => {
      return () => {
          if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
          }
      }
  }, []);

	return(
    <div>
        <ReactCanvasConfetti
            onInit={onInit}
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: -1
            }}
        />
		<h1 className="welcome">Bem-vindo à nossa Festa Junina!</h1>
      <div className="info-section">
        <div className="info-card">
          <p>
            Este website foi criado para gerenciar a venda de ingressos para a <strong>Festa Junina da ETEC Presidente Vargas</strong>, que acontecerá no dia <strong>24/06</strong>.
          </p>
          <ul>
            <li>Alunos da ETEC têm entrada gratuita.</li>
            <li>Cada aluno pode convidar até duas pessoas.</li>
            <li>Os ingressos para convidados devem ser adquiridos em nome do aluno.</li>
          </ul>
        </div>

        <div className="info-card alert">
          <b>VENDAS ENCERRADAS!</b>
          <p>Os ingressos em PDF serão enviados para o e-mail cadastrado em até 24 horas.</p>
        </div>

        <div className="info-card contact">
          <p><strong>Dúvidas ou problemas?</strong> Entre em contato:</p>
          <span>+55 11 94821-0236</span>
          <span>+55 11 94175-6408</span>
        </div>
      </div>
      <p className="tip">Obrigado e boa festa!</p>
      <div className="auth-container">
        <div className="form-container">
            <LoginForm onLoginSuccess={() => { }} onLoginError={handleError} />
        </div>
        <div className="form-container">
            <RegisterForm onRegisterSuccess={handleSuccess} onRegisterError={handleError} />
        </div>
        {showErrorMessage && <p className="error">Ocorreu um erro. Tente novamente.</p>}
      </div>
    </div>
  );
}

export default Door
