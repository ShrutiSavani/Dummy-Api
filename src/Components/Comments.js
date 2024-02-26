import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
const Comments = () => {
    const navigate = useNavigate()

    const { postid } = useParams()
    console.log(postid) //2
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState([])

    async function apiFun() {
        try {

            const responseComments = await fetch("https://dummyjson.com/comments");
            const responsePost = await fetch(`https://dummyjson.com/posts/${postid}`);
            const responseUser = await fetch("https://dummyjson.com/users");

            let commentsData = await responseComments.json();
            let postsData = await responsePost.json();
            let usersData = await responseUser.json();

            console.log(postsData)
            setPosts(postsData)
            setComments(commentsData.comments)
            setUsers(usersData.users)
        } catch (e) {
            console.log('error fetching data : ', e)
        }
    }

    useEffect(() => {
        apiFun()
    }, [])
    return (
        <>
            <Navbar />

            <div className="container-fluid cards" >
                <div className="card p-3">
                    <div className="card-items">

                        <div className="d-flex">
                            <p className="post-title ">{posts.title}</p>
                            {/* <Link to='/'> */}
                            <button className="btn " onClick={() => { navigate(-1) }}>Back</button>
                            {/* </Link> */}
                        </div>
                        <p className="post-body my-2">{posts.body}</p>
                        <hr />
                        {users.map((dataUsers) => dataUsers.id == posts.userId ? <p className="user-name">- {dataUsers.firstName}</p> : "")}

                    </div>
                    <div className="comment-box">
                        <p className="mb-2">Comments</p>
                        {
                            comments.filter((dataComments) => dataComments.postId == posts.id).map((data) => (
                                <div className="user-comments p-2">
                                    <p>{data.body}</p>
                                    <p className="user-name">- {data.user.username}</p>
                                </div>
                            ))
                        }
                        {
                            comments.filter((dataComments) => dataComments.postId == posts.id).length == 0 && (<p className="user-comments p-2">no comments..</p>)
                        }
                    </div>

                </div>
            </div>





        </>

    )
}
export default Comments;