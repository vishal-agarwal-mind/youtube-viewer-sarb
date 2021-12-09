import React from 'react'
import moment from 'moment'

const Comment = (Props: any) => {
    return (
        <div>
            <div className="flex">
                <div className="flex-shrink-0 mr-3">
                    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={Props.author.authorProfilePic} alt="" />
                </div>
                <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{Props.author.authorName}</strong> <span className="text-xs text-gray-400">{moment(Props?.publishedAt).fromNow()}</span>
                    <p className="text-sm">
                       {Props.comment}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment