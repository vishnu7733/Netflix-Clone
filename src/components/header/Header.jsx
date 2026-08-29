import logo from "../../assets/logo.png";
import profile from "../../assets/profile.jpg"
import "./header.css";
import { useContext, useEffect, useState } from "react";
import * as config from "../../api/tmbdapi";
import { useNavigate } from "react-router-dom";
import SearchPage from "../search page/SearchPage";
import { authModalContext } from "../../AuthModal.jsx";
import { auth } from "../../Firebase/firebase.js";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
export default function Header() {
    const { openRegister, openLogin } = useContext(authModalContext);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
            });
    
            return unsubscribe;
        }, []);
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        }
    },[user]);

    console.log(openRegister);
    const [searchVisible, setSearchVisible] = useState(false);
    const navigate = useNavigate();
    function setSearch() {
        if (searchVisible) {
            setSearchVisible(false)

        } else {
            setSearchVisible(true)
        }
    }
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        if (!searchInput.trim()) {
            setSearchInput("");
            setSearchResults([])
            return;
        }
        const timer = setTimeout(async () => {
            const response = await config.Search("multi", { query: searchInput });
            if (response) {

                setSearchResults(response.results.slice(0, 5));
                console.log(response.results.slice(0, 5));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);
    const fetchSearch = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) {
            return;
        }
        const response = await config.Search("multi", { query: searchInput });
        if (response) {
            const data = response.results;
            navigate(`/search/${searchInput}`, { state: data });
            setSearchInput("");
            setSearchResults([]);
        }

    }
    const resultsSelect = async (name) => {
        setSearchInput(name);
        const response = await config.Search("multi", { query: name });
        if (response) {
            const data = response.results;
            navigate(`/search/${searchInput}`, { state: data });
            setSearchInput("");
            setSearchResults([]);
        }
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully");
            setIsLoggedIn(false);
            navigate("/")
        } catch (err) {
            toast.error(err);
        }
    };
    
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg Navbar">
                <div className="container-fluid">
                    <img className="ms-2" src={logo} width={100} />
                    <div className="collapse  d-lg-none" id="smSearchbar">
                        <div className={`search-input ${searchVisible ? "show d-block " : "d-lg-none"} rounded-pill  position-relative`}>
                            <form className="d-flex px-2 align-items-center ">
                                <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} className={` border-0 remove-defaults `} />
                                <button className={` search-btn ${searchVisible ? "show" : ""} remove-defaults fw-500`} type="submit">Search</button>
                            </form>
                            {searchResults.length > 0 &&
                                (<div className=" search-reults ">
                                    {searchResults.map(r => (
                                        <div className="result-item" onClick={() => { resultsSelect(r.title ? r.title : r.name) }} key={r.id}>{r.title ? r.title : r.name}</div>
                                    ))}
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-between ms-auto gap-2">

                        <div className="nav-item  d-lg-none">
                            <a className="nav-link text-light remove-defaults navbar-toggler" type="button" aria-current="page" data-bs-toggle="collapse" data-bs-target="#smSearchbar" aria-controls="smSearchbar" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-search"></i></a>
                        </div>
                        <div className="nav-item d-lg-none">
                            <a className="nav-link text-light" href="#"><i className="fa fa-bell"></i></a>
                        </div>
                    </div>

                    <button className="navbar-toggler rounded border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <div className="Profile-icon rounded overflow-hidden">
                            <img src={profile} width={40} />
                        </div>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav sm-navbar ms-lg-5 me-auto mb-2 mb-lg-0 gap-lg-4">
                            <li className="nav-item  smNavbar-item nav-item-sm">
                                <a className="nav-link fw-semibold text-light" onClick={()=>{navigate("/")}} href="#">Home</a>
                            </li>
                            <li className="nav-item nav-item-sm smNavbar-item">
                                <a className="nav-link  fw-semibold text-light" onClick={()=>{navigate("/Tv")}}href="#" >Tv Shows</a>
                            </li>
                            <li className="nav-item nav-item-sm smNavbar-item">
                                <a className="nav-link  fw-semibold text-light" onClick={()=>{navigate("/Movies")}}href="#">Movies</a>
                            </li>
                            <li className="nav-item nav-item-sm smNavbar-item">
                                <a className="nav-link fw-semibold text-light" onClick={()=>{navigate("/Latest")}}href="#">Latest</a>
                            </li>
                            <li className="nav-item nav-item-sm smNavbar-item">
                                <a className="nav-link fw-semibold text-light" href="#" onClick={()=>{navigate("/user/wishlist")}}>My List</a>
                            </li>
                            {user ? (
                                
            
                                    <li className="nav-item nav-item-sm d-lg-none smNavbar-item" onClick={handleLogout}>
                                        <a className="nav-link fw-semibold text-light" href="#">Logout</a>
                                    </li>
                                ) :
                                <li className="nav-item nav-item-sm d-lg-none smNavbar-item" onClick={openLogin}>
                                    <a className="nav-link fw-semibold text-light" href="#">Login / Register</a>
                                </li>}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 align-items-center">

                            <li className={`search-input ${searchVisible ? "show d-lg-block d-none" : "d-none"} rounded-pill  postition-relative`}>
                                <form className="d-flex ps-2 align-items-center " onSubmit={fetchSearch}>
                                    <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} className={` border-0 remove-defaults `} />
                                    <button className={` search-btn ${searchVisible ? "show" : ""} remove-defaults fw-500`} type="submit">Search</button>
                                </form>
                                {searchResults.length > 0 &&
                                    (<div className=" search-reults ">
                                        {searchResults.map(r => (
                                            <div className="result-item" onClick={() => { resultsSelect(r.title ? r.title : r.name) }} key={r.id}>{r.title ? r.title : r.name}</div>
                                        ))}
                                    </div>)
                                }
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <a className="nav-link text-light" aria-current="page" onClick={setSearch}><i className="fa fa-search"></i></a>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <a className="nav-link text-light" href="#"><i className="fa fa-bell"></i></a>
                            </li>
                            <li className="nav-item d-none d-lg-block user-content">
                                <div className="Profile-icon rounded overflow-hidden">
                                    <img src={profile} width={40} />
                                </div>

                                <div className="user-info">
                                    {user ? (
                                        <div className="user-items">
                                            <div className="user-item">
                                                <i className="fa fa-user"></i>
                                                <span>Hello {user.name}</span>
                                            </div>
                                            <div className="user-item" onClick={()=>{navigate("/user/wishlist")}}>
                                                <i className="fa fa-heart"></i>
                                                <span>My List</span>
                                            </div>
                                            <div className="user-item" onClick={handleLogout}>
                                                <i className="fa fa-sign-out"></i>
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="user-items">
                                            <div className="user-item" onClick={openLogin}>
                                                <i className="fa fa-sign-in"></i>
                                                <span>Login </span>
                                            </div>
                                            <div className="user-item" onClick={openRegister}>
                                                <i className="fa fa-user"></i>
                                                <span>Register</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
