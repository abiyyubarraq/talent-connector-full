import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addExperience } from "../../actions/profile"

const AddExperience: React.FC<any> = ({ addExperience }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    from: "",
    to: "",
    description: "",
  })

  const { company, title, from, to, description } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          let experience = formData
          addExperience(experience, navigate)
        }}
      >
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
        </div>

        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} />
        </div>
        <div className="form-group">
          <textarea name="description" cols={30} rows={5} placeholder="Job Description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(AddExperience)
