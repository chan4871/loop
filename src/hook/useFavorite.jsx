import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchFavoriteMovies = (seeId)=>{
    return api.get(`/account/{account_id}/favorite/movies`)
    
}

export const useFavoriteQuery = (seeId)=>{
    return useQuery({
        queryKey : ['favorite-movies'],
        queryFn : fetchFavoriteMovies
    })
}