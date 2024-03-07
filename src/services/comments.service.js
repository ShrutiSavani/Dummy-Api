export const getCommentsByPostId = async (postId) => {
    const responseComments = await fetch(`https://dummyjson.com/posts/` + postId + `/comments`);
    let commentsRes = await responseComments.json();
    return commentsRes;
}

export const addComments = async (newCommentDetails, postId) => {
    const responseAddComments = await fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: newCommentDetails.body,
            postId: parseInt(postId),
            userId: 5,
        })
    })
    const addCommentsRes = await responseAddComments.json()
    return addCommentsRes;
}

export const deleteCommentsById = async (commentId) => {
    const responseDeleteComments = await fetch(`https://dummyjson.com/comments/${commentId}`, {
        method: 'DELETE',
    })
    const deleteCommentRes = await responseDeleteComments.json();
    return deleteCommentRes;
}

export const updateCommentById = async (commentId,editedComment,comments) => {
    const responseUpdateComments = await fetch(`https://dummyjson.com/comments/${commentId}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: editedComment,
        })
    })
    // const updateCommentRes = await responseUpdateComments.json();
    // return updateCommentRes;
    const updatedComment = comments.map((comment) => {
        if (comment.id == commentId) {
            return { ...comment, body: editedComment }
        }
        return comment
    })
    return updatedComment;
}