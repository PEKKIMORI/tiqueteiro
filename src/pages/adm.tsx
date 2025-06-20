import Scanner from '../components/Scanner'
import '../css/adm.css'

function Adm() {

    return (
        <div className="adm-container">
            <div className="header">
                <h1 className="title">Validação de Ingressos</h1>
                <p className="subtitle">Aponte a câmera para o QR code do ingresso para validar.</p>
            </div>
            <div className="scanner-container">
                <Scanner />
            </div>
        </div>
    )
}

export default Adm