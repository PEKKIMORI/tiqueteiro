import { useState } from 'react';

export function useAuth() {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleSuccess = () => {
    const contElement = document.querySelector('.cont');
    if (contElement instanceof HTMLElement) {
      contElement.classList.toggle('s--signup');
    }
  };

  const handleError = () => {
    setShowErrorMessage(true);
  };

  return { showErrorMessage, handleSuccess, handleError };
}
