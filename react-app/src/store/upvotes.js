// ------------------- Action types ------------------- //
const GET_UPVOTES = 'saved/GET_UPVOTES';
const GET_USER_UPVOTES = 'saved/GET_USER_UPVOTES';
const ADD_UPVOTE = 'saved/ADD_UPVOTE';
// const DELETE_UPVOTE = 'saved/DELETE_UPVOTE';



// ------------------- Action creators ------------------- //
const getUpvotes = upvotes => ({
    type: GET_UPVOTES,
    upvotes
});

const getUserUpvotes = upvotes => ({
    type: GET_USER_UPVOTES,
    upvotes
});

const addUpvotes = upvote => ({
    type: ADD_UPVOTE,
    upvote
});

// const deleteUpvote = upvote => ({
//     type: DELETE_UPVOTE,
//     upvote
// });



// ------------------- Thunk creators ------------------- //
export const getPostUpvotes = (postId) => async dispatch => {
    const response = await fetch(`/api/upvotes/post/${postId}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getUpvotes(data));
        return data;
    }
}

export const getUsersUpvotes = (username) => async dispatch => {
    const response = await fetch(`/api/upvotes/user/${username}`);

    // console.log('---------------', response)

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getUserUpvotes(data));
        return data;
    }
}

export const upvotePost = (username, postId) => async (dispatch) => {
    const response = await fetch(`/api/upvotes/post/${postId}/user/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, postId }),
    });
    // console.log('---------inside store', response)

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addUpvotes(data));
        return data;
    }
};

// export const removeUpvote = (username, postId) => async (dispatch) => {
//     if (post_id) {
//         const response = await fetch(`/api/upvotes/post/${postId}/user/${username}`, {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, postId }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             if (data.errors) {
//                 return;
//             }

//             dispatch(deleteUpvote(data));
//             return data;
//         }
//     }
// };



// ------------------- Initial state ------------------- //
const initialState = {};



// ------------------- Reducer ------------------- //
export default function savedReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_UPVOTES: {
            const newState = { ...state }
            for (const key in action.upvotes) {
                newState[action.upvotes[key].id] = action.upvotes[key]
            }
            return newState;
        }
        case GET_USER_UPVOTES: {
            const newState = { ...state }
            for (const key in action.upvotes) {
                newState[action.upvotes[key].id] = action.upvotes[key]
            }
            return newState;
        }
        case ADD_UPVOTE: {
            newState = { ...state, [action.upvote.id]: action.upvote };
            return newState;
        }
        // case DELETE_UPVOTE: {
        //     newState = { ...state };
        //     delete newState[action.upvote.id];
        //     return newState;
        // }

        default:
            return state;
    }
}
