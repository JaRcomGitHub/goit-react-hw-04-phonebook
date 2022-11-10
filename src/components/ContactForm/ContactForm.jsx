import React from "react";
import css from './ContactForm.module.css'
import { nanoid } from 'nanoid';

class ContactForm extends React.Component {
    state = {
        // name: 'Name Names',
        // number: '123-456-789',
        name: '',
        number: '',
    }

    nameInputId = nanoid();
    numberInputId = nanoid();

    onAlert = name =>  {
        window.alert(`${name} is already in contacts.`);
    }

    handleInputChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    checkContact = (name) => {
        const { contacts } = this.props;
        const normolizedName = name.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normolizedName)
        );
    }

    handleSubmit = event => {
        event.preventDefault();
        const { name } = this.state;

        if (this.checkContact(name).length) {
            this.onAlert(name);
        } else {
            this.props.onSubmit({ id: nanoid(), ...this.state });
            this.reset();
        }
    }

    reset = () => {
        this.setState({
        name: '',
        number: '',
    });
    }

    render() {
        return (
            <form className={css.сontactForm} onSubmit={this.handleSubmit}>
                <label htmlFor={this.nameInputId}>
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    id={this.nameInputId}
                />
                <label htmlFor={this.numberInputId}>
                    Number
                </label>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={this.state.number}
                    onChange={this.handleInputChange}
                        id={this.numberInputId}
                />
                <button type='submit'>Add contact</button>
            </form>
        );
    }
}

export default ContactForm;