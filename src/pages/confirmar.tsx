import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ConfirmEmail = () => {
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
      <h1>Confirmar Email</h1>
      <button onClick={handleConfirmEmail}>Confirmar</button>
      {confirmationStatus && <p>{confirmationStatus}</p>}
    </div>
  );
};

export default ConfirmEmail;