import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useLatestTrailersQuery } from '../../../hook/useLatestTrailersQuery';
import TrailerCard from '../../../components/TrailerCard/TrailerCard'; // MovieCard 컴포넌트가 예고편 정보를 받도록 수정 필요

const LatestTrailersSlide = () => {
  const { data, isLoading, isError, error } = useLatestTrailersQuery();

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }
  if (isError) {
    console.error("Error fetching latest trailers:", error);
    return <h1>예고편을 불러오는 데 실패했습니다: {error.message}</h1>;
  }

  // data는 이제 'trailerKey'를 포함하는 영화 객체들의 배열입니다.
  // 데이터가 없거나 배열이 비어있는 경우를 대비한 처리
  if (!data || data.length === 0) {
    return <h1>최신 예고편 데이터가 없습니다.</h1>;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <div className='LatestTrailers'>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        draggable={true}
        swipeable={true}
        partialVisible={false}
      >
        {/* data는 이미 필터링된 영화 배열이므로, 바로 map을 사용합니다. */}
        {data.map((movie) => (
          <TrailerCard movie={movie} key={movie.id}></TrailerCard>
        ))}
      </Carousel>
    </div>
  );
};

export default LatestTrailersSlide;