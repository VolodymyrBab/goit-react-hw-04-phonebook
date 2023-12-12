import { useState } from "react";
import css from "../СontactForm/ContactForm.module.css";
import classNames from "classnames";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

export default function ContactForm({ onSubmit }) {
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const handleChangeName = (evt) => {
    setName(evt.target.value)
  }
  const handleChangeNumber = (evt) => {
    setNumber(evt.target.value)
  }
  
  const addContact = (evt) => {
      evt.preventDefault();
      const contact = {id: nanoid(), name, number};
      onSubmit(contact);
      setName('');
      setNumber('');
  
 }
  
   
      return <div className={css.container}>
        
        <form
          className={classNames(css.form)}
          onSubmit={addContact}> 
          <label className={css.label}>
            Name
            <input className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChangeName}
              value={name}
            />
          </label>
          <label className={css.label}>
            Number
            <input className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChangeNumber}
              value={number}
            />
          </label>
          <button type="submit" className={classNames(css.btn, css.add)}>Add contact</button>
        </form>
        </div>
    }

  
  ContactForm.propTypes = {
    onSubmit: PropTypes.func,
  }