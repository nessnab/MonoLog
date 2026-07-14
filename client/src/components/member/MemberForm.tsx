interface MemberFormProps {
  workspaceId: number | null;
  refreshMembers: () => void;
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'

function MemberForm({ workspaceId, refreshMembers }: MemberFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

  if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
  ) {
      alert("Please fill all required fields.");
      return;
  }

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

      refreshMembers();
      setName((""))
      setEmail((""))
      setPassword((""))
    }
    catch (err) {
      console.error('Error during login:', err)
    }

  }

  return (
    <div className="items-center rounded-xl border border-border bg-surface shadow-sm p-4">
      <h2 className='font-bold text-base'>New Member</h2>

      <form action="" onSubmit={handleSubmit}>

        <Input 
          // type="text" 
          // id="name" 
          // name="name" 
          placeholder="Enter your name" 
          value={name}
          onChange={setName}
        />
        <Input 
          // type="text" 
          // id="email" 
          // name="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={setEmail}
        />
        <Input 
          // type="password" 
          // id="password" 
          // name="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={setPassword}
          />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Add Member</Button>
      </form>
    </div>
  )
}

export default MemberForm