export const getAllPost = async () => {
    const responsePosts = await fetch("https://dummyjson.com/posts?limit=150");
    const postsRes = await responsePosts.json();
    return postsRes;
}

export const getPostById = async (postId) => {
    const responsePost = await fetch(`https://dummyjson.com/posts/${postId}`);
    const postRes = await responsePost.json();
    return postRes;
}

export const addPosts = async (newPostDetails) => {
    const responseAddPosts = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: newPostDetails.body,
            title: newPostDetails.title,
            userId: 5,
        })
    })
    const addPostsRes = await responseAddPosts.json();
    return addPostsRes;
}

export const deletePostsById = async (postId) => {
    const responseDeletePosts = await fetch(`https://dummyjson.com/Posts/${postId}`, {
        method: 'DELETE',
    })
    const deletePostsRes = await responseDeletePosts.json()
    return deletePostsRes;
}

export const updatePostById = async (postId) => {
    const responseUpdatePost = await fetch(`https://dummyjson.com/posts/${postId}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'I think I should shift to the moon',
        })
    })
    const updatePostRes = await responseUpdatePost.json()
    return updatePostRes;
}