/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import "./styles.css"
import { createBrotliDecompress } from "zlib"

export default function Minutes({ date = new Date() }) {
  const [minutes, setMinutes] = useState(5)

  // ! tight error handling
  const [error, setError] = useState(null)

  function handleAdd() {
    setMinutes(minutes + 1)
  }

  function handleSubtract() {
    if (minutes > 0) {
      setMinutes(minutes - 1)
    } else {
      setError("greater than 0, dawg")
    }
  }

  return (
    <div className="Minutes">
      <div>
        <button
          type="button"
          className="icon_button Minutes_button"
          onClick={handleSubtract}
        >
          <FaMinus />
        </button>
      </div>
      <input className="Minutes_input" value={minutes} id="minutes" />
      <div>
        <button
          type="button"
          className="icon_button Minutes_button"
          onClick={handleAdd}
        >
          <FaPlus />
        </button>
      </div>
      <label className="Minutes_label" htmlFor="minutes">
        Minutes
      </label>
      <marquee>{error && <div>{error}</div>}</marquee>
    </div>
  )
}

// ! let el = Minutes()
// ! let domTable = {}
// ! createDOM(el, domTable)
// ! let oldEL = el

// ! el = Minutes()
// ! let diff = compare(oldEl, el)
// ! commits(diff)
