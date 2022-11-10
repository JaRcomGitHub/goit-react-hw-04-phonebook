import css from './Contact.module.css'
import PropTypes from 'prop-types';

const Contact = ({ name, number, onDeleteContact }) =>  (
    <li className={css.ContactListItem}>
        <p>{name}: </p>
        <p>{number}</p>
        <button 
            type='button'
            onClick={onDeleteContact}
        >Delete</button>
    </li>
);

export default Contact;

Contact.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};