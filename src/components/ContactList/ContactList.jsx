import { Contact } from "./ContItem/ContItem";
import css from "./ContactList.module.css";
import PropTypes from 'prop-types';

export const ContactList = ({contacts, deleteContact}) => {
    return <ul className={css.container}>
      {contacts.map((contact => <Contact key={contact.id}  contact={contact} onDelete={deleteContact} />))}
      
    </ul>
  }
  
  
  ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
    deleteContact: PropTypes.func.isRequired,
  }