import { Outlet, useParams } from "react-router-dom";
import banner from "../../assets/banner.png"
import "./Catalog.css"
import { useEffect, useState } from "react";
import * as config from "../../api/tmbdapi";
import CatalogCardSlider from "../catalogCardSlider/CatalogCardSlider";
export default function Catalog() {
    const { category, type } = useParams();
    const [sortBy,setSortBy]=useState(null);
    const [title,setTitle]=useState("");
    useEffect(()=>{
        if(type=="popular"){
            setSortBy("popularity");
            setTitle("Trending")
        }else if(type=="top_rated"){
            setSortBy("vote_average");
            setTitle("Top Rated")
        }else if(type=="upcoming"){
            setSortBy("primary_release_date");
            setTitle("Upcoming")
        }else{
            setSortBy("first_air_date");
            setTitle("On the Air")
        }
    },[])    
    

    return (<>
        <div className="catalog">
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">{`${title} ${category}`}</div>
            </div>
            {sortBy &&<CatalogCardSlider category={category} type={type}  params={{with_original_language:"en",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} English ${category}`}/>}
            {sortBy &&<CatalogCardSlider category={category} type={type} params={{with_original_language:"te",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} Telugu ${category}`}/>}
            {sortBy &&<CatalogCardSlider category={category} type={type} params={{with_original_language:"kn",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} Kannada ${category}`}/>}
            {sortBy &&<CatalogCardSlider category={category} type={type} params={{with_original_language:"ta",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} Tamil ${category}`}/>}
            {sortBy &&<CatalogCardSlider category={category} type={type} params={{with_original_language:"hi",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} Hindi ${category}`}/>}
            {sortBy &&<CatalogCardSlider category={category} type={type} params={{with_original_language:"ml",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} Malayalam ${category}`}/>}
            {sortBy &&<CatalogCardSlider category={category} type={type} params={{with_original_language:"ko",sort_by:sortBy=="first_air_date"?`${sortBy}.asc`:`${sortBy}.desc`}} title={`${title} Korean ${category}`}/>}
        </div>
        <Outlet/>
    </>);
}