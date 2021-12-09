export const setSuggestions = (videos: object) => {
    return { type: 'SUGGESTIONS', payload: videos }
}

export const setSerchedTerm = (term: string) => {
    return { type: 'SEARCHED_TERM', payload: term }
}

export const toggleSuggestion = (toggle: boolean) => {
    return { type: 'TOGGLE_SUGGESTION', payload: toggle }
}

export const setSearchedVideos = (vidoes: any) => {
    return { type: 'SEARCHED_VIDEOS', payload: vidoes }
}

export const setSelectedVideo = (videoId: string) => {
    return { type: 'SELECTED_VIDEO', payload: videoId }
}

export const setVideoComments = (comments: any) => {
    return { type: 'VIDEO_COMMENTS', payload: comments }
}