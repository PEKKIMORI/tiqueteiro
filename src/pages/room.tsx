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
      const user = res.data
      if (res.status === 200) {
        setUser(user)
      }
      console.log(res)
    }

    findUser()
    fetchTickets();
  }, []); // O array de dependências está vazio para executar o useEffect apenas uma vez, após a montagem do componente.
  return (
    <>

      <div className="container">

        <div className={"text-box"}>
          <h1 className={"pog1"}>FESTA JUNINA</h1>
          <h1 className={"pog1"}>FESTA JUNINA</h1>
        </div>
          <p className={"pog2"}>Faça o pagamento e contamos com a sua presença <span className={"pogspan"}>:)</span></p>
        <div className={"wadawel"}> Após finalizar o pagamento, você receberá seu ingresso pelo seu e-mail, então se certifique de colocá-lo corretamente, e não se esqueça de trazer o ingresso consigo no seu celular no dia da festa! </div>

      {user?.role === 'admin' && (
      <div className="admin-buttons">
        <button onClick={() => navigate('/adm')}>Scanner</button>
        <button onClick={() => navigate('/validar')}>Validar</button>
      </div>
      )}


      {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div className="flip-card" key={ticket.id}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">{ticket.price}</p>
                  <img src="https://cdn.discordapp.com/attachments/885280158704074884/1111762811354366003/Movie-Ticket-PNG.png" alt="Ticket" />
                </div>
                <div className="flip-card-back">
                  <h1>Copiar Código:</h1>
                  <button className="grongos" onClick={() => copy(`${ticket.code}`)}>(´♡ヮ♡`)</button>
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
