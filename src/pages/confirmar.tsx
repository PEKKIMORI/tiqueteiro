import  { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/room.css'

const ConfirmEmail = () => {
  const navigate = useNavigate()
  const [confirmationStatus, setConfirmationStatus] = useState('');
  const { token } = useParams()
  const handleConfirmEmail = async () => {
    try {
      const response = await axios.get(`https://tiqueteiro-etec.shop:3000/confirmar-email/${token}`);
      if (response.status === 200) {
        setConfirmationStatus('Email confirmado com sucesso!');
      } else {
        setConfirmationStatus('Erro ao confirmar o email.');
      }
    } catch (error) {
      console.log(error);
      setConfirmationStatus('Erro ao confirmar o email.');
    }
  };

  return (
    <div>
      <div className="pog2">:D</div>
      <button className="button-27" role="button" onClick={() => navigate('/')}>Voltar para login..</button>
      <button className="button-27" role="button" onClick={handleConfirmEmail}>Confirmar E-mail!</button>
      {confirmationStatus && <p>{confirmationStatus}</p>}
    </div>
  );
};

export default ConfirmEmail;