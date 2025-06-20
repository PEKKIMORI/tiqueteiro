import { useState } from "react";
import QrReader from "react-qr-scanner";
import authService from "../services/authService";
import { AxiosError } from "axios";

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

  const handleScan = (data: any) => {
    if (data) {
      setScanResult(data.text);
      scanTicket(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

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
      } else if (response.status === 400) {
        console.log("Ocorreu um erro:", response.data.message);
        setErro(true);
        setError(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Ocorreu um erro:", error.response?.data?.message);
      } else {
        console.log("Ocorreu um erro inesperado:", error);
      }
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
            <div>
              <p>{error}</p>
            </div>
          )}
          {ticket && erro ? (
            <div>
              <p>{error}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

export default Scanner;
