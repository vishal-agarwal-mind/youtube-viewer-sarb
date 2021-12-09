import React, { useEffect } from "react"
import { connect, useSelector, useDispatch } from "react-redux"
import { useSearchParams, Link } from 'react-router-dom'
import { setSelectedVideo, setVideoComments } from "../store/actions/actions"
import * as config from "../config"
import SearchBar from "./search_bar"
import Comment from "./comment"
import axios from "axios";

const VideoDetail = (Props: any) => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get('video') as string
  const url = `https://www.youtube.com/embed/${videoId}`;

  useEffect(() => {
    dispatch(setSelectedVideo(videoId))
    axios.get(config.COMMENTS_URL + `/?part=snippet&key=${config.API_KEY}&videoId=${videoId}&maxResults=50`)
      .then(function (response) {
        // handle success
        if (response.data && response.data.items.length) {
          dispatch(setVideoComments(response.data.items))
        } else {
          console.log('failed')
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const renderComments = () => {
    let commentList: object[] = []
    Props.comments.map((comment: any, index: number) => {
      const singleComment = (
        <Comment author={{ authorName: comment?.snippet?.topLevelComment?.snippet?.authorDisplayName, authorProfilePic: comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl }} publishedAt={comment?.snippet?.topLevelComment?.snippet?.publishedAt} comment={comment?.snippet?.topLevelComment?.snippet?.textOriginal} />
      )
      commentList.push(singleComment)
    })
    return commentList
  }

  return (
    <div className="sm:container mx-auto h-full mt-5 mb-10">
      <SearchBar />
      <div className=" mt-10 relative w-full h-1/2">
        <iframe
          className="z-10 absolute left-0 right-0 mx-auto w-3/5 h-full"
          src={url}
          allowFullScreen
        />
      </div>
      <div className="antialiased mx-auto commentArea">
        <hr className="mt-10 mb-10" />
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
        <div className="space-y-4">
          {renderComments()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { selectedVideoId, comments } = state
  return { video: selectedVideoId, comments: comments }
}


export default connect(mapStateToProps)(VideoDetail);
