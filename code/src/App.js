import React, { useEffect, useState } from "react";
import { HappyThought } from "./components/HappyThought";
import { HappyForm } from "./components/HappyForm";

const url = "https://swolfson-happy.herokuapp.com/thoughts";

// new thought & postmessage
export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [postedMessage, setPostedMessage] = useState("");

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setThoughts(json));
  }, [postedMessage]);

  const onFormSubmit = message => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => setPostedMessage(message))
      .catch(err => console.log("error:", err));
  };

  const onLikedClick = thoughtId => {
    console.log(thoughtId);

    const updateThought = () =>
      thoughts.map(thought => {
        if (thought._id === thoughtId) {
          thought.heart += 1;
        }
        return thought;
      });
    setThoughts(updateThought);
  };

  return (
    <section>
      <HappyForm onFormSubmit={onFormSubmit} />
      <div className="container">
        {thoughts.map(thought => (
          <HappyThought
            key={thought._id}
            thought={thought}
            onLikedClick={onLikedClick}
          />
        ))}
      </div>
    </section>
  );
};
