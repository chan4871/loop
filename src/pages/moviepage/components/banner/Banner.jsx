import React from 'react';
import { usePopularMoviesQuery } from '../../../../hook/usePopularMoviesQuery';
import { useState } from 'react';
import { TfiMenuAlt } from "react-icons/tfi";
import { FaHeart, FaPlay, FaBookmark } from "react-icons/fa";
import { useMovieTrailer } from '../../../../hook/useMovieTrailer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';

const Banner = () => {
  /* 모달 열고, 닫기 */
  const [show, setshow] = useState(false);

  const handleClose = () =>setshow(false);
  const handleshow = () =>setshow(true);

  /* 인기 영화 정보 data로 가져오기 */
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movie = data?.data?.results?.[0];

  // 아이디값 들고 오기
  const movieId = movie?.id;
  // 영화의 예고편 데이터 가지고 오기
  const trailerQuery = useMovieTrailer(movieId, {enabled: !! movieId});
  console.log('트레일러내용',trailerQuery.data)
  const trailerKey = trailerQuery.data?.data?.results.find((video) => video.type === 'Trailer' && video.official === true);

  /* 로딩(또는 오류났을 때)하는 중에 잠깐 보여주기위해 - 리액트 기능 */
  if (isLoading) return <h2>로딩 중..</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div
      className='banner'
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.data.results[0].backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* 배경 이미지를 어둡고 블러 처리하는 오버레이 div 추가 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      ></div>

      {/* 실제 콘텐츠 (banner-inner)는 오버레이 위에 표시되도록 zIndex 설정 */}
      <Container className="banner-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="banner-text">
          <h2>{data.data.results[0].title}</h2>
          <span className='overview'>
            <p className='overview'>{data.data.results[0].overview}</p>
          </span>
          <span>
            <p>개봉일</p>
            <p>{data.data.results[0].release_date}</p>
          </span>
          <span>
            <p>회원 점수</p>
            <p >{data.data.results[0].vote_average.toFixed(1)}</p>
          </span>
          <div className="banner-text-btn">
            <button><TfiMenuAlt /></button>
            <button><FaHeart /></button>
            <button><FaBookmark /></button>
            <button onClick={handleshow} className='play'>   트레일러 재생  <FaPlay /></button>

          </div>

        </div>
      </Container>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
          <Modal.Title>예고편 미리보기</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{width : '100%'}}>
          {trailerKey ? (<iframe  style={{width : '100%', height : '250px'}} src={`https://www.youtube.com/embed/${trailerKey.key}`} frameBorder="0"  />) : (<p>예고편 없음</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Banner;