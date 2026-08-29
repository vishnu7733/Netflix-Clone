// import * as tmbd from"../../api/tmbdapi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import apiConfig from "../../api/apiConfig";
import "./heroslide.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function HeroSlide(props) {
    const { movies } = props;
    const Navigate=useNavigate();
    const fetchDetails=(category,id,title)=>{
        Navigate(`/${category}/details/${id}/${title}`);
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
           
            (entries) => {
                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    } else {
                        entry.target.classList.remove("active");
                    }

                });
            },
            {
                threshold: 0.2
            }
        );
        
    const elements = document.querySelectorAll(".animate-item");
    elements.forEach(element => {
        observer.observe(element);
    });
    return () => observer.disconnect();
}, [movies]);
return (
    <>
    
        <Swiper modules={[Navigation, Pagination, Autoplay]} className="d--lg-none " pagination={{ clickable: true }} autoplay={{ delay: 2000 }} slidesPerView={1} loop={true} >
            {
                movies.map(movie => (
                    <SwiperSlide key={movie.id} onClick={()=>{fetchDetails("movie",movie.id,movie.title)}}>
                        <div className="hero-slide vh-75 d-lg-none d-flex flex-column align-items-center gap-4 position-relative" style={{ backgroundImage: `url(${apiConfig.originalImage(movie.backdrop_path)})` }}>
                            <div className="hero-content d-flex flex-column mt-3 align-items-center z-2">
                                <div className="poster-wrapper ">
                                    <img src={apiConfig.w500Image(movie.poster_path)} alt={movie.title} className="img-fluid poster-img" />
                                </div>
                            </div>
                            <div className="d-flex gap-3 mb-3 hero-btns z-3">
                                <button className="watch-btn btn rounded-pill" onClick={()=>{fetchDetails("movie",movie.id,movie.title)}}>Watch now</button>
                                <button className="trailer-btn btn rounded-pill" onClick={()=>{fetchDetails("movie",movie.id,movie.title)}}>Watch trailer</button>
                            </div>
                            <div className="sm-overlay position-absolute"></div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper modules={[Navigation, Pagination, Autoplay]} className="d-none d-lg-block" navigation pagination={{ clickable: true }} autoplay={{ delay: 2000 }} slidesPerView={1} loop={true} >
            {
                movies.map(movie => (
                    <SwiperSlide key={movie.id} onClick={()=>{fetchDetails("movie",movie.id,movie.title)}}>
                        <div className="hero-slide vh-100 " style={{ backgroundImage: `url(${apiConfig.originalImage(movie.backdrop_path)})` }}>
                            <div className="overlay"></div>
                            <div className="container-fluid h-100 position-relative z-1">
                                <div className="row align-items-center h-100 px-5">
                                    <div className="col-lg-7 hero-description">
                                        <h1 className="hero-title animate-item mb-4">{movie.title}</h1>
                                        <p className="hero-overview animate-item mb-5">
                                            {movie.overview.length > 220 ? movie.overview.substring(0, 220) + "..." : movie.overview}
                                        </p>
                                        <div className="d-flex hero-btns animate-item gap-3">
                                            <button className="watch-btn btn rounded-pill" onClick={()=>{fetchDetails("movie",movie.id,movie.title)}}>Watch now</button>
                                            <button className="trailer-btn btn rounded-pill" onClick={()=>{fetchDetails("movie",movie.id,movie.title)}}>Watch trailer</button>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 offset-lg-1 d-flex justify-content-center">
                                        <div className="poster-wrapper animate-item">
                                            <img src={apiConfig.w500Image(movie.poster_path)} alt={movie.title} className="img-fluid poster-img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>

    </>);

}