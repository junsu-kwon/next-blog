import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as yup from 'yup';

export async function POST(request: Request) {
  const res = {
    success: true,
    message: 'Email sent successfully',
  };

  const param = await request.json();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
  });

  try {
    const { email, subject, message } = await validationSchema.validate(param);
    const transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com', // SMTP 서버명
      port: 465, // SMTP 포트
      auth: {
        user: 'wnstn7410@naver.com',
        pass: '353zsz130620',
      },
    });

    const info = await transporter.sendMail({
      from: 'wnstn7410@naver.com',
      to: 'kjs940322@gmail.com', // 수신자 이메일 주소
      subject: subject,
      text: message,
    });

    console.log('info :>> ', info);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log(e);
    res.message = '전송실패';
    res.success = false;
  }

  return NextResponse.json(res);
}
