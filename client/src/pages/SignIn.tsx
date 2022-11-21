import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/common/InputBox';


interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigation = useNavigate()
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
    <InputBox title='로그인'>
    <form ref={formRef} onSubmit={handlerSubmit}>
      <label htmlFor='email'>이메일</label>
      <input type={'text'} name="email" value={signInData.email} id="email" onChange={handlerInputOnChange}/>
      <label htmlFor='password'>비밀번호</label>
      <input type={'password'} name="password" value={signInData.password} onChange={handlerInputOnChange}/>
      <button type='submit'>로그인</button>
      <button type='button'>카카오 로그인</button>
    </form>
    <div>
      <button type='button' onClick={()=> navigation('/signup')}>회원가입</button>
      <button type='button'>비밀번호 찾기</button>
    </div>
    </InputBox>
  )
}

export default SignIn