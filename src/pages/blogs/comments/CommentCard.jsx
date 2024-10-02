import commentorIcon from '../../../assets/commentorIcon.jpg' 
import PostAComment from './PostAComment'
export default function CommentCard({comments}){
    return(
        <div className="my-6 bg-white p-8">
            <div>
                {
                    comments? 
                    <div>
                        <h3 className="text-lg font-medium">All Comments</h3>
                        <div>
                            {
                                comments.map((comment, index) => (
                                    <div key={index} className="mt-4">
                                        <div>
                                            <img src={commentorIcon} alt="comment" className='h-14' />
                                            <div>
                                                <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>
                                                    {comments?.user?.username}
                                                </p>
                                                <p className='text-[12px] italic'>FormatDate: {comments.createdAt}</p>
                                            </div>
                                        </div>

                                        {/* Comments Details */}

                                        <div className='text-gray-600 mt-5 border p-8'>
                                            <p className='md:w-4/5'>{comment?.comment}</p>
                                        </div>

                                        {/* <p className="text-gray-500">{comment.comment}</p>
                                        <p className="text-sm text-gray-600">{comment.name}</p> */}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    : 
                    <div className="font-medium text-lg">No comments found!</div> 
                }
            </div>

            {/* Comment Input Here */}
            <PostAComment />
        </div>
    )
}