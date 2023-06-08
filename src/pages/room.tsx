import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCopyToClipboard from '../Copy.tsx';
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

  const [, copy] = useCopyToClipboard();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchTickets = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      if (!token) {
        navigate('/');
        return;
      }
      const response = await authService.getTickets(token);

      if (response.status === 200) {
        setTickets(response.data.tickets);
      }
    };

    const findUser = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      const res = await authService.findUser(token!)
      const user = res.data.user
      if (res.status === 200) {
        setUser(user)
        console.log(user.id)
      }
      console.log(user?.id)
    }

    findUser()
    fetchTickets();
  }, []); // O array de dependências está vazio para executar o useEffect apenas uma vez, após a montagem do componente.
  console.log(user)
  return (
    <>
      <h1 className="fonfon">Compre já seus ingressos!</h1>
      <h3 style={{ textAlign: 'center' }}>:D</h3>
      <p style={{ margin: '3rem', textAlign: 'center' }}>Envie este link para o seu convidado, nele será realizado o pagamento do ingresso.</p>

      {user?.role === 'admin' && (  // Check if the user role is 'admin'
      <div className="admin-buttons">
        <button onClick={() => navigate('/adm')}>Scanner</button>
        <button onClick={() => navigate('/validar')}>Validar</button>
      </div>
      )}

      <div className="box">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div className="flip-card" key={ticket.id}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">{ticket.price}</p>
                  <img src="https://cdn.discordapp.com/attachments/885280158704074884/1111762811354366003/Movie-Ticket-PNG.png" alt="Ticket" />
                </div>
                <div className="flip-card-back">
                  <h1>Copiar link:</h1>
                  <button className="grongos" onClick={() => copy(`https://tiqueteiro-etec.shop:5173/pagamento/${ticket.code}`)}>(´♡ヮ♡`)</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum ticket encontrado.</p>
        )}
      </div>
    </>
  );
}
