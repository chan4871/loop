import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchWatchlistMovies = (seeId)=>{
    return api.get(`/account/{account_id}/watchlist/movies`)
    
}

export const useWatchlistQuery = (seeId)=>{
    return useQuery({
        queryKey : ['watchlist-movies'],
        queryFn : fetchWatchlistMovies
    })
}