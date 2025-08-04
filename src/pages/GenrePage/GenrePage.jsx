import React from 'react';
import { Container } from 'react-bootstrap';
import { useMovieGenreListQuery } from '../../hook/useMovieGenreList';
import GenreSection from './components/GenreSection';
import '../../components/movieCade/MovieCade.scss'
import './GenrePage.scss'

const GenresPage = () => {
  const { data: genres, isLoading: isGenresLoading, isError: isGenresError } = useMovieGenreListQuery();

  if (isGenresLoading) {
    return <h1 className="genres-page-loading">장르 정보를 불러오는 중...</h1>;
  }

  if (isGenresError) {
    return <h1 className="genres-page-error">장르 정보를 불러오는 데 실패했습니다.</h1>;
  }

  const displayGenres = genres?.data?.genres.filter(genre => 
    !['TV Movie', 'Documentary', 'Western'].includes(genre.name)
  ) || [];

  return (
    <div className="genres-page-container">
      <Container>
        {displayGenres.length > 0 ? (
          displayGenres.map((genre) => (
            <GenreSection key={genre.id} genreId={genre.id} genreName={genre.name} />
          ))
        ) : (
          <p className="genres-page-no-data">표시할 장르가 없습니다.</p>
        )}
      </Container>
    </div>
  );
};

export default GenresPage;