import e from 'express';
import React, {useState, useEffect, useRef} from 'react'

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [signInData, setSignInData] = useState<SignInProps>({
    email: '',
    password: ''
  })

  const handlerInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(signInData)
  }

  return (
    <>
    <form ref={formRef} onSubmit={handlerSubmit}>
      <label htmlFor='email'>이메일</label>
      <input type={'text'} name="email" value={signInData.email} id="email" onChange={handlerInputOnChange}/>
      <label htmlFor='password'>비밀번호</label>
      <input type={'password'} name="password" value={signInData.password} onChange={handlerInputOnChange}/>
      <button type='submit'>로그인</button>
    </form>
    </>
  )
}

export default SignIn