import { useState } from "react";

const AddComments = ({ onAddComment, disabledBtn }) => {

    const [newCommentDetails, setNewCommentDetails] = useState({
        body: '',
    })

    const addComment = () => {
        onAddComment(newCommentDetails);
        setNewCommentDetails({
            body: '',
        });
    };

    return (
        <>
            <div className=" card p-3">
                <div className="comment-box">
                    <p className="mb-2">Add Comments....</p>
                    <div className="text-area d-flex gap-2">
                        <textarea className="w-100 text-area-1" placeholder="comments..." value={newCommentDetails.body} onChange={(e) => setNewCommentDetails({ ...newCommentDetails, body: e.target.value })} />
                        <button className="btn" onClick={addComment} disabled={disabledBtn}>
                            {
                                disabledBtn ? 'adding' : 'ADD'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddComments