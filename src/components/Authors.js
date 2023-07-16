// Authors.js
import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const formik = useFormikContext();

  const handleAddAuthor = (values, { resetForm }) => {
    const newAuthor = {
      name: values.name,
      birthDate: values.birthDate,
      biography: values.biography,
    };
    setAuthors([...authors, newAuthor]);
    resetForm();
  };

  const handleEditAuthor = (index, values, { resetForm }) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = {
      name: values.name,
      birthDate: values.birthDate,
      biography: values.biography,
    };
    setAuthors(updatedAuthors);
    setEditIndex(-1);
    resetForm();
  };

  const handleDeleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  const handleEditButtonClick = (index, author) => {
    setEditIndex(index);
    formik.setValues({
      name: author.name,
      birthDate: new Date(author.birthDate).toISOString().substring(0, 10), // Convert to ISO date format
      biography: author.biography,
    });
  };

  return (
    <div className="authors">
      <h3 className="section-title">Add Author</h3>
      <Formik
        initialValues={{
          name: '',
          birthDate: '',
          biography: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }
          // Add validation rules for other fields
          return errors;
        }}
        onSubmit={
          editIndex === -1 ? handleAddAuthor : (values, { resetForm }) => handleEditAuthor(editIndex, values, { resetForm })
        }
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="authors-form">
            <div className="form-field">
              <label className="form-label">Name:</label>
              <Field type="text" name="name" className="form-input" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="form-label">Birth Date:</label>
              <Field type="date" name="birthDate" className="form-input" />
              <ErrorMessage name="birthDate" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="form-label">Biography:</label>
              <Field type="text" name="biography" className="form-input" />
              <ErrorMessage name="biography" component="div" className="error" />
            </div>
            <button type="submit" className="submit-btn">
              {editIndex === -1 ? 'Add Author' : 'Update Author'}
            </button>
          </form>
        )}
      </Formik>

      <h3 className="section-title">Authors</h3>
      <ul className="list">
        {authors.map((author, index) => (
          <li key={index} className="list-item">
            <div className="author-name">Name: {author.name}</div>
            <div>Birth Date: {author.birthDate}</div>
            <div>Biography: {author.biography}</div>
            <button onClick={() => handleDeleteAuthor(index)} className="delete-btn">
              Delete
            </button>
            <button onClick={() => handleEditButtonClick(index, author)} className="edit-btn">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Authors;
