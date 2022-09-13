import React from "react"
import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "./spinner"

const PrivateRoute: React.FC<any> = ({ component: Component, auth: { isAuthenticated, loading } }) => {
  if (loading) return <Spinner />
  if (isAuthenticated) return <Component />

  return <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
