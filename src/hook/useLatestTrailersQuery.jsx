// hook/useLatestTrailersQuery.js
import { useQuery } from '@tanstack/react-query'; // react-query v4 이상
// import { useQuery } from 'react-query'; // react-query v3 이하
import api from '../utils/api'; // TMDB API 호출을 위한 axios 인스턴스 또는 fetch 래퍼

const fetchLatestTrailers = async () => {
  // 1. 현재 상영 중인 영화 또는 개봉 예정 영화 목록을 가져옵니다.
  // 여기서는 'now_playing'을 예시로 사용하겠습니다. 'upcoming'으로 변경 가능합니다.
  const nowPlayingResponse = await api.get('/movie/now_playing'); // api.get은 axios 같은 HTTP 클라이언트 가정

  // 응답 데이터에서 영화 목록을 추출합니다. (TMDB API 응답은 대부분 results 배열 안에 실제 데이터가 있습니다.)
  const movies = nowPlayingResponse.data.results;

  // 2. 각 영화의 비디오 정보를 병렬로 가져옵니다.
  // Promise.all을 사용하여 여러 비동기 요청을 효율적으로 처리합니다.
  const trailerPromises = movies.map(async (movie) => {
    try {
      const videoResponse = await api.get(`/movie/${movie.id}/videos`);
      const trailers = videoResponse.data.results.filter(
        (video) => video.type === 'Trailer' && video.site === 'YouTube' // YouTube 예고편만 필터링
      );
      // 첫 번째 예고편만 가져오거나, 모든 예고편을 포함하거나 선택할 수 있습니다.
      return {
        ...movie, // 기존 영화 정보
        trailerKey: trailers.length > 0 ? trailers[0].key : null, // 첫 번째 예고편의 YouTube key
        // 또는 allTrailers: trailers,
      };
    } catch (error) {
      console.error(`Error fetching videos for movie ${movie.id}:`, error);
      return { ...movie, trailerKey: null }; // 에러 발생 시 예고편 없음으로 처리
    }
  });

  const moviesWithTrailers = await Promise.all(trailerPromises);

  // 예고편이 있는 영화만 필터링하거나, 모두 반환할 수 있습니다.
  return moviesWithTrailers.filter(movie => movie.trailerKey !== null);
};

export const useLatestTrailersQuery = () => {
  return useQuery({
    queryKey: ['latestTrailers'],
    queryFn: fetchLatestTrailers,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지 (선택 사항)
    // cacheTime: 1000 * 60 * 30, // 캐시 유지 시간 (선택 사항)
  });
};