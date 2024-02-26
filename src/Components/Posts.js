import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";
console.log("reder navbar")
const Posts = () => {

    let data, usersData, commentsData;
    const navigate = useNavigate()

    const [post, setPost] = useState([])
    const [users, setUsers] = useState([])

    async function apiFun() {
        try {
            const response = await fetch("https://dummyjson.com/posts");
            const responseUsers = await fetch("https://dummyjson.com/users");
            data = await response.json();
            usersData = await responseUsers.json();
            setPost(data.posts)
            setUsers(usersData.users)

        } catch (e) {
            console.log('error fetching data : ', e)
        }
    }
    useEffect(() => {
        apiFun()
    }, [])

    console.log(post)
    console.log(users)

    const navigatPage = (postid) => {
        navigate(`/comments/${postid}`)
    }



    return (
        <>
            <Navbar />

            <div className="container-fluid cards" >
                {
                    post.map((ele) => {
                        return (
                            <div className="card p-3" id="" onClick={() => { navigatPage(ele.id) }}>
                                <div className="card-items">
                                    <p className="post-title">{ele.title}</p>
                                    <p className="post-body my-2">{ele.body}</p>
                                    <hr className="my-2" />
                                    {users.map((dataUser) => dataUser.id == ele.userId ? <p className="user-name">- {dataUser.firstName}</p> : "")}
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


