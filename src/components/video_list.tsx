import React, { useEffect } from "react"
import SearchBar from "./search_bar"
import VideoListItem from "./video_list_item"
import { useSearchParams, Link } from 'react-router-dom'
import { useDispatch, connect } from "react-redux"
import { setSearchedVideos, setSerchedTerm } from "../store/actions/actions"
import * as config from "../config"
import axios from "axios"
import moment from 'moment'

const VideoList = (Props: any) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search_query')
  const dispatch = useDispatch()
  /**
   * when state changes
   * set the selected suggestion in store
   * and call the YTSearch API to search for the selected suggestion
   */
  useEffect(() => {
    dispatch(setSerchedTerm(query as string))

    /**
     * and now the YTsearch
     */
    axios.get(config.ROOT_URL, {
      params: {
        part: 'snippet',
        key: config.API_KEY,
        q: query,
        type: 'video'
      }
    }).then((res) => {
      dispatch(setSearchedVideos(res.data.items))
    }).catch((err: any) => {
      console.log(err)
    })
  }, [])

  /**
   * @return react component for vidoe list 
   */
  const renderVideos = () => {
    let videoList: object[] = []
    Props.videoList.map((video: any, index: number) => {
      const videoListItem = (
        <Link to={`/watch?video=${video?.id?.videoId}`} className="hover:no-underline">
          <div key={index} className="flex mt-3 mb-3 justify-center">
            <div className="mr-5">
              <img src={video?.snippet?.thumbnails?.medium?.url} alt="" />
            </div>
            <div className="w-2/5">
              <h2 className="font-bold text-lg">{video?.snippet?.title}</h2>
              <p className="mt-2 text-sm">{video?.snippet?.description.substr(0, 30) + '...'}</p>
              <p className="mt-2 ">
                <span className="text-sm bg-green-100 rounded-lg pr-2 pl-2 pt-1 pb-1"> Uploaded by {video?.snippet?.channelTitle}</span>
              </p>
              <p className="mt-5 text-xs">{moment(video?.snippet?.publishedAt).fromNow()}</p>
            </div>
          </div >
        </Link>
      )
      videoList.push(videoListItem)
    });
    return videoList
  }
  return (
    <>
      <SearchBar/>
      <div className="sm:container flex flex-col mx-auto mt-5">
        {renderVideos()}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { searchedTerm, videos } = state
  return { term: searchedTerm, videoList: videos }
}

export default connect(mapStateToProps)(VideoList)
