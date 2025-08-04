import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'


const fetchMovieReviews = (movieId) => {
  return api.get(`movie/${movieId}/reviews`)
}

export const useMovieReviews = (movieId) => {
  return useQuery({
    //매서드에 각각 값을 넣음, movieId가 필요하다고 해서 저렇게 넣음 
    queryKey : ['movie-reviews', movieId],
    queryFn : () => fetchMovieReviews(movieId),
  })
}
