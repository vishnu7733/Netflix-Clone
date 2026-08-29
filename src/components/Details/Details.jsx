import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import * as config from "../../api/tmbdapi";
import { useContext, useEffect, useState } from "react";
import "./Details.css";
import NA from "../../assets/na.png";
import { auth, db } from "../../Firebase/firebase.js"
import { authModalContext } from "../../AuthModal";
import { getDocs, setDoc, doc, collection, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
export default function Details() {
    const { id, title, category } = useParams();
    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const { openLogin, closeLogin, openRegister, closeRegister } = useContext(authModalContext);
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);
    console.log(id);
    console.log(title);
    console.log(category);
    const [wishlistItems, setWishlistItems] = useState([]);
    useEffect(() => {
        const fetchWishlist = async () => {
            const response = await getDocs(collection(db, "usersWishlist", user.uid, "Wishlist"));
            const wishlist = response.docs.map((doc) => ({
                ...doc.data()
            }));
            setWishlistItems(wishlist);
        };

        if (user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
        }
    }, [wishlistItems]);
    useEffect(() => {
        const fetchDetails = async () => {
            if (category == "movie") {
                const response = await config.getMovieDetails(id);
                if (response) {
                    setDetails(response);
                    console.log(response)
                }
            } else {
                const response = await config.getTvDetails(id);
                if (response) {
                    setDetails(response);
                    console.log(response)
                }
            }
        }
        fetchDetails();
    }, []);
    useEffect(() => {
        const fetchCastAndCrew = async () => {
            if (category == "movie") {
                const response = await config.getMovieCast(id);
                if (response) {
                    setCast(response.cast.slice(0, 15));
                    console.log(response.cast);
                    setCrew(response.crew.slice(0, 15));
                    console.log(response.crew);
                }
            } else {
                const response = await config.getTvCast(id);
                if (response) {
                    setCast(response.cast.slice(0, 15));
                    console.log(response.cast);
                    setCrew(response.crew.slice(0, 15));
                    console.log(response.crew);
                }
            }
        }
        fetchCastAndCrew();
    }, []);
    useEffect(() => {
        const fetchVideos = async () => {
            const response = await config.getVideos(category, id);
            if (response) {
                setVideos(response.results);
                console.log(response.results);
                response.results.map((item) => {
                    if (item.type == "Trailer" || "Teaser") {
                        setTrailer(item.key);
                        return
                    }
                })
            }
        }
        fetchVideos();
    }, [])
    const addToWishlist = async (item) => {
        if (user) {
            try {
                await setDoc(doc(db, "usersWishlist", user.uid, "Wishlist", item.title ? item.title : item.name), item);
                setWishlistItems(prev=>([...prev,item]))
            } catch (err) {
                toast.error(err.message);
            }
        }
        else {
            openLogin();
        }
    }
    const removeFromWishlist = async (item) => {
        if (user) {
            try {
                await deleteDoc(doc(db, "usersWishlist", user.uid, "Wishlist", item.title ? item.title : item.name));
                setWishlistItems(prev => prev.filter(w_item => w_item.id !== item.Id));
            } catch (err) {
                toast.error(err.message);
            }
        }
        else {
            openLogin();
        }
    }
    const fetch = (item) => {
        const Wishlist_item = wishlistItems.find(w_item => w_item.id == item.id);
        return (
            <div className="details ">
                <div className="info row   gx-2 d-none d-lg-flex " style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)})`, height: "75vh" }}>
                    <div className="info-poster col-4 d-flex justify-content-center align-items-center">
                        <div className="poster">
                            <img className="img-fluid" src={apiConfig.w500Image(item.poster_path)} />
                        </div>
                    </div>
                    <div className="description col-8 d-flex justify-content-center gap-1 flex-column">
                        <div className="title"><h2>{item.title ? item.title : item.name}</h2></div>
                        <div className="genres d-flex gap-3">{item.genres.map((genre) => (
                            <div className="item  rounded-pill px-2 py-1" key={genre.id}>
                                {genre.name}
                            </div>
                        ))}</div>
                        <div className="overview"><p>{item.overview.length < 220 ? item.overview : item.overview.substring(0, 220) + "..."}</p></div>
                        <div className="d-flex details-btns  gap-3">
                            <button className="watch-btn btn rounded-pill" onClick={() => { if (user) { openLogin() } else { setSelectedVideo(trailer) } }}>Watch now</button>
                            <button className="trailer-btn btn rounded-pill" onClick={() => { if (user) { openLogin() } else { setSelectedVideo(trailer) } }}>Watch trailer</button>
                            {Wishlist_item?<button className="wishlist-btn btn rounded-pill" onClick={() => { removeFromWishlist(item) }} >Remove from Wishlist</button>:
                            <button className="wishlist-btn btn rounded-pill" onClick={() => { addToWishlist(item) }} >Add to Wishlist</button>
                    }
                        </div>
                    </div>

                    <div className="info-overlay"></div>
                </div>
                {/* for small and medium screens  start*/}
                <div className="sm-info d-flex  flex-column pt-5 d-lg-none align-items-center  mb-5" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)})`, height: "75vh" }}>
                    <div className="sm-info-poster  d-flex justify-content-center align-items-center">
                        <div className="poster">
                            <img className="img-fluid" src={apiConfig.w500Image(item.poster_path)} />
                        </div>
                    </div>
                    <div className="sm-description col-8 d-flex justify-content-center gap-1 flex-column">
                        <div className="sm-title text-center "><h2>{item.title ? item.title : item.name}</h2></div>
                        <div className="d-flex sm-details-btns justify-content-center gap-3">
                            <button className="sm-watch-btn btn rounded-pill" onClick={() => { if (user) { setSelectedVideo(trailer) } else { openLogin() } }}>Watch now</button>
                            <button className="sm-trailer-btn btn rounded-pill" onClick={() => { if (user) { setSelectedVideo(trailer) } else { openLogin() } }}>Watch trailer</button>
                            {Wishlist_item ? <button className="sm-wishlist-btn btn rounded-pill text-danger" onClick={() => { removeFromWishlist(item) }}><i className="fa fa-heart"></i></button> :
                                <button className="sm-wishlist-btn btn rounded-pill" onClick={() => { addToWishlist(item) }}><i className="fa fa-heart"></i></button>
                            }
                        </div>
                    </div>
                    <div className="sm-overlay"></div>
                </div>
                <div className="sm-overview px-5 d-flex flex-column d-lg-none mb-3 mt-3">
                    <h3 className="sm-overview-heading"> Overview</h3>
                    <p>{item.overview.length < 220 ? item.overview : item.overview.substring(0, 220) + "..."}</p>
                    <div className="genres d-flex gap-3 text-light">{item.genres.map((genre) => (
                        <div className="item  rounded-pill px-2 py-1" key={genre.id}>
                            {genre.name}
                        </div>
                    ))}</div>
                </div>
                {/* for small and medium screens  end*/}
                <div className="cast-crew-info px-5">
                    <div className="cast-info">
                        {cast.length > 0 ? <>
                            <h2 className="cast-and-crew-heading mb-2">Cast</h2>
                            <div className="cast-and-crew-slider d-flex gap-3 overflow-x-scroll w-100">
                                {cast.map((p) => (
                                    <div className="cast-and-crew-slider-item" key={p.id}>
                                        <div className="cast-and-crew-poster-wrapper mb-2">
                                            <img src={p.profile_path ? apiConfig.w500Image(p.profile_path) : NA} alt={p.name} />
                                        </div>
                                        <p className="cast-and-crew-name text-center text-light">{p.name}</p>
                                        <p className="cast-and-crew-role text-center text-light">{p.character ? `(${p.character.substring(0, 15)})` : `(${p.job})`}</p>
                                    </div>
                                ))}
                            </div>
                        </> : <h2 className="cast-and-crew-heading mb-2"> Cast Information not available</h2>}

                        {crew.length > 0 ? <>
                            <h2 className="cast-and-crew-heading mb-2">Crew</h2>
                            <div className="cast-and-crew-slider d-flex gap-3 overflow-x-scroll w-100">
                                {crew.map((p) => (
                                    <div className="cast-and-crew-slider-item" key={p.id}>
                                        <div className="cast-and-crew-poster-wrapper mb-2">
                                            <img src={p.profile_path ? apiConfig.w500Image(p.profile_path) : NA} alt={p.name} />
                                        </div>
                                        <p className="cast-and-crew-name text-center text-light">{p.name}</p>
                                        <p className="cast-and-crew-role text-center text-light">{p.character ? `(${p.character.substring(0, 15)})` : `(${p.job})`}</p>
                                    </div>
                                ))}
                            </div>
                        </> : <h2 className="cast-and-crew-heading mb-2"> Crew Information not available</h2>}
                    </div>
                </div>
                {videos.length > 0 ? <>
                    <h2 className="details-heading mb-3 px-5">Videos</h2>

                    <div className="videos-slider d-flex gap-3 overflow-x-scroll px-5">
                        {videos.map((video) => (
                            <div className="video-card" key={video.id}>
                                <div className="video-thumbnail">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                        alt={video.name}
                                    />
                                    <button className="play-btn" onClick={() => { if (user) { setSelectedVideo(video.key) } else { openLogin() } }}>▶</button>
                                </div>

                                <p className="video-title">{video.name}</p>

                                <p className="video-type">
                                    {video.type}
                                    {video.official && " • Official"}
                                </p>
                            </div>
                        ))}
                    </div>
                </> : <h2 className="details-heading mb-3 px-5">No Video Data Available</h2>}
                {selectedVideo &&
                    <div className="video-modal" onClick={() => setSelectedVideo(null)}>
                        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="video-close-btn" onClick={() => setSelectedVideo(null)}>✕</button>

                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                title="Trailer"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                }
            </div>);
    };

    return (
        <>
            {details && fetch(details)}
        </>);
}