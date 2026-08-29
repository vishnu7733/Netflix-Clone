import banner from "../../assets/banner.png"
import CardSlider from "../cardSlider/CardSlider"
export default function LatestCatalog() {
    return (
        <>
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">Latest/Trending</div>
            </div>
            <CardSlider title="trending movies" category="movie" type="popular" />
            <CardSlider title="trending tv shows" category="tv" type="popular" />
            
            
        </>
    )
}