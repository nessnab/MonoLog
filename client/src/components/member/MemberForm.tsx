interface MemberFormProps {
  workspaceId: number;
  onMemberCreated: () => void;
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../ui/Input'

function MemberForm({ workspaceId, onMemberCreated }: MemberFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/member', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, workspaceId })
      })
      const data = await response.json()

      if(!response.ok) {
        setError(data.error || 'Email already registered')
        return
      }

      onMemberCreated();
      navigate('/');
    }
    catch (err) {
      console.error('Error during login:', err)
    }

  }

  return (
    <div className="items-center rounded-xl border border-border bg-surface shadow-sm p-4">
      <form action="" onSubmit={handleSubmit}>
        {/* <Input 
        /> */}


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

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Member</button>
      </form>
    </div>
  )
}

export default MemberForm