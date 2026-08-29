import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import * as config from "../../api/tmbdapi";
import "./CardSlider.css"
import { useEffect, useState } from "react";
import NA from "../../assets/na.png"
export default function CardSlider(props) {
    const { title, category, type } = props;
    const [items, setItems] = useState(null);
    const Navigate = useNavigate();
    const navigateCatalog = (category, type) => {
        Navigate(`/${category}/${type}`);
    }
    const fetchDetails=(cetegory,id,title)=>{
        Navigate(`/${category}/details/${id}/${title}`);
    };
    useEffect(() => {
        const fetchItems = async () => {
            
                if (category == "movie") {
                    const response = await config.getMovies(type, { page: 1 });
                    if (response) {
                        
                        setItems(response.results);
                    }
                }
                if (category == "tv") {
                    const response = await config.getTv(type, { page: 1 });
                    if (response) {
                        
                        setItems(response.results);
                    }
                }
            }
        
        fetchItems();
    }, [[category, type]])
    return (
        <>
            <div className="card-slider d-flex flex-column mx-5 mt-lg-5 mt-3">
                <div className="slider-title d-flex justify-content-between mb-3 align-items-center">
                    <h3 className="title-heading ">{title.toUpperCase()}</h3>
                    <button className="remove-defaults catalog-btn" onClick={() => { navigateCatalog(category, type) }}>View More</button>
                </div>
                <div className="card-slides d-flex overflow-x-scroll pt-3">
                    {items &&
                        items.map(item => {

                            return (<div className="slide-item me-3 " key={item.id} >
                                <div className="card-poster-wrapper   mb-2" onClick={()=>{
                                fetchDetails(category,item.id,item.title?item.title:item.name);
                            }}>
                                    <img src={item.poster_path?apiConfig.w500Image(item.poster_path):NA} alt={item.title} />
                                </div>
                                <div className="item-title text-center">{item.title?item.title:item.name}</div>
                            </div>);

                        })
                    }
                </div>
            </div>
        </>
    );
}