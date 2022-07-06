// import React, { useReducer } from "react";
// import ReactDOM from "react-dom";
// import { MdThumbUp, MdThumbDown } from "react-icons/md";
// const HANDLE_LIKE = Symbol("HANDLE_LIKE");
// const HANDLE_DISLIKE = Symbol("HANDLE_DISLIKE");
// const initialState = {
//   likes: 970,
//   dislikes: 68,
//   active: null,
// };

// const reducer = (state, action) => {
//   const { likes, dislikes, active } = state;

//   switch (action.type) {
//     case HANDLE_LIKE:
//       return {
//         ...state,
//         likes: state.likes + 1,
//         dislikes: active === "dislike" ? dislikes - 1 : dislikes,
//         active: "like",
//       };
//     case HANDLE_DISLIKE:
//       return {
//         ...state,
//         likes: active === "like" ? likes - 1 : likes,
//         active: "dislike",
//         dislikes: dislikes + 1,
//       };
//     default:
//       return state;
//   }
// };

// const LikeOrDislike = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { likes, dislikes, active } = state;
//   return (
//     <div style={{ display: "flex" }}>
//       <button
//         style={{
//           color: active === "like" ? "green" : "#686868",
//           marginRight: "10px",
//           // background: "rgb(0 128 0 / 15%)",
//           border: "2px solid",
//         }}
//         onClick={() =>
//           active !== "like" ? dispatch({ type: HANDLE_LIKE }) : null
//         }
//       >
//         <strong>
//           <MdThumbUp />
//         </strong>
//         &nbsp;|&nbsp;
//         {likes}
//       </button>
//       <button
//         style={{
//           color: active === "dislike" ? "red" : "#686868",
//           // background: "rgb(255 0 0 / 20%)",
//           border: "2px solid",
//         }}
//         onClick={() =>
//           active !== "dislike" ? dispatch({ type: HANDLE_DISLIKE }) : null
//         }
//       >
//         <strong>
//           <MdThumbDown />
//         </strong>
//         &nbsp;|&nbsp;
//         {dislikes}
//       </button>
//     </div>
//   );
// };

// export default LikeOrDislike;


import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import '../Review/index.scss'
import {FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { MdThumbUp, MdThumbDown } from "react-icons/md";
const HANDLE_LIKE = Symbol("HANDLE_LIKE");
const HANDLE_DISLIKE = Symbol("HANDLE_DISLIKE");


const initialState = {
  // likes: 970,
  // dislikes: 68,
  active: null,
};



const reducer = (state, action) => {
  const { likes, dislikes, active } = state;

  switch (action.type) {
    case HANDLE_LIKE:
      return {
        ...state,
        likes: state.likes + 1,
        dislikes: active === "dislike" ? dislikes - 1 : dislikes,
        active: "like",
      };
    case HANDLE_DISLIKE:
      return {
        ...state,
        likes: active === "like" ? likes - 1 : likes,
        active: "dislike",
        dislikes: dislikes + 1,
      };
    default:
      return state;
  }
};

const LikeOrDislike = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { likes, dislikes, active } = state;
  return (
    <div style={{ display: "flex" }} className="reviewStyles px-0">
     
     <button className="thumb-down px-1 py-2  "
        style={{
          color: active === "dislike" ? "red" : "#686868",
          // background: "rgb(255 0 0 / 20%)",
          marginRight: "10px",
          border: "1px solid",
        }}
        onClick={() =>
          active !== "dislike" ? dispatch({ type: HANDLE_DISLIKE }) : null
        }
      >
        <strong className="thumb-down">
          <FaThumbsDown size= "30" className="thumb-down"/>
        </strong>
        {/* &nbsp;|&nbsp; */}
        {/* {dislikes} */}
      </button> 
      <button className="thumb-up thumbUp px-1 py-2"
        style={{
          color: active === "like" ? "green" : "#686868",
          marginRight: "10px",
          // background: "rgb(0 128 0 / 15%)",
          border: "1px solid",
        }}
        onClick={() =>
          active !== "like" ? dispatch({ type: HANDLE_LIKE }) : null
        }
      >
            <strong className="thumb-up thumbUp1">
          <FaThumbsUp  size= "30" className="thumb-up"/>
        </strong>
        {/* &nbsp;|&nbsp; */}
        {/* {likes} */}
      </button>
    </div>
  );
};

export default LikeOrDislike;

