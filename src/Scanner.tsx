import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import authService from "./services/authService";
import "./css/scanner.css"
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

function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [rm, setRm] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [erro, setErro] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 700,
          height: 700,
        },
        fps: 5,
      },
      true
    );

    scanner.render(success, error);

    function success(result: string) {
      scanner.clear();
      setScanResult(result);
      scanTicket(result); // Chama a função scanTicket passando o resultado da leitura do QR
    }

    function error(err: any) {
      console.warn(err);
    }
  }, []);

  async function scanTicket(code: string) {
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

      const response = await authService.scan(code, config);
      if (response.status === 201) {
        setTicket(response.data.ticket);
        setRm(response.data.rm);
        setErro(false);
        setError(undefined);
      } else if ( response.status === 400) {
        console.log("Ocorreu um erro:", response.data.message);
        setErro(true);
        setError(response.data.message);
      }
    } catch (error: any) {
      console.log("Ocorreu um erro:", error.message);
    }
  }

  return (
    <div>
      {scanResult ? (
        <div>
          {ticket && !erro ? (
            <div>
              <p>Ticket aprovado!!</p>
              <p>Nome do convidado: {ticket.buyerName}</p>
              <p>Nome do aluno: {ticket.sellerName}</p>
              <p>RM do aluno: {rm}</p>
            </div>
          ) : (
            <div><p>{error}</p></div>
          )}
          {ticket && erro ? (
            <div>
              <p>{error}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
