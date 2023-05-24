import { useState } from 'react'
import React from 'react';
import './login.css'
import { generatePDF } from './Pdf'

function Login() {
  const handleClick = () => {
    const contElement = document.querySelector('.cont');
    if (contElement instanceof HTMLElement) {
      contElement.classList.toggle('s--signup');
    }
  };
	return(
		<body>
      <h1 className="welcome">Oi! Seja bem-vindo :D</h1>
      <p className="info">Esse site foi desenolvido para a compra controlada de ingressos para a Festa Junina na ETEC Presidente Vargas, que ocorrerá no dia 24/06.<br/><br/>Primeiramente: os alunos não pagam a entrada.<br/>Cada aluno tem o direito de convidar até duas pessoas, que comprarão o ingresso em seu nome.<br/>A compra do ingresso só poderá ser feita via esse site.<br/>Para fazer a compra, antes o aluno deve criar uma conta, e com ela, realizar o pagamento via PIX, cartão de crédito/débito, ou boleto.</p>
      <p className="tip">OBRIGADO!</p>
      <div className="cont">
        <div className="form sign-in">
          <h2>Faça o login abaixo :)</h2>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" />
          </label>
          <p className="forgot-pass">Não oferecemos meios de recuperar sua senha!</p>
          <button type="button" className="submit">LOGIN</button>
          <button type="button" className="fb-btn" onClick={generatePDF}>Gere o seu <span>PDF</span></button>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>Sem conta?</h2>
              <p>Crie uma conta agora para comprar seus ingressos para a Festa Junina da ETEC Presidente Vargas!</p>
            </div>
            <div className="img__text m--in">
              <h2>É rápido!</h2>
              <p>Por favor, forneça seus dados! Após fazer o registro é só entrar e fazer a compra dos ingressos! <br/> ^ -^)</p>
              </div>
            <div className="img__btn" onClick={handleClick}>
              <span className="m--up">CRIAR</span>
              <span className="m--in">ENTRAR</span>
            </div>
          </div>
          <div className="form sign-up">
            <label className="labela">
              <span>Nome Completo</span>
              <input type="text" />
            </label>
            <label>
              <span>Email Institucional</span>
              <input type="email" />
            </label>
            <label>
              <span>RM</span>
              <input type="text" />
            </label>
            <label>
              <span>Senha</span>
              <input type="password" />
            </label>
            <label>
              <span>Confirmar Senha</span>
              <input type="password" />
            </label>
            <button type="button" className="submit">CRIAR SUA CONTA</button>
          </div>
        </div>
      </div>

      <a href="https://github.com/PEKKIMORI" target="_blank" className="icon-link">
        <img src="https://icons.iconarchive.com/icons/pictogrammers/material/256/pac-man-icon.png"/>
      </a>
      <a href="https://github.com/c0ffex" target="_blank" className="icon-link icon-link--twitter">
        <img src="https://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/256/coffee-icon.png"/>
      </a>
    </body>
	)
}

export default Login
