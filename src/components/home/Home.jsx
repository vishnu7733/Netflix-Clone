import { useEffect, useState } from "react";
import HeroSlide from "../Hero/HeroSlide";
import * as config from "../../api/tmbdapi";
import CardSlider from "../cardSlider/CardSlider";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [upcomingMovies, setUpcomingMovies] = useState(null);
    const [trendingTvShows, setTrendingTvShows] = useState(null);
    const [topRatedTvShows, setTopRatedTvShows] = useState(null);
    const [onTheAirTvShows, setOnTheAirTvShows] = useState(null);
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await config.getMovies("popular", { page: 1 });
            if (response) {
                console.log(response);
                setTrendingMovies(response.results);
            }
        };

        fetchTrendingMovies();

    }, []);

    return (
        <>
            {trendingMovies && <HeroSlide movies={trendingMovies.slice(0, 5)} />}
            <CardSlider title="trending movies" category="movie" type="popular" />
            <CardSlider title="trending tv shows" category="tv" type="popular" />
            <CardSlider title="top Rated Movies" category="movie" type="top_rated" />
            <CardSlider title="top Rated Tv shows" category="tv" type="top_rated" />
            <CardSlider title="upcoming Movies" category="movie" type="upcoming" />
            <CardSlider title="on the air tv shows" category="tv" type="on_the_air" />
        </>
    );
}