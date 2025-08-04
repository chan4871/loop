import React from 'react'
import { useGenreListQuery } from '../../hook/useGenreList'
import { useNavigate } from 'react-router-dom';
import {Card, Container} from 'react-bootstrap';
import './MovieCade.scss'

const MovieCard = ({movie}) => {
  const navigate = useNavigate()
  // console.log(movie, 'movie')
  const imageUrl=`	https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`
  const {data} = useGenreListQuery();
  /* console.log('장르확인', data) */
  const genreList = data?.data?.genres || [];
  const genreNames = genreList.filter(g => movie.genre_ids?.includes(g.id)).map(g => g.name)

  const adult = movie.adult ? "전체관람" : "19"

  const youtubeEmbedUrl = movie.trailerKey
    ? `https://www.youtube.com/embed/${movie.trailerKey}`
    : null;

  return (
    <div>
      <Card className='movie-card-wrap' style={{cursor : 'pointer', gap : '10px'}} onClick={()=>navigate(`/movie/${movie.id}`)}>
      <div className='movie-card'
      style={{
        backgroundImage:`url(${imageUrl})`
      }}
      >
      <div className="overlay">
        <div className="text-wrap">
          <p className='adult'>{adult}</p>
          <p className='vote'>{movie.vote_average.toFixed(1)}</p>
          <p className='genre'>{genreNames?.join('/')}</p>
          <p className='overview'>{movie.overview}</p>
        </div>
        
      </div>
      </div>
      <h5 className='movie-title'>{movie.title}</h5>
      </Card>
      
    </div>
  )
}

export default MovieCard