import React, { useEffect } from "react"
import _ from "lodash"
import * as config from "../config"
import { useSelector, useDispatch, connect } from "react-redux"
import { setSuggestions, setSerchedTerm, toggleSuggestion } from "../store/actions/actions"
import { Link } from "react-router-dom"
import axios from "axios"
import jsonp from "axios-jsonp"

const SearchBar = (Props: any) => {
  const dispatch = useDispatch()

  /**
    * Function that is being called every time the input has been changed
    * @param {*} term
    */
  const onInputChange = _.debounce((term) => {
    searchVideo(term)
  }, 300)

  /**
   * This method will store the searched term in store and will make request to YT's autocomplete/suggestion endpoint
   * @param term 
   * @returns axios axios promise
   */
  const searchVideo = (term: string) => {
    const ytSuggestLink: string = config.SUGGESTION_URL
    return axios({
      // A YT undocumented API for auto suggest search queries
      url: ytSuggestLink,
      adapter: jsonp, // using axios-jsonp package as this endpoint returns text containing function
      params: {
        client: "youtube",
        hl: "en",
        ds: "yt",
        q: term,
      }
    }).then((response: any) => {
      if (response.data[1].length) {
        dispatch(setSuggestions(response.data[1]))
        dispatch(toggleSuggestion(true))
      }
    })
  }

  /**
   * 
   * @returns videoList object containing suggestions
   */
  const showVideoList = () => {
    let videoList: object[] = []
    Props.suggest.map((video: any, index: number) => {
      const videoListItem = (
        <Link to={`/results?search_query=${video[0]}`} className="hover:no-underline">
          <li key={index} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
            {video[0]}
          </li >
        </Link>
      )
      videoList.push(videoListItem)
    })
    return videoList
  }

  return (
    <div className="flex flex-col items-center">
      <Link to="/" className="hover:no-underline">
        <img src="https://img.icons8.com/color/48/000000/youtube-play.png" />
      </Link>
      <div className="searchContainer">
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 pl-8 rounded-full border"
            placeholder={Props.term !== '' ? Props.term : "Search Youtube..."}
            onChange={(event) => onInputChange(event.target.value)}
            onBlur={() => {
              setTimeout(() => {
                dispatch(toggleSuggestion(false))
              }, 500)
            }}
            onFocus={() => { dispatch(toggleSuggestion(true)) }}
          />
          <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className={"absolute w-full z-20 " + (Props.suggest.length && Props.showSuggestions ? "flex" : "hidden")}>
            <ul className="bg-white border border-gray-100 w-full mt-2 ">
              {showVideoList()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { suggestions, searchedTerm, showSuggestions } = state
  return { suggest: suggestions, term: searchedTerm, showSuggestions: showSuggestions }
}

export default connect(mapStateToProps)(SearchBar)
