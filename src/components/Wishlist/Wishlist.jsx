import { useLocation, useNavigate, useParams } from "react-router-dom";
import banner from "../../assets/banner.png"
import apiConfig from "../../api/apiConfig";
import { useEffect, useState } from "react";
import * as config from "../../api/tmbdapi";
import styles from "../Wishlist/wishlist.module.css"
import NA from "../../assets/na.png"
import { Stack, Pagination } from "@mui/material";
import { getDocs, doc, collection } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
export default function Wishlist() {
    const [items, setItems] = useState(null);
    const navigate = useNavigate();
    const user = auth.currentUser;
    useEffect(() => {
        const fetchWithlist = async () => {
            const response = await getDocs(collection(db, "usersWishlist", user.uid, "Wishlist"));
            if (response) {
                const wishlist = response.docs.map((doc) => ({
                    ...doc.data()
                }));
                setItems(wishlist);
            }
        }
        fetchWithlist();
    }, []);
    const fetchDetails = (cetegory, id, title) => {
        navigate(`/${cetegory}/details/${id}/${title}`);
    };
    return (<>
        <div className="catalog">
            <div className="catalog-banner ">
                <div className="banner-wrapper ">
                    <img src={banner} className=" " />
                </div>
                <div className="banner-overflow"></div>
                <div className="banner-heading text-center w-100">Wishlist</div>
            </div>
            <div className="subcatalog-content mx-5">
                <div className="row g-4 justify-content-center">
                    {items && items.map((item) => (
                        <div key={item.id} className="item col-6 col-md-3 col-lg-2 d-flex flex-column align-items-center" onClick={()=>{fetchDetails(item.title?"movie":"tv",item.id,item.title?item.title:item.name)}}>
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
            
           
        </div>
    </>);
}