
import React, { useState } from "react"
import "./HappyForm.css"


const url = "https://technigo-thoughts.herokuapp.com/"

export const HappyForm = props => {
  const [message, setMessage] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    props.onFormSubmit(message)
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setMessage("")
        props.onFormSubmit(message)
      })
      .catch(err => console.log("error:", err))
  }
  return (
    <form className='happy-form'>
      <h2>Post a happy thought!</h2>
      <textarea
        rows='3'
        value={message}
        onChange={event => setMessage(event.target.value)}
      >

      </textarea>
      <div className='formFooter'>
        <button
          className="formBtn"
          type='submit'
          onClick={handleSubmit}
          disabled={message.length < 6 || message.length > 140 ? true : false}>
          <p><span role="img" aria-label="icon">
            ❤️ Send a happy thought! ❤️
          </span></p>
        </button>

        <p className="length">{message.length} / 140</p>
      </div>
    </form >
  )
}