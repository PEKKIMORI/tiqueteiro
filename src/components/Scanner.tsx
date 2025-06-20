import { useState } from "react";
import QrReader from "react-qr-scanner";
import authService from "../services/authService";
import { AxiosError } from "axios";
import "../css/scanner.css";

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

  const handleScan = async (data: { text: string } | null) => {
    if (!data) return;

    setScanResult(data.text);

    try {
      const token = sessionStorage.getItem("onebitflix-token");
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await authService.scan(data.text, config);

      if (response.status === 201) {
        setTicket(response.data.ticket);
        setRm(response.data.rm);
        setErro(false);
        setError(undefined);
      } else {
        throw new Error(response.data.message || "Erro ao validar ticket.");
      }
    } catch (error) {
      let errorMessage = "Ocorreu um erro inesperado.";
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || "Ocorreu um erro na requisição.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErro(true);
      setError(errorMessage);
      setTicket(null);
      setRm(null);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setTicket(null);
    setRm(null);
    setErro(false);
    setError(undefined);
  };

  return (
    <div>
      {scanResult ? (
        <div className="scan-result">
          {erro ? (
            <div>
              <p style={{ color: "black" }}>{error}</p>
            </div>
          ) : (
            ticket && (
              <div>
                <p style={{ color: "black" }}>Ticket aprovado!!</p>
                <p style={{ color: "black" }}>
                  Nome do convidado: {ticket.buyerName}
                </p>
                <p style={{ color: "black" }}>Nome do aluno: {ticket.sellerName}</p>
              </div>
            )
          )}
          <button onClick={resetScan} className="scan-again-button">
            Escanear Novamente
          </button>
        </div>
      ) : (
        <QrReader
          delay={300}
          onError={console.error}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

export default Scanner;
