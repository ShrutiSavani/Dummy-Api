import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Comments = () => {
    const navigate = useNavigate()

    const { postid } = useParams()
    // console.log(postid) //2

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState([])


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
                        {
                            comments.filter((dataComments) => dataComments.postId === posts.id).map((data) => (
                                <div key={data.id} className="user-comments p-2">
                                    <p>{data.body}</p>
                                    <p className="user-name">- {data.user.username}</p>
                                </div>
                            ))
                        }
                        {
                            comments.filter((dataComments) => dataComments.postId === posts.id).length === 0 && (<p className="user-comments p-2">no comments..</p>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Comments;