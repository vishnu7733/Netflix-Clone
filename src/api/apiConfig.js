 
 const apiConfig={
    baseUrl:"https://api.themoviedb.org/3/",
    apiKey:import.meta.env.VITE_apikey,//user your own tmbd api here 
    originalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original${imgPath}`,

    w500Image: (imgPath) =>
        `https://image.tmdb.org/t/p/w500${imgPath}`,
    youtube:(link)=>
        `https://www.youtube.com/embed/${link.key}`
}
export default apiConfig;