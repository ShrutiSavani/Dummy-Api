import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";
// import Iconload from "./icons8-spinner.gif"
const Posts = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [posts, setPosts] = useState([])

    const [newTitle, setNewTitle] = useState('')
    const [newBody, setNewBody] = useState('')
    const [newUserName, setNewUserName] = useState('')

    useEffect(() => {
        async function apiFun() {
            setIsLoading(true)
            try {
                const responsePosts = await fetch("https://dummyjson.com/posts?limit=150");
                // const responsePosts = await fetch("https://dummyjson.com/posts");
                const responseUsers = await fetch("https://dummyjson.com/users?limit=100");
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
                console.log(postsRes.posts[0].userId)
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
    console.log(posts)


    const addPost = () => {
        if (newTitle === '' || newBody === '' || newUserName === '') {
            alert('all fields are require')
        }
        if (newTitle !== '' && newBody !== '' && newUserName !== '') {
            const updatedPost = [...posts, {
                body: newBody,
                id: posts.length + 1,
                username: newUserName,
                title: newTitle
            }]

            setPosts(updatedPost)
            setNewTitle('')
            setNewBody('')
            setNewUserName('')
        }

    }

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
                <div className="text-end">
                <a href="#add-post" >
                    <abbr title="add post">
                     <MdPostAdd className="post-icon me-5"/>
                     {/* <button className="btn me-5  mb-3">Add Post</button> */}
                     </abbr>
                </a>
                </div>

                {
                    posts.map((post) => {
                        return (
                            <div className="card p-3" id="" onClick={() => { navigatPage(post.id) }}>
                                <div className="card-items">
                                    <p className="post-title">{post.title}</p>
                                    <p className="post-body my-2">{post.body}</p>
                                    <hr className="my-2" />
                                    <p className="user-name">- {post.username}</p>
                                </div>
                            </div >
                        )
                    })
                }

                <div className="card p-3" id="add-post">
                    Add Posts :
                    <textarea onChange={(e) => setNewBody(e.target.value)} value={newBody} className="my-3" placeholder="description..." />
                    <div className="d-flex gap-2">
                        <textarea className="post-text-title" onChange={(e) => setNewTitle(e.target.value)} value={newTitle} placeholder="set title of your post... " />
                        <textarea className="post-text-body" onChange={(e) => setNewUserName(e.target.value)} value={newUserName} placeholder="enter your name..." />
                        <button className="btn" onClick={addPost}>Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Posts;


