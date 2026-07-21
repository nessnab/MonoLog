interface MemberFormProps {
  workspaceId: number | null;
  refreshMembers: () => void;
}

import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

function MemberForm({ workspaceId, refreshMembers }: MemberFormProps) {
  const API = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
  ) {
      setError("Please fill all required fields.");
      return;
  }

    try {
      const response = await fetch(`${API}/member`, {
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
          placeholder="Enter your name" 
          value={name}
          onChange={setName}
        />
        <Input 
          placeholder="Enter your email" 
          value={email}
          onChange={setEmail}
        />
        <Input 
          type="password"
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