import { useState } from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'

export default function ContactForm({onSubmit}) {
    const [name, setName] = useState('');//'Name Names'
    const [number, setNumber] = useState('');//'123-456-789'

    const handleInputChangeName = event => {
        setName(event.currentTarget.value);
    }

    const handleInputChangeNumber = event => {
        setNumber(event.currentTarget.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        
        if (onSubmit({name, number})) {
            reset();
        }
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return (
        <form className={css.сontactForm} onSubmit={handleSubmit}>
            <label>
                Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleInputChangeName}
                />
            </label>
            <label>
                Number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleInputChangeNumber}
                />
            </label>
            <button type='submit'>Add contact</button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
