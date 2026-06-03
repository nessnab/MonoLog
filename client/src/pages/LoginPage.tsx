import { useState } from 'react'
import { data, useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      // console.log('Login response:', data)

      if(!response.ok) {
        setError(data.error || 'Invalid email or password')
        return
      }

      const userRes = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
      });

      const userData = await userRes.json();

      console.log('User data:', userData);
      navigate('/');
    }
    catch (err) {
      console.error('Error during login:', err)
    }

  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="email" 
          name="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage