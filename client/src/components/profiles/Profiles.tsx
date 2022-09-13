import React, { Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "../layout/spinner"
import ProfileItem from "./ProfileItem"
import { getProfiles } from "../../actions/profile"
import store from "../../store"

const Profiles: React.FC<any> = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with developers
          </p>
          <div className="profiles">{profiles.length > 0 ? profiles.map((profile: any) => <ProfileItem key={profile._id} profile={profile} />) : <h4>No profiles found...</h4>}</div>
        </Fragment>
      )}
    </section>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
