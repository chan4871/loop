// src/components/TrailerCard.jsx (예시)
import React from 'react';
import { Card } from 'react-bootstrap';

const TrailerCard = ({ movie }) => {
  // 예고편 YouTube 임베드 URL 생성
  const youtubeEmbedUrl = movie.trailerKey
    ? `https://www.youtube.com/embed/${movie.trailerKey}?controls=1&modestbranding=1&rel=0`
    : null; // 트레일러 키가 없으면 null

  // 포스터 이미지 URL (예고편 미리보기처럼 보여줄 때 사용)
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : `${process.env.PUBLIC_URL}/img/default_poster.png`; // 대체 이미지

  if (!youtubeEmbedUrl) {
    return null; // 예고편이 없는 영화는 이 카드를 렌더링하지 않음
  }

  return (
    <Card className="trailer-card-wrap">
      <div className="trailer-video-container">
        <iframe
          width="100%"
          //height="200" // 필요에 따라 고정 높이 또는 반응형 스타일 적용
          src={youtubeEmbedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`${movie.title} 트레일러`}
          style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }} // 반응형 비디오 비율 유지
        ></iframe>
      </div>
      <Card.Body>
        <Card.Title className="trailer-title">{movie.title}</Card.Title>
        {/* 필요한 경우 다른 정보 추가 (예: 개봉일, 평점) */}
        {/* <Card.Text>개봉일: {movie.release_date}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default TrailerCard;