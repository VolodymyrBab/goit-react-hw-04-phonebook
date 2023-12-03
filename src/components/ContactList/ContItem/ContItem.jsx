import css from "./ContItem.module.css";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';


export const Contact = ({ contact, onDelete }) => {
  const {id, name, number} = contact;
  return <>
     <li className={css.item}>
      <div className={css.contact}>
        <p className={css.name}>{name}</p>
        <p
          name={name}
          className={classNames(css.number)}>
          {number}
        </p>
      </div>
      <button 
        type="button" 
        className={classNames(css.btn)} 
        onClick={() => onDelete(id)}
      >
        delete
      </button>
    </li>
  </>
}





Contact.propTypes = {
  contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
}