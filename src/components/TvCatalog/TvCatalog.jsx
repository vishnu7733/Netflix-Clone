import banner from "../../assets/banner.png"
import CardSlider from "../cardSlider/CardSlider"
export default function TvCatalog() {
    return (
        <>
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">Tv Shows</div>
            </div>
            <CardSlider title="trending tv shows" category="tv" type="popular" />

            <CardSlider title="top Rated Tv shows" category="tv" type="top_rated" />

            <CardSlider title="on the air tv shows" category="tv" type="on_the_air" />

        </>
    )
}