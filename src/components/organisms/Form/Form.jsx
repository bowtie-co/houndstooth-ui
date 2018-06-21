import React from 'react'

const Form = ({ childrenWithExtraProp }) => {
  console.log("Form childrenWithExtraProp", childrenWithExtraProp)

  return (
    <section>
      { childrenWithExtraProp }
    </section>
  )
}

export default Form
