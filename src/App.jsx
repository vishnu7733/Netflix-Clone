import { useState } from 'react'
import { BrowserRouter,Routes,Route, } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import HeroSlide from './components/Hero/HeroSlide'
import Home from './components/home/Home';
import Catalog from './components/Catalog/Catalog'
import Details from './components/Details/Details'
import SubCatalog from './components/subCatalog/SubCatalog'
import SearchPage from './components/search page/SearchPage'
import { ToastContainer } from 'react-toastify'
import Wishlist from './components/Wishlist/Wishlist'
import TvCatalog from './components/TvCatalog/TvCatalog'
import MoviesCatalog from './components/MoviesCatalog/MoviesCatalog'
import LatestCatalog from './components/LatestCatalog/LatestCatalog'
function App() {
  

  return (
    
    <div className='app'>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>;
      <Route path="/:category/:type" element={<Catalog/>}/>
      <Route path="/:category/:type/:subtype" element={<SubCatalog/>}/>
      <Route path="/:category/details/:id/:title" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchPage/>}/>
      <Route path="/user/wishlist" element={<Wishlist/>}/>
      <Route path="/Movies" element={<MoviesCatalog/>}/>
      <Route path="/Tv" element={<TvCatalog/>}/>
      <Route path="/Latest" element={<LatestCatalog/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
    </div>
      
  )
}

export default App
