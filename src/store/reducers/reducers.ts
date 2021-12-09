const initialState = {
    searchedTerm: '',
    suggestions: [],
    videos: [],
    selectedVideoId: "",
    showSuggestions: false,
    comments: []
}

export const appReducer: any = (state: object = initialState, action: any) => {
    switch (action.type) {
        case 'SUGGESTIONS':
            return {
                ...state,
                suggestions: action.payload
            }
        case 'SEARCHED_TERM':
            return {
                ...state,
                searchedTerm: action.payload
            }
        case 'TOGGLE_SUGGESTION':
            return {
                ...state,
                showSuggestions: action.payload
            }
        case 'SEARCHED_VIDEOS':
            return {
                ...state,
                videos: action.payload
            }
        case 'SELECTED_VIDEO':
            return {
                ...state,
                selectedVideoId: action.payload
            }
        case 'VIDEO_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state
    }
}

export default appReducer