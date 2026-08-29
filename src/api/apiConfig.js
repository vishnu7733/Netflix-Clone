 import {VITE_apikey} from "../../.env";
 const apiConfig={
    baseUrl:"https://api.themoviedb.org/3/",
    apiKey:VITE_apikey,
    originalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original${imgPath}`,

    w500Image: (imgPath) =>
        `https://image.tmdb.org/t/p/w500${imgPath}`,
    youtube:(link)=>
        `https://www.youtube.com/embed/${link.key}`
}
export default apiConfig;