import React from "react"
import moment from "moment"

import "./HappyThought.css"



export const HappyThought = props => {
  const { message, hearts, createdAt, _id } = props.thought

  const handleClickHeart = () => {
    fetch(`https://technigo-thoughts.herokuapp.com/${_id}/like`, {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" }
    }).then(() => props.onLikedClick(_id))
  }


  return (

    <article className='happyThought'>
      <div className="message">
        <h3>{message}</h3>
      </div>


      <button
        className="heart"
        onClick={handleClickHeart} >
        <span role='img' aria-label='Heart'>
          {"❤️"}
        </span>
        <p className="likes">{hearts}</p>
      </button>
      <div className="moments">
        <p>{moment(createdAt).fromNow()}</p>
      </div>

    </article>


  )
}