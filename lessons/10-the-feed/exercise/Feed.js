import React, { useState, useEffect, useReducer } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
import { userInfo } from "os"
import { stat } from "fs"
import FeedFinal from "./Feed.final"
export default FeedFinal
// export default Feed

function Feed() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOADED_POSTS":
          return { ...state, posts: action.posts }
        case "LOAD_NEW_POSTS":
          return { ...state, posts: action.posts }
        default:
          return state
      }
    },
    {
      newPosts: [],
      posts: [],
      createdAt: Date.now(),
      limit: 3
    }
  )

  const [newPosts, setNewPosts] = useState([])
  // const [posts, setPosts] = useState([fakePost])
  const [createdAt, setCreatedAt] = useState(Date.now())
  const [limit, setLimit] = useState(3)

  useEffect(() => {
    let current = true
    if (current) {
      loadFeedPosts(createdAt, limit).then(posts => {
        dispatch({ type: "LOADED_POSTS" })
      })
    }
    return () => (current = false)
  }, [createdAt, limit])

  useEffect(() => {
    return subscribeToNewFeedPosts(createdAt, newPosts => {
      setNewPosts(newPosts)
    })
  }, [createdAt])

  function handleViewMore() {
    setLimit(limit + 3)
  }

  function handleViewNew() {
    setCreatedAt(Date.now())
    setLimit(limit + newPosts.length)
    dispatch({ type: "LOAD_NEW_POSTS" })
    setNewPosts([])
  }

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button
            className="Feed_new_posts_button icon_button"
            onClick={handleViewNew}
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {state.posts.map(post => {
        return <FeedPost key={post.createdAt} post={post} />
      })}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
    </div>
  )
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}
