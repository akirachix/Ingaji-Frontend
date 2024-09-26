import { useState } from 'react';


interface LoginData {
  username: string;
  password: string;
}


interface LoginResult {
  isSubmitting: boolean;
  errorMessage: string;
  successMessage: string;
  login: (loginData: LoginData) => Promise<any>;
}




const login = async (loginData: LoginData) => {


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  setIsSubmitting(true);
  setErrorMessage('');
  setSuccessMessage('');


  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });


    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }


    setSuccessMessage('Login successful!');
    return data;
  } catch (error) {
    setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
