import React from 'react'
import Banner from './components/banner/Banner'
import PopularMovieslides from './PopularMovieslides/PopularMovieslides'
import TopRatedMovieSlide from './TopRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './UpcomingMovieSlide/UpcomingMovieSlide'
import NowPlayingMovieSlide from './NowPlayingMovieSlide/NowPlayingMovieSlide'
import { Container } from 'react-bootstrap'
import MovieCard from '../../components/movieCade/MovieCade'
import './MoviePage.style.scss'
const MoviePage = () => {
  const movieSections = [
    {
    id : 'NowPlaying',
    title : '현재 상영중인 영화',
    description : "지금 극장에서 만나보세요.",
    component : <NowPlayingMovieSlide />
    },
    {
    id : 'Popular',
    title : '인기 있는 영화',
    description : "많은 사람들이 사랑한 인기작을 소개합니다.",
    component : <PopularMovieslides />
    },
    {
    id : 'TopRated',
    title : '평점 높은 영화',
    description : "관객과 평론가가 인정한 최고의 작품들입니다.",
    component : <TopRatedMovieSlide />
    },
    {
    id : 'Upcoming',
    title : '상영 예정 영화',
    description : "곧 개봉 할 영화들을 소개합니다.",
    component : <UpcomingMovieSlide />
    }
    ]
  return (
    <div>
      <Banner></Banner> 
      <Container className="movie-content">
        <div className="movie-inner">
        {movieSections.map(section=>(
        <div key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <div>{section.component}</div>
        </div>
      ))}
        </div>
      </Container>
    </div>
  )
}

export default MoviePage