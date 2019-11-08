import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
// import SignupForm from "./SignupForm.final"
// export default SignupForms

const TextInput = ({ id, label, type = "text" }) => {
  return (
    <>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <input id={id} type={type} placeholder={label} required />
    </>
  )
}

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <TextInput id="displayName" label="Display Name" />
      <TextInput id="photoURL" label="Photo URL" />
      <TextInput id="email" label="Email" />
      <TextInput id="password" label="password" />
      <p>
        <span>Start:</span>{" "}
        <DateFields value={new Date()}>
          <MonthField aria-label="Start Month" /> /{" "}
          <DayField aria-label="Start Day" /> /{" "}
          <YearField start={2018} end={2019} aria-label="Start year" />
        </DateFields>
      </p>
      <TabsButton>
        <FaDumbbell />
        <span>Submit, fool!</span>
      </TabsButton>
    </form>
  )
}
