import {Router} from 'express';
import { User } from '../models/schemas/user';  
import * as crypto from "crypto";
import { asyncHandler } from '../util/async-handler';
import jwt from "jsonwebtoken";


const userRouter = Router();

//------------- 회원가입 --------------------
userRouter.post("/signup", asyncHandler(async (req, res, next) => {
  const {email, password, nickname} = req.body;

  const checkEmail = await User.findOne({email});

  if (checkEmail) {
    res.status(500)
    res.json({error: "이미 가입된 이메일입니다."})
    return;
  }

  createHashedPassword(password).then((res) => {
    createSalt().then(salt => {
      User.create({
        email, 
        password: res,
        salt: salt,
        nickname
      })
    })
  })

  res.json({
    result: "회원가입이 완료되었습니다. 로그인을 해주세요."
  })
}))


//------------- 로그인 --------------------
userRouter.post("/login", asyncHandler( async(req, res, next) => {
  const {email, password} = req.body;
  const jwtSecret:string = (process.env.JWTSECRET as string)
  let verified:boolean|undefined
  const checkEmail = await User.findOne({email})

  if (!checkEmail) {
    res.status(401)
    return res.json({
      fail: "존재하지 않는 이메일입니다."
    })
  }

  try {
      verified = await verifyPassword(password, checkEmail.password).then(res => {return res})
    } catch(err) {
      console.log(err)
    }

  if (!verified) {
    res.status(401);
    res.json({
      fail: '이메일 또는 비밀번호가 올바르지 않습니다.',
    });
    return;
  }

  jwt.sign({
    email: email,
    nickname: checkEmail.nickname,
  }, jwtSecret, {
    expiresIn: '1d'
  }, (err, token) => { 
    if (err) {
      res.status(401).json({ status: false, message: "로그인을 해주세요." })
    } else { 
      res.json({
        status: true,
        accessToken: token,
        email: email,
        nickname: checkEmail.nickname
      })
    }
  })

}))


const createSalt = () => {
  const buf = new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(new Error)
      resolve(buf.toString('base64'))
    });

  })
  return buf
};

const hashedPassword = (password: string) => {
  return  new Promise((resolve, reject) => {
  crypto.pbkdf2(password, 'salt', 100000, 64,
  'sha512', (err, key) => {

  if (err) reject(new Error);
  
  resolve(key.toString('base64'));
  });
  
  })
}

const createHashedPassword = async (password: string) => {
  return await hashedPassword(password)
}

console.log(createHashedPassword('asdasdasd').then(res => console.log(res)))

const verifyPassword = async (password: string, userPassword: string) => {
  const curentHashPw: string | unknown = await hashedPassword(password).then(res =>{ return res })

  if (typeof(curentHashPw) === 'string') {
    if (curentHashPw === userPassword) return true;
    return false
  }

}

export { userRouter }
//console.log(verifyPassword('asdasdas','SkHmvXith5KcWI41gZRLoBPc35RS//Li9x89lXULVIEYayBU3Opd9e0UmHgt3zy1qwEF0D4bmtUVvJMQqgo3Lw==').then(res => console.log(res)), 'bbbb')
