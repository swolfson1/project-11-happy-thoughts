import React, { useEffect, useState } from "react"
import { HappyThought } from "./components/HappyThought"
import { HappyForm } from "./components/HappyForm"

const url = "https://technigo-thoughts.herokuapp.com/"

// new thought & postmessage
export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [postedMessage, setPostedMessage] = useState("")// needed to refetch the array with new message


  // Fetching and listing the json in  the setThoughts
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setThoughts(json))

  }, [postedMessage])

  const onFormSubmit = message => {
    setPostedMessage(message) //Added to message to postmessage  form to the array of thouhgts without  using the fetch again
  }

  const onLikedClick = thoughtId => {
    console.log(thoughtId)

    const updateThought = () =>
      thoughts.map(thought => {
        if (thought._id === thoughtId) {  //setting the id
          thought.hearts += 1
        }
        return thought // Returning the new thought.
      })
    setThoughts(updateThought) // updates
  }

  return (
    <section>
      <HappyForm onFormSubmit={onFormSubmit} />
      <div className="container">
        {thoughts.map(thought => (
          <HappyThought key={thought._id} thought={thought} onLikedClick={onLikedClick} />
        ))}
      </div>

    </section>
  )
}
