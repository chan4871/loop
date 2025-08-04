
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchTrendingNowMovies=()=>{
  return api.get(`/trending/all/week`)
  
}

export const useTrendingNowMoviesQuery=()=>{
  return useQuery({
    queryKey: ['movie-trending'],
    queryFn: fetchTrendingNowMovies
  })
}