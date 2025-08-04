import React from 'react'
import './HomePage.style.scss'
import LatestTrailersSlide from './components/LatestTrailersSlide'
import TopRatedSlide from './components/TopRatedSlide'
import TrendingNowSlide from './components/TrendingNowSlide'
import { Container } from 'react-bootstrap'


const HomePage = () => {
  const movieSections = [
    {
    id : 'LatestTrailers',
    title : '최신 예고편',
    description : "새로 공개된 영화 예고편들을 만나보세요.",
    component : <LatestTrailersSlide />
    },
    {
    id : 'TopRated',
    title : '평점 높은 작품',
    description : "평론가와 관객 모두에게 극찬받은 명작들을 만나보세요.",
    component : <TopRatedSlide />
    },
    {
    id : 'TrendingNow',
    title : '이번 주 가장 많이 보는 작품',
    description : "현재 가장 많은 관심을 받고 있는 트렌디한 작품을 놓치지 마세요.",
    component : <TrendingNowSlide />
    }
    ]
  return (
    <div>
      <Container className="movie-content">
        <div className="movie-inner" >
        {movieSections.map(section=>(
        <section key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <div>{section.component}</div>
        </section>
      ))}
        </div>
      </Container>
    </div>
  )
}


export default HomePage