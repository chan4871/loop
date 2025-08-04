import React from 'react';
import './MyPage.scss';
import { Button, Container } from 'react-bootstrap';
import { useFavoriteQuery } from '../hook/useFavorite';
import { useWatchlistQuery } from '../hook/useWatchlist';
import { useHistoryQuery } from '../hook/useHistory';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../components/movieCade/MovieCade';

const MyPage = ({ seeId }) => {
  const { data: favoriteMovies, isLoading: isFavoriteLoading } = useFavoriteQuery(seeId);
  const { data: watchlistMovies, isLoading: isWatchlistLoading } = useWatchlistQuery(seeId);
  const { data: historyMovies, isLoading: isHistoryLoading } = useHistoryQuery(seeId);

  React.useEffect(() => {
    if (favoriteMovies) {
      console.log('Favorite Movies:', favoriteMovies);
    }
    if (watchlistMovies) {
      console.log('Watchlist Movies:', watchlistMovies);
    }
  }, [favoriteMovies, watchlistMovies]);
  
  if (isFavoriteLoading || isWatchlistLoading || isHistoryLoading) {
    return <h1>로딩중...</h1>;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 2,
    },
  };

  const renderMovieCarousel = (movies, sectionName) => {
    if (!movies || movies.length === 0) {
      return <p>{sectionName} 영화가 없습니다.</p>;
    }
    return (
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        draggable={true}
        swipeable={true}
        partialVisible={false}
        containerClass={`carousel-container-${sectionName.toLowerCase()}`}
        itemClass="my-page-carousel-item"
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Carousel>
    );
  };

  return (
    <div className='MyPageSection'>
      <Container className="inner">
        <div className="MyPageMovie">
          <div className="inner">
            <div className="Favorites my-page-section">
              <h2>Favorites</h2>
              {renderMovieCarousel(favoriteMovies?.data?.results, 'Favorites')}
            </div>

            <div className="Watchlist my-page-section">
              <h2>Watchlist</h2>
              {renderMovieCarousel(watchlistMovies?.data?.results, 'Watchlist')}
            </div>

            <div className="History my-page-section">
              <h2>History</h2>
              {renderMovieCarousel(historyMovies?.data?.results, 'History')}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyPage;