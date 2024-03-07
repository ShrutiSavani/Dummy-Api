import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPosts, deletePostsById, getAllPost, updatePostById } from "../services/posts.service";
import { getAllUser } from "../services/users.service";
import AddPosts from "./AddPosts";
import { MdPostAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import useFetchData from "../Hooks/useFetchData";

const Posts = () => {
    const navigate = useNavigate()
    const [editPostId, setEditPostId] = useState(null)
    const [editTitle, setEditTitle] = useState()
    const [editBody, setEditBody] = useState()
    const { loading: isLoading, error: isError, data: posts, setData: setPosts } = useFetchData(getAllPost)
    const { data: users } = useFetchData(getAllUser)

    useEffect(() => {
        const fun = () => {
            console.log('enter')
            console.log('users', users)
            console.log('posts', posts)
            const fetchedPosts = (posts || []).map((post) => {
                const user = users.find((user) => user.id === post.userId);
                return {
                    ...post,
                    username: user?.username,
                };
            });
            setPosts(fetchedPosts)
        }
        fun()
    }, [users])

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

    const navigatPage = (postid) => {
        navigate(`/posts/${postid}`)
    }

    const addPostsApi = async (newPostDetails) => {
        try {
            const addPost = await addPosts(newPostDetails);
            addPost.username = "abcd"
            setPosts([...posts, addPost])
        }

        catch (e) {
            console.log('error fetching data : ', e)
        }
    }

    const onAddPost = (newPostDetails) => {
        if (newPostDetails.body === '' || newPostDetails.title === '') {
            alert('all fields are require')
        } else {
            addPostsApi(newPostDetails)
        }
    }

    const deletePostApi = async (postIdForDelete) => {
        try {
            const deletePost = await deletePostsById(postIdForDelete)
            setPosts(posts.filter((post) => post.id !== postIdForDelete))
        }

        catch (e) {
            console.log('error fetching data : ', e)
        }
    }

    const handleDeleting = (postIdForDelete) => {
        if (window.confirm('are you sure to delete???')) {
            deletePostApi(postIdForDelete)
        }
    }

    const updatePostApi = async (id) => {
        const updatePost = await updatePostById(id, editBody, editTitle, posts)
        // const updatedPost = posts.map((post) => {
        //     if (post.id == id) {
        //         return {
        //             ...post,
        //             title: editTitle,
        //             body: editBody
        //         }
        //     }
        //     return post;
        // })

        // { editTitle == '' || editBody == '' ? alert('both field are compulsory') : setPosts(updatedPost) }

        { editTitle == '' || editBody == '' ? alert('both field are compulsory') : setPosts(updatePost) }
        setEditPostId(null)
    }

    const handleEditing = (post) => {
        setEditPostId(post.id)
        setEditTitle(post.title)
        setEditBody(post.body)
    }

    const saveUpdatedPost = (id, post) => {
        updatePostApi(id, post)
    }

    return (
        <>
            <div className="container-fluid cards" >
                <div className="text-end">
                    <a href="#add-post" >
                        <abbr title="add post">
                            <MdPostAdd className="post-icon me-5" />
                        </abbr>
                    </a>
                </div>

                {posts &&
                    posts.map((post) => {
                        return (
                            <div className="card p-3" id="" key={post.id} onClick={() => { navigatPage(post.id) }}>

                                <div className="card-items">

                                    {editPostId == post.id ? (
                                        <>
                                            <div className="d-flex">
                                                <input className="post-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onClick={(e) => e.stopPropagation()}></input>
                                            </div>
                                            <textarea rows={5} className="post-body my-2" value={editBody} onChange={(e) => setEditBody(e.target.value)} onClick={(e) => e.stopPropagation()}></textarea>
                                            <button className="btn" onClick={(e) => {
                                                e.stopPropagation()
                                                saveUpdatedPost(post.id, post)
                                            }}>Save</button>

                                        </>

                                    ) : (
                                        <>
                                            <div className="d-flex">
                                                <p className="post-title">{post.title}</p>
                                                <MdDelete className=" delete-icon" onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleting(post.id)
                                                }} />
                                                <RiEdit2Fill className="edit-icon" onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEditing(post)
                                                }} />
                                            </div>
                                            <p className="post-body my-2">{post.body}</p>
                                        </>

                                    )}
                                    <hr className="my-2" />
                                    <p className="user-name">- {post.username}</p>

                                </div>

                            </div >
                        )
                    })
                }

                <AddPosts onAddPost={onAddPost} />
            </div>
        </>
    )
}
export default Posts;


