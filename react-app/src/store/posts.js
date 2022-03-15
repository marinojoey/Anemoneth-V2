// ------------------- Action types ------------------- //
const GET_POSTS = 'posts/GET_POSTS';
const GET_ONE_POST = 'posts/GET_ONE_POST';
const GET_USER_POSTS = 'posts/GET_USER_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
// const UPDATE_POST = 'posts/UPDATE_POST';
// const DELETE_POST = 'posts/DELETE_POST';
// const SEARCH_POSTS = 'posts/SEARCH_POSTS';



// ------------------- Action creators ------------------- //
const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

const getOnePost = post => ({
    type: GET_ONE_POST,
    post
});

const getUserPosts = posts => ({
    type: GET_USER_POSTS,
    posts
});

const createPost = post => ({
    type: CREATE_POST,
    post
});

// const updatePost = post => ({
//     type: UPDATE_POST,
//     post
// });

// const deletePost = post => ({
//     type: DELETE_POST,
//     post
// });

// const searchPosts = () => ({
//     type: SEARCH_POSTS
// });


// ------------------- Thunk creators ------------------- //
export const getAllPosts = () => async dispatch => {
    const response = await fetch(`/api/posts/all`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getPosts(data));
        return data;
    }
};

export const getSinglePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        // console.log('====RESPOOOOOONSE', data)

        dispatch(getOnePost(data));
        return data;
    }
};

export const getAllUserPosts = (username) => async dispatch => {
    const response = await fetch(`/api/posts/user/${username}/posts`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getUserPosts(data));
        return data;
    }
};

export const addPost = ({ user_id, title, caption }) => async dispatch => {
    console.log('----inside store')
    const response = await fetch(`/api/posts/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            title,
            caption
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data));
        return;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        };
    }
};

// export const updateOnePost = ({ post_id, title, caption }) => async dispatch => {
//     const response = await fetch(`/api/posts/${post_id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             post_id,
//             title,
//             caption
//         })
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(updatePost(data));
//         return;
//     } else {
//         const data = await response.json();
//         if (data.errors) {
//             // console.log('HEYYYYYYYYYY', data.errors)
//             return data.errors;
//         };
//     }
// };

// export const deleteOnePost = postId => async dispatch => {
//     const response = await fetch(`/api/posts/${postId}`, {
//         method: 'DELETE'
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(deletePost(data));
//         return;
//     } else {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         };
//     }
// };

// export const searchAllPosts = () => async dispatch => {
//     const response = await fetch('/api/posts/search')

//     if (response.ok) {
//         const data = await response.json();

//         dispatch(searchPosts(data));
//         return data;
//     }
// }



// ------------------- Initial state ------------------- //
const initialState = {};



// ------------------- Reducer ------------------- //
export default function postsReducer(state = initialState, action) {

    switch (action.type) {
        case GET_POSTS: {
            const newState = { ...state }
            for (const key in action.posts) {
                newState[action.posts[key].id] = action.posts[key]
            }
            return newState;
        };
        case GET_ONE_POST: {
            const newState = {
                ...state,
                [action.post.id]: action.post
            };
            return newState;
        };
        case GET_USER_POSTS: {
            const newState = { ...state }
            for (const key in action.posts) {
                newState[action.posts[key].id] = action.posts[key]
            }
            return newState;
        };
        case CREATE_POST: {
            const newState = {
                ...state,
                [action.post.id]: action.post
            };
            return newState;
        };
        // case UPDATE_POST: {
        //     const newState = {
        //         ...state,
        //         [action.post.id]: action.post
        //     };
        //     return newState;
        // };
        // case DELETE_POST: {
        //     const newState = { ...state };
        //     delete newState[action.post.id];
        //     return newState;
        // };

        default:
            return state;
    };
};
