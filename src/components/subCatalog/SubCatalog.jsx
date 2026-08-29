import { useLocation, useNavigate, useParams } from "react-router-dom";
import banner from "../../assets/banner.png"
import apiConfig from "../../api/apiConfig";
import { useEffect, useState } from "react";
import * as config from "../../api/tmbdapi";
import styles from "../subCatalog/SubCatalog.module.css"
import NA from "../../assets/na.png"
import { Stack, Pagination } from "@mui/material";

export default function SubCatalog() {
    const { category, type, subtype } = useParams();
    const { state } = useLocation();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [items, setItems] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchItems = async () => {
            const response = await config.discover(category, {
                with_original_language: state.with_original_language,
                sort_by: state.sort_by,
                page: page
            });
            if (response) {
                setItems(response.results);
                setTotalPages(response.total_pages);
                console.log(response);
            }
        };
        fetchItems();
    }, [category, type, subtype, state, page]);
    const fetchDetails=(cetegory,id,title)=>{
        navigate(`/${category}/details/${id}/${title}`);
    };
    return (<>
        <div className="catalog">
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">{subtype}</div>
            </div>
            <div className="subcatalog-content mx-5">
                <div className="row g-4 justify-content-center">
                    {items && items.map((item) => (
                        <div key={item.id} className="item col-6 col-md-3 col-lg-2 d-flex flex-column align-items-center" onClick={()=>{fetchDetails(category,item.id,item.title?item.title:item.name)}}>
                            <div className={styles.posterWrapper}>
                                <img className="img-fluid" src={item.poster_path ? apiConfig.w500Image(item.poster_path) : NA} alt={item.title || item.name} />
                            </div>
                            <div className="item-title text-center mt-2">
                                {item.title || item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="d-flex justify-content-center w-100 my-4 ">
                <Pagination count={Math.min(totalPages, 500)} page={page} onChange={(e, value) => setPage(value)} showFirstButton showLastButton shape="rounded" size="medium" 
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#ffffff",
                        border: "1px solid #555",
                        backgroundColor: "#1a1a1a",
                    },

                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "#333",
                    },

                    "& .Mui-selected": {
                        backgroundColor: "#E50914 !important",
                        color: "#fff",
                        border: "1px solid #E50914",
                    },

                    "& .MuiPaginationItem-icon": {
                        color: "#fff",
                    },
                }}
                />
            </div>
        </div>
    </>);
}