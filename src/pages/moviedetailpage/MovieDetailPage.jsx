import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
//hook
import { useMovieDetail } from '../../hook/useMovieDetail'
import { useMovieReviews } from '../../hook/useMovieReviews'
import { useMovieTrailer } from '../../hook/useMovieTrailer'
//리액트 부트스트랩
import { Container, Row, Col, Badge, Button, Alert, Modal, ModalBody } from 'react-bootstrap'
//아이콘
import { BeatLoader } from 'react-spinners';
import { FaPlayCircle } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";

import './MovieDetailPage.style.scss'
const MovieDetailPage = () => {
//파라미터값에서 아이디 가져오기
  const { id } = useParams();
  //리뷰 가져오기
  const {data : reviewsData} = useMovieReviews(id);
  //예고편 가져오기
  const {data : trailerData} = useMovieTrailer(id);
  //모달 가져오기
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const trailer = trailerData?.data?.results?.find(
  (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
);

  const { data, isLoading, isError, error } = useMovieDetail(id);
  if (isLoading) {
    return <h2><BeatLoader className='BeatLoader' /></h2>
  }
  if (isError) {
    return (
    <Container className="my-5">
    <Alert variant="danger">
      <Alert.Heading>영화 정보를 불러오는 데 실패했습니다!</Alert.Heading>
      <p>오류 메시지: {error.message}</p>
      <hr />
      <p className="mb-0">잠시 후 다시 시도해주세요.</p>
    </Alert>
  </Container>
  );
}
if (!data) {
  return (
    <Container className="my-5">
      <Alert variant="info">
        <Alert.Heading>영화 정보를 찾을 수 없습니다.</Alert.Heading>
        <p>선택하신 영화의 정보를 불러올 수 없습니다. ID를 확인해주세요.</p>
      </Alert>
    </Container>
  );
}
  console.log('아이디 잘 들고왔나 확인', id)
  console.log('상세 데이터 값은?', data)
  const movie = data?.data;
  console.log('rd', reviewsData)
  console.log('reviewsData',reviewsData?.data?.results?.[0])
  return (
    <div className='movie-detail'>

      {/* 상단 */}
      <div className='movie-detail-back' style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${data.data.backdrop_path})`, position: 'relative'}} >
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          backdropFilter: 'blur(4px)', // 배경 블러 효과
          zIndex: 0,
        }}>
<Container >
          <Row  className='align-items-center'>
            {/* 왼쪽 포스터 영역 */}
            <Col sm={4}>
              <img src={`https://media.themoviedb.org/t/p/w300${data.data.poster_path}`} alt="" className='img-fluid' />
            </Col>
            {/* 오른쪽 텍스트 영역 */}
            <Col sm={8} style={{color:'#fff'}}>
              <h2 className='title'>{data.data.title}</h2>
              <p className='Badge'> 
                {data.data.adult ? <Badge>  15</Badge> : <Badge  bg="danger">  19</Badge>} 
                <Badge bg="secondary">{data.data.origin_country}</Badge>
                <Badge bg="secondary">{data.data.original_language}</Badge>
                <span>{data.data.release_date}</span>
                
                <span className='runtime'>· {data.data.runtime}hr</span>
              </p>
              <p>{data.data.genres.map((genre)=><> {genre.name}</>)} </p>
              
                <p><span className='Like'><AiFillLike /> {data.data.popularity}</span>
                <span><FcLike /> {data.data.vote_average.toFixed(1)}</span></p>
                <p className='trailer'>
                  {trailer?(<Button className='trailer-btn' onClick={handleShow}>예고편 보기 <FaPlayCircle /></Button>): <p>예고편 없음</p>}
              </p>
              <p>줄거리 요약 : {data.data.overview}</p>
              
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
{movie.title}
        </Modal.Header>
        <ModalBody>
        {trailer? <div className="ratio ratio-16x9">
            <iframe src={`https://www.youtube.com/embed/${trailer.key}`}></iframe>
          </div> : <p>예고편 없음</p>
          }
        </ModalBody>
        </Modal>

        </div>
        
      </div>
      {/* 추천영화 */}
      {/* 리뷰 */}
     {reviewsData?.data?.results?.length > 0 && (
  <Container className='review'>
    <h3>Reviews</h3>
    {reviewsData.data.results.map((review) => (
      // 각 리뷰 항목을 Row로 감싸면, React Bootstrap의 그리드 시스템에 의해 각 리뷰가 새로운 줄에 나타납니다.
      // key prop은 반복되는 요소에 필수적입니다.
      <Row key={review.id} className='my-3 p-3  rounded'> {/* my-3, p-3, border, rounded는 예시 클래스입니다. 필요에 따라 제거하세요. */}
        <Col md={1} className='review-img-wrap'>
          <div className='review-img'>
            {review.author_details.avatar_path ? (
              <img src={`https://media.themoviedb.org/t/p/w45_and_h45_face/${review.author_details.avatar_path}`} alt={review.author} />
            ) : (
              <img src={`https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?`}/>
            )}
          </div>
        </Col>
        <Col md={11}>
          <h6>작성자 {review.author}</h6>
          <p>{review.content.length > 200 ? review.content.slice(0, 200) + '...' : review.content}</p>
          <p>{review.created_at.slice(0, 9)}</p>
        </Col>
      </Row>
    ))}
  </Container>
)}

{/* 리뷰가 없을 경우의 처리 (원래 코드에 없었지만, 논리적으로 필요할 수 있습니다) */}
{reviewsData?.data?.results?.length === 0 && (
  <Container className='review'>
    <h3>리뷰</h3>
    <p>아직 이 영화에 대한 리뷰가 없습니다.</p>
  </Container>
)}

    </div>

  )
}


export default MovieDetailPage

