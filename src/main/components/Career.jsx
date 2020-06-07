import React, { Component } from 'react'

const CareerHeader = () => {
  return (
    <div className="career-header">
      <h1>Career Team</h1>
      <h2>Commission Plan</h2>
    </div>
  )
}

const CareerScheme = () => {
  return (
    <div className="career-scheme">
        <img
          src="img/career-strips.png"
          srcSet="img/career-strips@2x.png 2x, img/career-strips@3x.png 3x"
          alt="career-strips"
        />
      </div>
  )
}

const CareerText = () => {
  return (
    <div className="career-text">
      <p>
        Commissions are a part of the weekly earnings of partners in your
        downline.
      </p>
      <p>
        The exact percentage depends on which level of your downline a partner
        is seated and on which product you choose.
      </p>
    </div>
  )
}

class Career extends Component {
  render () {
    return (
      <section className="career">
        <div className="wrapper career-wrapper">
          <CareerHeader />
          <CareerScheme />
          <CareerText />
        </div>
      </section>
    )
  }
}

export default Career