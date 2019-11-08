import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // !!! console log games boysssssss

  const handleShowPassword = () =>
    console.log("pass") || setShowPassword(!showPassword)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    const [emailNode, passwordNode] = e.target.elements
    login(emailNode.value, passwordNode.value).catch(error => {
      console.log(error.message)
      setLoading(false)
      setError(error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: "red" }}>
          <p>oh danggggggg</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showPassword}
            onChange={handleShowPassword}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{loading ? "...loading" : "Login"}</span>
      </TabsButton>
    </form>
  )
}
