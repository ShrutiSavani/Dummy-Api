import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { MdDelete } from "react-icons/md";
// import { RiEdit2Fill } from "react-icons/ri";

const Comments = () => {
    const navigate = useNavigate()

    const { postid } = useParams()
    // console.log(postid) //2

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState([])

    const [newComment, setNewComment] = useState('')
    const [newUserName, setnewUserName] = useState('')



    useEffect(() => {
        async function apiFun() {
            setIsLoading(true)

            try {


                const responsePost = await fetch(`https://dummyjson.com/posts/${postid}`);
                const responseComments = await fetch(`https://dummyjson.com/posts/` + postid + `/comments`);
                let postsRes = await responsePost.json();
                let commentsRes = await responseComments.json();

                const forUserId = postsRes.userId;
                const responseUser = await fetch(`https://dummyjson.com/users/${forUserId}`);
                const usersRes = await responseUser.json();
                setPosts(postsRes)
                setComments(commentsRes.comments)
                setUsers(usersRes)

            } catch (e) {
                console.log('error fetching data : ', e)
                setIsError("oops!! error in fetching data.....")
            }
            setIsLoading(false);
        }
        apiFun();

    }, [])
    console.log(comments)

    if (isLoading) {
        return (
            <span class="loader"></span>
        )
    }

    if (isError) {
        return (
            <span className="error-text text-danger fw-bold">{isError}</span>
        )
    }

    const addComment = () => {
        if (newComment === '' || newUserName === '') {
            alert('all fields are require')
        }
        if (newComment !== "" && newUserName !== "") {
            const updatedComments = [
                ...comments,
                {
                    body: newComment,
                    postId: postid,
                    user: {
                        username: newUserName
                    }
                },

            ];
            // console.log("Updated comments: ", updatedComments);
            setComments(updatedComments);
            setNewComment("");
            setnewUserName('')
        }
    };

    return (
        <>
            <div className="container-fluid cards" >
                <div className="card p-3">
                    <div className="card-items">

                        <div className="d-flex">
                            <p className="post-title ">{posts.title}</p>
                            <button className="btn " onClick={() => { navigate(-1) }}>Back</button>
                        </div>
                        <p className="post-body my-2">{posts.body}</p>
                        <hr />
                        <p className="user-name">{posts.username}</p>
                        <p className="user-name">- {users.username}</p>

                    </div>
                    <div className="comment-box">
                        <p className="mb-2">Comments</p>
                        {comments.length !== 0 ?

                            comments.map((data, id) => (
                                <div key={id} className="user-comments p-2">
                                    {/* <MdDelete className="text-danger"/><RiEdit2Fill className="text-primary"/> */}
                                    <p>{data.body}</p>

                                    <p className="user-name">- {data.user.username}</p>
                                </div>
                            ))
                            :
                            // comments.filter((dataComments) => dataComments.postId === posts.id).length === 0 && (<p className="user-comments p-2">no comments..</p>)
                            <p className="user-comments p-2">no comments..</p>



                        }


                    </div>
                </div>

                <div className=" card p-3">
                    <div className="comment-box">




                        <p className="mb-2">Add Comments....</p>
                        <div className="text-area d-flex gap-2">
                            <textarea className="w-75 text-area-1" placeholder="comments..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            <textarea className="w-25" placeholder="enter your name..." value={newUserName} onChange={(e) => setnewUserName(e.target.value)} />
                            <button className="btn" onClick={addComment}>Add</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Comments;