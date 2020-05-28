/*
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateView } from '../actions/ComingsoonForm'
import ComingSoonForm from './ComingsoonForm'

class ComingSoonFormComponent extends Component {
	render () {
		return (
			<ComingSoonForm />
		)
	}
}

const mapStateToProps = store => {
  return {
    sendError: ComingSoonStore.sendError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateView: sendError => dispatch(updateView(sendError))
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ComingSoonFormComponent)
*/