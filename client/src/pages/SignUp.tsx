import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import InputBox from '../components/common/InputBox';

interface SingUp {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

interface SingUpCorrect {
  email: boolean;
  noEmail: boolean
  password: boolean;
  noPassword: boolean;
  passwordCheck: boolean;
  nickname: boolean;
  nopasswordCheck: boolean;
}

const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputsRef = useRef<HTMLInputElement[] | null[]>([]);
  const [signUpData, setSingUpData] = useState<SingUp>({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  })
  const [correctText, setCorrectText] = useState<SingUpCorrect>({
    email: true,
    noEmail: true,
    password: true,
    noPassword: true,
    passwordCheck: true,
    nopasswordCheck: true,
    nickname: true
  })

  const handlerInputOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSingUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })

    if (e.target.name === 'email') checkEmailReg(e)
    if (e.target.name === 'password') checkPasswordReg(e)
  }

  const checkEmailReg = (e:React.ChangeEvent<HTMLInputElement>) => {
    const emailReg = /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i;
    
    if (e.target.value.length === 0) {
      setCorrectText({
        ...correctText,
        email: true,
        noEmail: false
      })
    }
    if (!emailReg.test(e.target.value)) {
      setCorrectText({
        ...correctText,
        email: false,
        noEmail: true
      })
      return;
    } else {
      setCorrectText({
        ...correctText,
        email: true,
        noEmail: true
      })
      return
    }
  }

  const handlerPasswordCheckClick = () => {
    if (signUpData.password !== signUpData.passwordCheck) {
      setCorrectText({
        ...correctText,
        passwordCheck: false,
      })
    } else {
      setCorrectText({
        ...correctText,
        passwordCheck: true,
      })
    }
  }

  const checkPasswordReg = (e:React.ChangeEvent<HTMLInputElement>) => {
    const passwordReg = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    console.log(passwordReg.test(e.target.value))
    if (!passwordReg.test(e.target.value)) {
      setCorrectText({
        ...correctText,
        password: false,
        noPassword: true
      })
      return;
    }
    if (passwordReg.test(e.target.value)) {
      setCorrectText({
        ...correctText,
        password: true,
        noPassword: true
      })
      return;
    }
  }

  const handlerClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
    if (inputsRef.current[0]?.value === '') {
      setCorrectText({
        ...correctText,
        noEmail: false
      })
      return;
    }
    if (inputsRef.current[1]?.value === '') {
      setCorrectText({
        ...correctText,
        noPassword: false
      })
      return;
    }
    if (inputsRef.current[2]?.value === '') {
      setCorrectText({
        ...correctText,
        nopasswordCheck: false
      })
      return;
    }
  }

  const handlerClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputsRef.current[0]?.value === '') return inputsRef.current[0]?.focus()
    if (inputsRef.current[1]?.value === '') return inputsRef.current[1]?.focus()
    if (inputsRef.current[2]?.value === '') return inputsRef.current[2]?.focus()

    console.log('dispatch 예정')
  }

  const alertText:{[key:string]: string} = {
    noEmail: '이메일을 입력해 주세요.',
    noPassword: '비밀번호를 입력해 주세요.',
    noNickname: '닉네임을 입력해 주세요.',
    emailNoCorrect: '이메일 형식이 올바르지 않습니다.',
    passwordNoCorrect: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    passwordAndCheckPassword: '비밀번호가 일치하지 않습니다.',
  }
  return (
    <InputBox title='회원가입' onClick={handlerPasswordCheckClick}>
    <form ref={formRef}>
      <label htmlFor='email'>이메일</label>
      <input type={'text'} ref={el => inputsRef.current[0] = el} name="email" value={signUpData.email} id="email" onChange={handlerInputOnChange}/>
      {!correctText.noEmail && <p>{alertText['noEmail']}</p>}
      {!correctText.email && signUpData.email && <p>{alertText['emailNoCorrect']}</p>}
      <label htmlFor='password'>비밀번호</label>
      <input type={'password'} ref={el => inputsRef.current[1] = el} id="password" maxLength={16} name="password" value={signUpData.password} onClick={handlerClickInput} onChange={handlerInputOnChange}/>
      {!correctText.noPassword && <p>{alertText['noPassword']}</p>}
      {!correctText.password && signUpData.password && <p>{alertText['passwordNoCorrect']}</p>}
      <label htmlFor='passwordCheck'>비밀번호확인</label>
      <input type={'password'} ref={el => inputsRef.current[2] = el} id="passwordCheck" maxLength={16} name="passwordCheck" value={signUpData.passwordCheck} onClick={handlerClickInput} onChange={handlerInputOnChange}/>
      {!correctText.passwordCheck && <p>{alertText['passwordAndCheckPassword']}</p>}
      {!correctText.nopasswordCheck && <p>{alertText['noPassword']}</p>}
      <button type='submit' onClick={handlerClickSubmit}>가입하기</button>
    </form>
    </InputBox>
  )
}


export default SignUp