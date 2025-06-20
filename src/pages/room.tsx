import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../css/room.css'

export default function Room() {
  const navigate = useNavigate();
  interface Ticket {
    id: number;
    sellerName: string;
    buyerName: string | null;
    code: string;
    used: boolean;
    price: number;
    purchaseDate?: Date | null;
    apiTransactionId?: string | null;
    userId: number;
  }

  interface User { 
    id: number;
    name: string
    email: string
    password: string
    rm: number
    role: 'admin' | 'user'
    emailToken: string | null
    expireToken?: Date | null
    confirmedEmail?: boolean
  }

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

   const handlePayment = async (ticketCode: string) => {
    const token = sessionStorage.getItem('onebitflix-token');
    if (user && token) {
      const params = {
        payerName: user.name,
        payerEmail: user.email,
        payerCPF: "12345678900",
        ticketCode: ticketCode,
      };

      const res = await authService.createPayment(params, token);
      
      if (res && res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } else {
      console.error("Usuário não logado ou token não encontrado. Não é possível criar pagamento.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('onebitflix-token');
    navigate('/');
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await authService.getTickets(token);
        if (response.status === 200) {
          setTickets(response.data.tickets || []);
        }
      } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
      } finally {
        setLoading(false);
      }
    };

    const findUser = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      if(token) {
        try {
          const res = await authService.findUser(token)
          const user = res.data
          if (res.status === 200) {
            setUser(user)
          }
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      }
    }

    findUser()
    fetchTickets();
  }, [navigate]);

  if (loading) {
    return (
      <div className="room-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando seus ingressos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="room-page junina-pattern">
      {/* Header */}
      <header className="room-header">
        <div className="container">
          <div className="header-content">
            <button className="btn btn-outline logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="room-main">
        <div className="container">
          <div className="page-header">
            <h1 className="gradient-text">Seus Ingressos</h1>
            <p className="page-subtitle">
              Festa Junina ETEC Presidente Vargas - 24 de Junho, 2025
            </p>
          </div>

          {/* Status Card */}
          <div className="status-card card-glass">
            <div className="status-icon">⚠️</div>
            <div className="status-content">
              <h3>Vendas Encerradas</h3>
              <p>Os códigos abaixo são para quem já comprou e precisa efetuar o pagamento. Os ingressos em PDF serão enviados para o seu e-mail após a confirmação do pagamento.</p>
            </div>
          </div>

          {/* Tickets Grid */}
          <div className="tickets-section">
            <h2>Ingressos Disponíveis</h2>
            {tickets.length > 0 ? (
              <div className="tickets-grid">
                {tickets.map((ticket, index) => (
                  <div className="ticket-card card" key={ticket.id}>
                    <div className="ticket-header">
                      <div className="ticket-icon">🎫</div>
                      <div className="ticket-number">#{String(index + 1).padStart(3, '0')}</div>
                    </div>
                    
                    <div className="ticket-content">
                      <h3>Ingresso Festa Junina</h3>
                      <div className="ticket-details">
                        <div className="detail-item">
                          <span className="label">Vendedor:</span>
                          <span className="value">{ticket.sellerName}</span>
                        </div>
                        {ticket.buyerName && (
                          <div className="detail-item">
                            <span className="label">Comprador:</span>
                            <span className="value">{ticket.buyerName}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="label">Código:</span>
                          <span className="value code">{ticket.code}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-footer">
                      <div className="price-tag">
                        <span className="currency">R$</span>
                        <span className="amount">{ticket.price.toFixed(2)}</span>
                      </div>
                      <button 
                        className="btn btn-primary pay-btn" 
                        onClick={() => handlePayment(ticket.code)}
                      >
                        <span>Pagar Agora</span>
                        <span className="btn-icon">💳</span>
                      </button>
                    </div>

                    <div className="ticket-pattern">
                      <div className="pattern-line"></div>
                      <div className="pattern-line"></div>
                      <div className="pattern-line"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎪</div>
                <h3>Nenhum ingresso encontrado</h3>
                <p>Você não possui ingressos para efetuar pagamento no momento.</p>
                <button className="btn btn-outline" onClick={() => navigate('/')}>
                  Voltar ao Início
                </button>
              </div>
            )}
          </div>

          {/* Admin Controls */}
          {user?.role === 'admin' && (
            <div className="admin-section">
              <h2>Painel Administrativo</h2>
              <div className="admin-grid">
                <button 
                  className="admin-card card" 
                  onClick={() => navigate('/adm')}
                >
                  <div className="admin-icon">📱</div>
                  <h3>Scanner de Ingressos</h3>
                  <p>Escaneie QR codes na entrada do evento</p>
                </button>
                
                <button 
                  className="admin-card card" 
                  onClick={() => navigate('/validar')}
                >
                  <div className="admin-icon">✅</div>
                  <h3>Validar Ingresso</h3>
                  <p>Validação manual de códigos de ingresso</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="room-footer">
        <div className="container">
          <div className="footer-content">
            <p>Dúvidas? Entre em contato conosco:</p>
            <div className="contact-links">
              <a href="tel:+5511948210236" className="contact-link">
                📱 +55 11 94821-0236
              </a>
              <a href="tel:+5511941756408" className="contact-link">
                📱 +55 11 94175-6408
              </a>
            </div>
          </div>
        </div>      </footer>
    </div>
  );
}
