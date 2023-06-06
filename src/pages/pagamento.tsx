import { useEffect, useState } from 'react';
import { initMercadoPago, Payment, Wallet} from '@mercadopago/sdk-react';
import { IBrickError } from '@mercadopago/sdk-react/bricks/util/types/common';

import {  redirect, useParams } from 'react-router-dom';
import authService from '../services/authService';

import '../css/pagamento.css'


initMercadoPago('TEST-480b4324-8e4c-4565-a03b-07a158c89fdf');

function Pagamento() {
  const [preferenceId, setPreferenceId] = useState('')
  const { ticket } = useParams()
  
  useEffect(() => {
    const fetchPreference = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const response = await authService.payment(ticket!)
        const { preferenceId } = await response.data.id;
        console.log(preferenceId)
        const init_point = await response.data.sandbox_init_point
        console.log(init_point)
        sessionStorage.setItem("init-point", init_point);
        console.log(response)
  
        setPreferenceId(preferenceId);
        
      } catch (error) {
        console.error('Erro ao buscar a preferência de pagamento', error);
      }
    };
  
    fetchPreference();
  }, [ticket]);

  return (
    <>
    <div className={"container"}>
      <div className={"text-box"}>
        <h1 className={"pog1"}>FESTA JUNINA</h1>
        <h1 className={"pog1"}>FESTA JUNINA</h1>
      </div>
        <p className={"pog2"}>Faça o pagamento e contamos com a sua presença <span className={"pogspan"}>:)</span></p>
      <div className={"wadawel"}> Após finalizar o pagamento, você receberá seu ingresso pelo seu e-mail, então se certifique de colocá-lo corretamente, e não se esqueça de trazer o ingresso consigo no seu celular no dia da festa! </div>
      <div>
      <div id="wallet_container">
         <Wallet initialization={{ preferenceId: preferenceId }} />
       </div>
    </div>
    </div>
    </>
  )
  }

export default Pagamento;
