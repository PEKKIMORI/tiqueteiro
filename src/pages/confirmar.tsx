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
      <button className="botchola" onClick={handleConfirmEmail}>Confirmar E-mail!</button>
      {confirmationStatus && <p>{confirmationStatus}</p>}
      <button className="botchola" onClick={() => navigate('/')}>Voltar para login..</button>
    </div>
  );
};

export default ConfirmEmail;