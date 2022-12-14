import React, { useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { authState } from "../../actions/types"

const Landing: React.FC<any> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Talent Connector</h1>
          <p className="lead">Create your talent profile/portfolio, share posts and get collab with another talented people</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
