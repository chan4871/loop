import React from 'react'
import { Button } from 'react-bootstrap'
import './NotFound.scss'
const NotFoundPage = () => {
  return (
    <div className='NotFound-section'>
      <div class="NotFound-container">
      <div class="NotFound-img">
        <img src={`${process.env.PUBLIC_URL}/img/NotFound.png`} alt="" />
      </div>
      <div class="NotFound-text">
<h2>페이지를 찾을 수 없습니다 </h2>
<p>죄송합니다. 요청하신 페이지를 찾을 수 없거나, 더 이상 제공되지 않는 페이지입니다.<br />불편을 드려 죄송합니다.</p>
<Button>홈으로 돌아가기</Button>
      </div>
      </div>
      
    </div>
  )
}

export default NotFoundPage