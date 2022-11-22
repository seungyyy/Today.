import {Router,Request, Response, NextFunction } from 'express';
import { User } from '../models/schemas/user';  
import * as crypto from "crypto";

export const router = Router();

//------------- 회원가입 --------------------
router.post("/signup", async(req: Request, res: Response, next: NextFunction) => {
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
})

const createSalt = () => {
  const buf = new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(new Error)
      resolve(buf.toString('base64'))
    });

  })
  return buf
};

const createHashedPassword = (password: string) => {
  const hashedPassword = new Promise((resolve, reject) => {
    crypto.pbkdf2(password, 'salt', 100000, 64,
    'sha512', (err, key) => {
  
    if (err) reject(new Error);
    
    resolve(key.toString('hex'));
    });
  })
  return hashedPassword
}
