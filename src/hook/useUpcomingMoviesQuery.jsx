//현재 상영중인 영화
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchUpcomingMovies=()=>{
  return api.get(`/movie/upcoming`)
  
}

export const useUpcomingMoviesQuery=()=>{
  return useQuery({
    queryKey: ['movie-upcoming'],
    queryFn: fetchUpcomingMovies
  })
}