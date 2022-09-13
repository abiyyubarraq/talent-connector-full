import React, { Fragment, useState, useEffect } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createProfile, getCurrentProfile, updateProfile } from "../../actions/profile"
import store from "../../store"

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  website: "",
  status: "",
  skills: "",
  bio: "",
  linkedin: "",
  instagram: "",
}

const ProfileForm: React.FC<any> = ({ profile: { profile, loading }, createProfile, updateProfile, getCurrentProfile }) => {
  const [formData, setFormData] = useState(initialState)

  const creatingProfile = useMatch("/create-profile")

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile()

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData: any = { ...initialState }
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key]
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key]
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills)) profileData.skills = profileData.skills.join(", ")
      // set local state with the profileData
      setFormData(profileData)
    }
  }, [loading, getCurrentProfile, profile])

  const { website, status, skills, bio, linkedin, instagram } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (store.getState().profile.profile) {
      updateProfile(formData, navigate, profile ? true : false)
    } else {
      createProfile(formData, navigate, profile ? true : false)
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">{creatingProfile ? "Create Your Profile" : "Edit Your Profile"}</h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile ? ` Let's get some information to make your` : " Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="status" name="status" value={status} onChange={onChange} />
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          <small className="form-text">Could be your own or a company website</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
          <small className="form-text">Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  )
}

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state: any) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, updateProfile, getCurrentProfile })(ProfileForm)
