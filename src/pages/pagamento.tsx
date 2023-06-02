import { useEffect, useState } from 'react';
import { initMercadoPago, Payment} from '@mercadopago/sdk-react';
import { IBrickError } from '@mercadopago/sdk-react/bricks/util/types/common';

import {  useParams } from 'react-router-dom';
import authService from '../services/authService';

import '../css/pagamento.css'


initMercadoPago('TEST-480b4324-8e4c-4565-a03b-07a158c89fdf');

const Pagamento = () => {
  const [initialization, setInitialization] = useState({ amount: 1000, preferenceId: '' });
  const { ticket } = useParams()
  
  useEffect(() => {
    const fetchPreference = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const response = await authService.payment(ticket!)
        const { preferenceId } = await response.data.id;
        const  init_point  = await response.data.sandbox_init_point
        console.log(init_point)
        sessionStorage.setItem("init-point", init_point);
        console.log(response)

        setInitialization(prevState => ({ ...prevState, preferenceId: preferenceId }));
      } catch (error) {
        console.error('Erro ao buscar a preferência de pagamento', error);
      }
    };

    fetchPreference();
  }, [ticket]);


  const customization: any = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async () => {
  
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const point = sessionStorage.getItem('init-point')!
      window.location.href = point
    } catch (error) {
      
      console.error(error);
    }
  };

  const onError = async (error: IBrickError) => {
    console.log(error);
  };

  const onReady = async () => {
    //
  };

  return (
    <>
    <div>

    <div className={"container"}>
      <div className={"text-box"}>
        <h1 className={"pog1"}>FESTA JUNINA</h1>
        <h1 className={"pog1"}>FESTA JUNINA</h1>
      </div>
        <p className={"pog2"}>Faça o pagamento e contamos com a sua presença <span className={"pogspan"}>:)</span></p>
      <div className={"wadawel"}> Após finalizar o pagamento, você receberá seu ingresso pelo seu e-mail, então se certifique de colocá-lo corretamente, e não se esqueça de trazer o ingresso consigo no seu celular no dia da festa! </div>
      <div>
      <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
      />
      </div>
    </div>
    </div>
    </>
  );
};

export default Pagamento;
