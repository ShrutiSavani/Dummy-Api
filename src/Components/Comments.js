import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../services/posts.service";
import { getUserById } from "../services/users.service";
import { addComments, deleteCommentsById, getCommentsByPostId, updateCommentById } from "../services/comments.service";
import AddComments from "./AddComments";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import useFetchData from "../Hooks/useFetchData";

const Comments = () => {
    const { postid } = useParams()
    const [disabledBtn, setdisabledBtn] = useState(false);
    const [editedComment, setEditedComment] = useState()
    const [editCommentId, setEditCommentId] = useState()
    const { loading: isLoading, error: isError, data: post } = useFetchData(getPostById, postid)
    const { data: comments, setData: setComments } = useFetchData(getCommentsByPostId, postid)
    const userid = post?.userId
    const { data: user } = useFetchData(getUserById, userid)

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

    const addCommentApi = async (newCommentDetails) => {
        setdisabledBtn(true);

        try {
            const addComment = await addComments(newCommentDetails, postid)
            setComments([...comments, addComment])
            // setComments((prevComments) => [...prevComments, addComment]);
            setdisabledBtn(false);
        }

        catch (e) {
            console.log('error fetching comment : ', e)
        }
    }

    const onAddComment = (newCommentDetails) => {
        if (newCommentDetails.body === '' || newCommentDetails.title === '') {
            alert('all fields are require')
        } else {
            addCommentApi(newCommentDetails)
        }
    };

    const deleteCommentApi = async (commentIdForDelete) => {
        try {
            const deleteComment = await deleteCommentsById(commentIdForDelete)
            setComments(comments.filter((comment) => comment.id !== commentIdForDelete))
        }

        catch (e) {
            console.log('error fetching comment : ', e)
        }
    }

    const handleDeleting = (commentIdForDelete) => {
        if (window.confirm('are you sure to delete???')) {
            deleteCommentApi(commentIdForDelete)
        }
    }

    const updateCommentApi = async (id) => {
        try {
            const updateComment = await updateCommentById(id, editedComment, comments)

            // server side updation completed
            //console.log(updateComment)

            // const updatedComment = comments.map((comment) => {
            //     if (comment.id == id) {
            //         return { ...comment, body: editedComment }
            //     }
            //     return comment
            // })
            // setComments(updatedComment)

            { editedComment == '' ? alert('empty comment not valid') : setComments(updateComment) }
            setEditCommentId(null)
        }

        catch (e) {
            console.log('error fetching comment : ', e)
        }
    }

    const handleEditing = (comment) => {
        setEditedComment(comment.body)
        setEditCommentId(comment.id)
    }

    const saveUpdatedComment = (id) => {
        updateCommentApi(id)
    }

    return (
        <>
            <div className="container-fluid cards" >
                <div className="card p-3">
                    <div className="card-items">

                        <div className="d-flex">
                            <p className="post-title ">{post.title}</p>
                            <Link to='/'> <button className="btn ">Back</button></Link>
                        </div>
                        <p className="post-body my-2">{post.body}</p>
                        <hr />
                        <p className="user-name">{post.username}</p>
                        <p className="user-name">- {user?.username}</p>

                    </div>
                    <div className="comment-box">
                        <p className="mb-2">Comments</p>
                        {comments && comments.length !== 0 ? (

                            comments.map((comment, index) => (
                                <div key={index} className="user-comments mb-2 p-2" >

                                    {editCommentId == comment.id ? (
                                        <div className="d-flex gap-2">
                                            <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} ></textarea>
                                            <button className="btn" onClick={() => saveUpdatedComment(comment.id)}>Save</button>
                                        </div>
                                    ) : (
                                        <div className="d-flex" >
                                            <p className="comment-body" >{comment.body}</p>
                                            <MdDelete className="delete-icon " onClick={() => handleDeleting(comment.id)} />
                                            <RiEdit2Fill className=" edit-icon" onClick={(e) => handleEditing(comment)} />
                                        </div>
                                    )}
                                    <hr />
                                    <p className="user-name">- {comment.user.username}</p>
                                </div>
                            )))
                            : (
                                <p className="user-comments p-2">no comments..</p>
                            )
                        }
                    </div>
                </div>

                <AddComments disabledBtn={disabledBtn} onAddComment={onAddComment} />
            </div>
        </>
    )
}
export default Comments;