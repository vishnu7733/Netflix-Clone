import banner from "../../assets/banner.png"
import CardSlider from "../cardSlider/CardSlider"
export default function MoviesCatalog() {
    return (
        <>
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">Movies</div>
            </div>
            <CardSlider title="trending movies" category="movie" type="popular" />
            
            <CardSlider title="top Rated Movies" category="movie" type="top_rated" />
            
            <CardSlider title="upcoming Movies" category="movie" type="upcoming" />
            
        </>
    )
}