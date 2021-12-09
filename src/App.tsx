import React, { useEffect } from "react"
import SearchBar from "./components/search_bar"
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import VideoList from "./components/video_list"
import VideoDetail from "./components/video_detail"
import Home from "./components/home"
import './App.css'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="results" element={<VideoList />} />
        <Route path="watch" element={<VideoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
