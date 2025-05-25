import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit spuštěn'); //moje
    
    // Simple validation
    if (!email || !password) {
      setError('Prosím vyplňte email i heslo.');
      return;
    }
    setError('');

    try {
      console.log('try spuštěno'); //moje
      const response = await fetch('http://localhost:5265/api/account/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });


      if (!response.ok) {
        const text = await response.text();
        let message;
        try {
        // API možná vrací JSON-string
        message = JSON.parse(text);
          } catch {
          message = text;
        }
        throw new Error(message || 'Přihlášení se nezdařilo.');        
      }

      const data = await response.json();
      console.log('Úspěšně přihlášeno:', data);
      console.log('Token:', data.token);
      // Tady můžete přesměrovat uživatele nebo uložit token
      navigate('/dashboard')


    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
   <div>
      <h2>Přihlášení</h2>
      
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Heslo</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button type="submit" onClick={handleSubmit}>
          Přihlásit se
        </button>
      </form>
    </div>
  );
}

export default LoginForm;