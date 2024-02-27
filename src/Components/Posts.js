import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Iconload from "./icons8-spinner.gif"
const Posts = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [posts, setPosts] = useState([])


    useEffect(() => {
        async function apiFun() {
            setIsLoading(true)
            try {
                const responsePosts = await fetch("https://dummyjson.com/posts");
                const responseUsers = await fetch("https://dummyjson.com/users");
                const postsRes = await responsePosts.json();
                const usersRes = await responseUsers.json();

                const users = usersRes.users || [];
                const fetchedPosts = (postsRes.posts || []).map((post) => {
                    const user = users.find((user) => user.id === post.userId);
                    return {
                        ...post,
                        username: user?.username,
                    };
                });

                // fetchedPosts aa postsRes.posts j chhe but ema username push thai gyu.....
                // console.log(fetchedPosts)
                setPosts(fetchedPosts)

            } catch (e) {
                console.log('error fetching data : ', e)
                setIsError("oops!! error in fetching data.....")
            }
            setIsLoading(false);
        }
        apiFun()
    }, [])


    if (isLoading) {
        return (
            <span class="loader"></span>
            // <img src={Iconload}/> 
        )
    }
    if (isError) {
        return (

            <span className="error-text text-danger fw-bold">{isError}</span>
        )
    }
    const navigatPage = (postid) => {
        navigate(`/posts/${postid}`)
    }



    return (
        <>
            <div className="container-fluid cards" >
                {
                    posts.map((post) => {
                        return (
                            <div className="card p-3" id="" onClick={() => { navigatPage(post.id) }}>
                                <div className="card-items">
                                    <p className="post-title">{post.title}</p>
                                    <p className="post-body my-2">{post.body}</p>
                                    <hr className="my-2" />
                                    <p className="user-name">{post.username}</p>
                                </div>
                            </div >
                        )
                    })
                }
            </div>
        </>
    )
}
export default Posts;


