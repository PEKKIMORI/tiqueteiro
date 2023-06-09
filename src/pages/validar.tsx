import { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function TicketValidation() {
  const navigate = useNavigate()

  const [payerEmail, setPayerEmail] = useState<string>('');
  const [payerName, setPayerName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [validationResult, setValidationResult] = useState('');

  const handleValidation = async (event: React.FormEvent) => {
    event.preventDefault();
    const params = { payerName, payerEmail, code };
    
    try {
      const token = sessionStorage.getItem('onebitflix-token');
      const res = await authService.findUser(token!)
      if(res.data.role === 'user') {
        navigate('/room')
      }

      console.log(params)
      const { data, status } = await authService.validate(params)
      if (status === 201) {
        setValidationResult('O codigo foi validado');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(code)
  };

  return (
    <div>
      <h1>Ticket Validation</h1>
      <form onSubmit={handleValidation}>
        <div>
          <label htmlFor="payerEmail">payerEmail:</label>
          <input
            type="payerEmail"
            id="payerEmail"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="payerName">payerName:</label>
          <input
            type="text"
            id="payerName"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Validate Ticket</button>
      </form>
      {validationResult && <p>{validationResult}</p>}
    </div>
  );
}