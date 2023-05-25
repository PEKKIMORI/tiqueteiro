
import { useNavigate } from 'react-router-dom'
import './room.css'
import { useEffect } from 'react';

export default function Room (){
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.getItem('onebitflix-token') === null || undefined ? 
        navigate('/') : ''
    })
    

    return(
        <div>
             <h1>Hello my friendo</h1>
        </div>
    )
}