import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchHistoryMovies = (seeId)=>{
    return api.get(`/account/{account_id}/rated/movies`)
    
}

export const useHistoryQuery = (seeId)=>{
    return useQuery({
        queryKey : ['history-movies'],
        queryFn : fetchHistoryMovies
    })
}