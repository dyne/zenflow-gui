import React, {useState} from 'react';
import {useAuth} from "../lib/auth";
import {useRouter} from "next/router";

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { signIn } = useAuth()

  async function  onSubmit(e:any) {
    e.preventDefault()
    await signIn({ username, password }).then(()=> router.push('/'))
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}