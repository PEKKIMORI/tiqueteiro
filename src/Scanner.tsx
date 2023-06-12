import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import authService from "./services/authService";

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

// interface User { 
//     id: number;
//     name: string
//     email: string
//     password: string
//     rm: number
//     role: 'admin' | 'user'
//     emailToken: string | null
//     expireToken?: Date | null
//     confirmedEmail?: boolean
//   }

function Scanner() {
  const { code } = useParams()
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [rm, setRm] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);

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
    try {
      const response = await authService.scan(code, config)
      if (response.status === 201) {
        setTicket(response.data.ticket);
        setRm(response.data.rm)
      } else {
        console.log("Ocorreu um erro:", response.data.message);
      }
    } catch (error: any) {
      console.log("Ocorreu um erro:", error.message);
    }
  }

  return (
    <div>
      {scanResult ? (
        <div>
          {ticket ? (
            <div>
            <p>ticket aprovado</p>
              <p>Nome do convidado: {ticket.buyerName}</p>
              <p>Nome do aluno: {ticket.sellerName}</p>
              <p>RM do alunoL {rm}</p>
            </div>
          ) : (
            <div>Loading ticket information...</div>
          )}
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
