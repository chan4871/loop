import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../../components/movieCade/MovieCade'; // MovieCard 컴포넌트 경로 확인
import { useMoviesByGenreQuery } from '../../../hook/useMovieGenreList';
import '../../../components/movieCade/MovieCade.scss'

const GenreSection = ({ genreId, genreName }) => {
  const { data, isLoading, isError, error } = useMoviesByGenreQuery(genreId);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    },
  };

  if (isLoading) {
    return <h3 className="genre-loading">{genreName} 영화 로딩 중...</h3>;
  }

  if (isError) {
    return <h3 className="genre-error">{genreName} 영화를 불러오는 데 실패했습니다: {error.message}</h3>;
  }

  if (!data || !data.data || !data.data.results || data.data.results.length === 0) {
    return <p className="genre-no-data">{genreName} 영화 데이터가 없습니다.</p>;
  }

  return (
    <div className="genre-section-container">
      <h2>{genreName}</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        draggable={true}
        swipeable={true}
        partialVisible={false}
        containerClass={`carousel-container-genre-${genreId}`}
        itemClass="genre-carousel-item"
      >
        {data.data.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default GenreSection;