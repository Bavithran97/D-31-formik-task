// Books.js
import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';

function Books() {
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const formik = useFormikContext();

  const handleAddBook = (values, { resetForm }) => {
    const newBook = {
      title: values.title,
      author: values.author,
      isbn: values.isbn,
      publicationDate: values.publicationDate,
    };
    setBooks([...books, newBook]);
    resetForm();
  };

  const handleEditBook = (index, values, { resetForm }) => {
    const updatedBooks = [...books];
    updatedBooks[index] = {
      title: values.title,
      author: values.author,
      isbn: values.isbn,
      publicationDate: values.publicationDate,
    };
    setBooks(updatedBooks);
    setEditIndex(-1);
    resetForm();
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleEditButtonClick = (index, book) => {
    setEditIndex(index);
    formik.setValues({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationDate: new Date(book.publicationDate).toISOString().substring(0, 10), // Convert to ISO date format
    });
  };

  return (
    <div className="books">
      <h3 className="section-title">Add Book</h3>
      <Formik
        initialValues={{
          title: '',
          author: '',
          isbn: '',
          publicationDate: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Title is required';
          }
          // Add validation rules for other fields
          return errors;
        }}
        onSubmit={
          editIndex === -1 ? handleAddBook : (values, { resetForm }) => handleEditBook(editIndex, values, { resetForm })
        }
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="books-form">
            <div className="form-field">
              <label className="form-label">Title:</label>
              <Field type="text" name="title" className="form-input" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="form-label">Author:</label>
              <Field type="text" name="author" className="form-input" />
              <ErrorMessage name="author" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="form-label">ISBN:</label>
              <Field type="text" name="isbn" className="form-input" />
              <ErrorMessage name="isbn" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="form-label">Publication Date:</label>
              <Field type="date" name="publicationDate" className="form-input" />
              <ErrorMessage name="publicationDate" component="div" className="error" />
            </div>
            <button type="submit" className="submit-btn">
              {editIndex === -1 ? 'Add Book' : 'Update Book'}
            </button>
          </form>
        )}
      </Formik>

      <h3 className="section-title">Books</h3>
      <ul className="list">
        {books.map((book, index) => (
          <li key={index} className="list-item">
            <div className="book-title">Title: {book.title}</div>
            <div>Author: {book.author}</div>
            <div>ISBN: {book.isbn}</div>
            <div>Publication Date: {book.publicationDate}</div>
            <button onClick={() => handleDeleteBook(index)} className="delete-btn">
              Delete
            </button>
            <button onClick={() => handleEditButtonClick(index, book)} className="edit-btn">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
