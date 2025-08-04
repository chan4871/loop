import React from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import { Container } from 'react-bootstrap'

const Login = () => {
  return (
    <Container className='Login'>
      <section className="login-section">
        <h2>로그인</h2>
        <input type="text" placeholder='이메일 주소 또는 휴대폰 번호' />
        <input type="text" placeholder='비밀번호' />
        <form>
        <input type="checkbox" className='check'/>
        <label htmlFor="">로그인 정보 저장</label>
        </form>
        <button className='login-btn'>로그인</button>
        <div className="or">
          또는
        </div>
        <button>로그인 코드 사용하기</button>
        <br />
        <span>비밀번호를 잊으셨나요?<Link> 비밀번호 찾기</Link></span>
        <br />
        <span>
          회원이 아닌가요? <Link>회원가입</Link>
          <br />
          <br />

          <span>이 페이지는 Google reCAPCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다.</span>
          <br /><Link>자세히 알아보기</Link>
        </span>
      </section>
    </Container>
  )
}

export default Login