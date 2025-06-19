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
    if (user) {
      const params = {
        payerName: user.name,
        payerEmail: user.email,
        payerCPF: "12345678900", // Mock CPF for now, as it's not available in the user object.
        ticketCode: ticketCode,
      };
      const res = await authService.createPayment(params);
      if (res && res.data && res.data.url) {
        window.location.href = res.data.url;
      }
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
      console.log(response.data);
      if (response.status === 200) {
        setTickets(response.data.tickets || []);
      }
    };

    const findUser = async () => {
      const token = sessionStorage.getItem('onebitflix-token');
      if(token) {
        const res = await authService.findUser(token)
        const user = res.data
        // if(user.role !== "admin") {
        //   navigate('/')
        // }
        if (res.status === 200) {
          setUser(user)
        }
        console.log(res)
      }
    }

    findUser()
    fetchTickets();
  }, [navigate]); // O array de dependências está vazio para executar o useEffect apenas uma vez, após a montagem do componente.
  return (
    <>
    <div className="ragatanga">
    <div className="container">
        <div className={"text-box"}>
          <h1 className={"pog1"}>FESTA JUNINA</h1>
          <h1 className={"pog1"}>FESTA JUNINA</h1>
        </div>
          <p className={"pog2"}>Contamos com a sua presença <br color='red'/> VENDAS FECHADAS <span className={"pogspan"}>:0</span></p>
          <div className={"wadawel"}> Os códigos estão presentes para aqueles que esqueceram de enviá-los pelo pix anteriormente. Não podera ser feito mais compra de ingressos </div>
        </div>
      <div className="box">

      {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div className="flip-card" key={ticket.id} onClick={() => handlePayment(ticket.code)}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">{ticket.price}</p>
                  <img src="https://cdn.discordapp.com/attachments/885280158704074884/1111762811354366003/Movie-Ticket-PNG.png" alt="Ticket" />
                </div>
                <div className="flip-card-back">
                  <h1>Comprar Ingresso</h1>
                  <p>Clique em qualquer lugar do card para ser redirecionado ao pagamento.</p>
                </div>
              </div>
            </div>
          ))
      ) : (
          <p>Nenhum ticket encontrado.</p>
      )}
      </div>
    
      {user?.role === 'admin' && (
      <div className="admin-buttons">
        <button className="botchola" onClick={() => navigate('/adm')}>Scanner</button>
        <button className="botchola" onClick={() => navigate('/validar')}>Validar</button>
      </div>
      )}

      </div>
    </>
    
  );
}
