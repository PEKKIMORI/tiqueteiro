import { useEffect, useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function TicketValidation() {
  const navigate = useNavigate();

  const [payerEmail, setPayerEmail] = useState<string>("");
  const [payerName, setPayerName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [validationResult, setValidationResult] = useState("");

  useEffect(() => {
    const checkUserRole = async () => {
      const token = sessionStorage.getItem("onebitflix-token");
      if (token) {
        try {
          const response = await authService.findUser(token);
          if (response.data.role === "user") {
            navigate("/room");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/");
      }
    };

    checkUserRole();
  }, [navigate]);

  const handleValidation = async (event: React.FormEvent) => {
    event.preventDefault();
    const params = { payerName, payerEmail, code };
  
    try {
      const token = sessionStorage.getItem("onebitflix-token");
      if (!token) {
        // Tratar caso não exista token
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data, status } = await authService.validate(params, config);
      if (status === 201) {
        setValidationResult("O código foi validado.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className= "cont">
		  <h1 className="welcome">Oi! Seja bem-vindo :D</h1>
      <form onSubmit={handleValidation}>
        <div>
          <label htmlFor="payerEmail">E-mail a ser enviado o Ticket:</label>
          <input
            type="email"
            id="payerEmail"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="payerName">Nome do Convidado</label>
          <input
            type="text"
            id="payerName"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Código copiado:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button className="botchola" type="submit">Validate Ticket</button>
      </form>
      {validationResult && <p>{validationResult}</p>}
    </div>
  );
}
