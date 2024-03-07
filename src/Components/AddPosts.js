import { useState } from "react";

const AddPosts = ({ onAddPost }) => {

    const [newPostDetails, setNewPostDetails] = useState({
        body: '',
        title: '',
    })

    const addPost = () => {
        onAddPost(newPostDetails);
        setNewPostDetails({
            body: '',
            title: ''
        });
    };

    return (
        <>
            <div className="card p-3" id="add-post">
                Add Posts :
                <textarea onChange={(e) => setNewPostDetails({ ...newPostDetails, title: e.target.value })} value={newPostDetails.title} className="my-3" placeholder="description..." />
                <div className="d-flex gap-2">
                    <textarea className="post-text-title" onChange={(e) => setNewPostDetails({ ...newPostDetails, body: e.target.value })} value={newPostDetails.body} placeholder="set title of your post... " />
                    <button className="btn" onClick={addPost}>Post</button>
                </div>
            </div>

        </>
    )
}
export default AddPosts