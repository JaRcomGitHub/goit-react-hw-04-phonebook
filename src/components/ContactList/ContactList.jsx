import css from './ContactList.module.css'
import PropTypes from 'prop-types';
import Contact from "./Contact";

export default function ContactList({ contacts, onDeleteContact }) {
    return (
        <div className={css.contactListBlock}>
            <ul>
                {contacts.map(({ id, name, number }) => (
                    <Contact
                        key={id}
                        name={name}
                        number={number}
                        onDeleteContact={() => onDeleteContact(id)}
                    /> 
                ))}
            </ul>
        </div>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

