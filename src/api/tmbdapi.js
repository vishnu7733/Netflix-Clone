import axiosClient from "./axiosclient";

export const movieType = {
    popular: "popular",
    upcoming: "upcoming",
    top_rated: "top_rated"
};

export const tvType = {
    popular: "popular",
    on_the_air: "on_the_air",
    top_rated: "top_rated"
};

export const category = {
    movie: "movie",
    tv: "tv"
};
export const getMovieDetails=(id)=>
    axiosClient.get(`movie/${id}`);
export const getTvDetails=(id)=>
    axiosClient.get(`tv/${id}`);
export const getMovieCast=(id)=>
    axiosClient.get(`movie/${id}/credits`);
export const getTvCast=(id)=>
    axiosClient.get(`tv/${id}/credits`);
export const discover=(category,params)=>
    axiosClient.get(`discover/${category}`,{params});
export const getMovies = (type, params) =>
    axiosClient.get(`movie/${movieType[type]}`, { params });

export const getTv = (type, params) =>
    axiosClient.get(`tv/${tvType[type]}`, { params });

export const getVideos=(category,id)=>
    axiosClient(`${category}/${id}/videos`);
export const Search=(mediatype,params)=>
    axiosClient(`search/${mediatype}`,{params});



export const getCast = (type, id, params) =>
    axiosClient.get(`${category[type]}/${id}/credits`, { params });

export const search = (type, params) =>
    axiosClient.get(`search/${category[type]}`, { params });