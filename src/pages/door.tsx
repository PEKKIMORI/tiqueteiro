/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '../css/door.css';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useCallback, useRef, useEffect, useState } from 'react';

function Door () {
  const { showErrorMessage, handleSuccess, handleError } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const authSectionRef = useRef<HTMLElement>(null);

  const refAnimationInstance = useRef<any>(null);
  const animationFrameId = useRef<number | null>(null);

  const onInit = useCallback(({ confetti }: { confetti: any }) => {
    refAnimationInstance.current = confetti;

    const frame = () => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current({
                particleCount: 2,
                angle: -90,
                spread: 180,
                origin: { x: Math.random(), y: -0.1 },
                colors: ['#FFC300', '#FF8C00', '#FF69B4', '#00A0A0'],
                gravity: 0.3,
                scalar: 0.8
            });
        }

        if (Math.random() > 0.7) {
          animationFrameId.current = requestAnimationFrame(frame);
        } else {
          setTimeout(() => {
            animationFrameId.current = requestAnimationFrame(frame);
          }, 100 + Math.random() * 400);
        }
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

  const handleGoToRegister = () => {
    setActiveTab('register');
    authSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

	return(
    <div className="door-page junina-pattern">
        <ReactCanvasConfetti
            onInit={onInit}
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 1
            }}
        />
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="floating-elements">
              <div className="float-item bandeirinha">🚩</div>
              <div className="float-item milho">🌽</div>
              <div className="float-item fogueira">🔥</div>
              <div className="float-item balao">🎈</div>
            </div>
            <div className="hero-badge">
              <span>🎪 FESTA JUNINA 2025</span>
            </div>
            <h1 className="hero-title gradient-text">
              Festa Junina!<br />
              <span className="highlight">Inesquecível</span>
            </h1>
            <p className="hero-subtitle">
              Junte-se a nós para a MAIOR e MELHOR festa junina da ETEC Presidente Vargas.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary hero-btn" onClick={handleGoToRegister}>
                Garantir Meu Ingresso
                <span className="btn-icon">🎫</span>
              </button>
            </div>
          </div>
        </section>        {/* Event Info Section */}
        <section className="info-section">
          <div className="info-container">
            <div className="info-grid">
              <div className="info-card card-glass">
                <div className="info-icon">📅</div>
                <h3>Quando</h3>
                <p><strong>24 de Junho, 2025</strong></p>
                <p>A partir das 19:00h</p>
              </div>

              <div className="info-card card-glass highlight-card">
                <div className="info-icon">🎓</div>
                <h3>Para Alunos ETEC</h3>
                <div className="free-badge">GRATUITO</div>
                <ul>
                  <li>✓ Entrada gratuita para alunos</li>
                  <li>✓ Convide até 2 pessoas</li>
                  <li>✓ Ingressos em seu nome</li>
                </ul>
              </div>

              <div className="info-card card-glass">
                <div className="info-icon">🎵</div>
                <h3>O que esperar</h3>
                <ul>
                  <li>🍔 Comidas típicas deliciosas</li>
                  <li>🎪 Quadrilha tradicional</li>
                  <li>🎮 Jogos e brincadeiras</li>
                  <li>🎤 Apresentações musicais</li>
                </ul>
              </div>
            </div>

            <div className="alert-card card-glass">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <h3>Vendas Encerradas!</h3>
                <p>Os ingressos em PDF serão enviados para o e-mail cadastrado em até 24 horas após a confirmação.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Auth Section */}
        <section className="auth-section" ref={authSectionRef}>
          <div className="auth-wrapper">
            <div className="auth-container">
              <div className="auth-header">
                <h2>Acesse sua conta</h2>
                <p>Entre ou cadastre-se para gerenciar seus ingressos</p>
              </div>

              <div className="auth-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Entrar
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  Cadastrar
                </button>
              </div>

              <div className="auth-forms">
                <div className={`form-container ${activeTab === 'login' ? 'active' : ''}`}>
                  <LoginForm onLoginSuccess={() => { }} onLoginError={handleError} />
                </div>
                <div className={`form-container ${activeTab === 'register' ? 'active' : ''}`}>
                  <RegisterForm onRegisterSuccess={handleSuccess} onRegisterError={handleError} />
                </div>
              </div>

              {showErrorMessage && (
                <div className="error-message">
                  <span>❌</span>
                  <p>Ocorreu um erro. Tente novamente.</p>
                </div>
              )}
            </div>
          </div>
        </section>        {/* Footer */}
        <footer className="footer">
          <div className="footer-wrapper">
            <p className="footer-text">
              Feito com ❤️ para a melhor Festa Junina das ETECs
            </p>
          </div>
        </footer>
    </div>
  );
}

export default Door
