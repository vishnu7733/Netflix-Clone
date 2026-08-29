import { useLocation, useNavigate, useParams } from "react-router-dom";
import NA from "../../assets/na.png"
import banner from "../../assets/banner.png"
import "./SearchPage.css"
import apiConfig from "../../api/apiConfig";
export default function SearchPage(){
    const state=useLocation();
    const {query}=useParams();
    const navigate=useNavigate();
    const fetchDetails=(media_type,id,title)=>{
        navigate(`/${media_type}/details/${id}/${title}`);
    };
    console.log(state.state);
    return(
        <div className="catalog">
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">Search results for {query}</div>
            </div>
            <div className="subcatalog-content mx-5">
                <div className="row g-4 justify-content-center">
                    {state.state && state.state.map((item) => (
                        <div key={item.id} className="item col-6 col-md-3 col-lg-2 d-flex flex-column align-items-center" onClick={()=>{fetchDetails(item.media_type,item.id,item.title?item.title:item.name)}}>
                            <div className="posterWrapper">
                                <img className="img-fluid" src={item.poster_path ? apiConfig.w500Image(item.poster_path) : NA} alt={item.title || item.name} />
                            </div>
                            <div className="item-title text-center mt-2">
                                {item.title || item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}