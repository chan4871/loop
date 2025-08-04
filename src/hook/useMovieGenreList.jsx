import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'; 

const fetchMovieGenreList = () => {
    return api.get(`/genre/movie/list`);
};


export const useMovieGenreListQuery = () => {
    return useQuery({
        queryKey: ['movie-genre-list'],
        queryFn: fetchMovieGenreList,
        staleTime: 1000 * 60 * 60 * 24, 
    });
};


const fetchMoviesByGenre = ({ queryKey }) => {
    const [_, genreId] = queryKey; 
    if (!genreId) return Promise.reject(new Error("Genre ID is required"));
    return api.get(`/discover/movie?with_genres=${genreId}`);
};


export const useMoviesByGenreQuery = (genreId) => {
    return useQuery({
        queryKey: ['movies-by-genre', genreId],
        queryFn: fetchMoviesByGenre,
        enabled: !!genreId, 
        staleTime: 1000 * 60 * 10,
    });
};