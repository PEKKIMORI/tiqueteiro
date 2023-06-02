import { useNavigate } from 'react-router-dom'
import '../css/room.css'
import { useEffect } from 'react';

export default function Room (){
    // const navigate = useNavigate();
    // useEffect(() => {
    //     sessionStorage.getItem('onebitflix-token') === null || undefined ? 
    //     navigate('/') : ''
    // })
    return(
        <>
        <h1 className="fonfon">Compre já seus ingressos!</h1>
        <h3 style={{textAlign: 'center'}}>:D</h3>
        <div className= "box">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <p className="title">INGRESSO 1</p>
                            <img src= "https://cdn.discordapp.com/attachments/885280158704074884/1111762811354366003/Movie-Ticket-PNG.png"/>
                        </div>
                        <div className="flip-card-back">
                            <button className="title">COMPRAR</button>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <p className="title">INGRESSO 2</p>
                            <img src= "https://cdn.discordapp.com/attachments/885280158704074884/1111762811354366003/Movie-Ticket-PNG.png"/>
                        </div>
                        <div className="flip-card-back">
                            <button className="title">COMPRAR</button>
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}