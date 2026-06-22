import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [workspaceName, setWorkspaceName] = useState('')

  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, workspaceName })
      })
      const data = await response.json()

      if(!response.ok) {
        setError(data.error || 'Email already registered')
        return
      }

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
          id="name" 
          name="name" 
          placeholder="Enter your name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input 
          type="text" 
          id="workspaceName" 
          name="workspaceName" 
          placeholder="Enter your workspace name" 
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterForm