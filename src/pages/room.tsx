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

  useEffect(() => {
    const fetchTickets = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      if (!token) {
        navigate('/');
        return;
      }
      const response = await authService.getTickets(token);
      if (response.status === 200) {
        setTickets(response.data.tickets || []);
      }
    };

    const findUser = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      if(token) {
        const res = await authService.findUser(token)
        const user = res.data
        if (res.status === 200) {
          setUser(user)
        }
      }
    }

    findUser()
    fetchTickets();
  }, [navigate]);

  return (
    <div className="room-container">
      <div className="room-header">
        <h1>Ingressos para a Festa Junina</h1>
        <p>
          As vendas estão encerradas. Os códigos abaixo são para quem já comprou e precisa efetuar o pagamento.
        </p>
      </div>

      <div className="tickets-grid">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <p className="price">R$ {ticket.price.toFixed(2)}</p>
              <button className="buy-button" onClick={() => handlePayment(ticket.code)}>
                Pagar
              </button>
            </div>
          ))
        ) : (
          <p className="no-tickets">Nenhum ingresso encontrado.</p>
        )}
      </div>

      {user?.role === 'admin' && (
        <div className="admin-buttons">
          <button className="admin-button" onClick={() => navigate('/adm')}>Scanner</button>
          <button className="admin-button" onClick={() => navigate('/validar')}>Validar</button>
        </div>
      )}
    </div>
  );
}
