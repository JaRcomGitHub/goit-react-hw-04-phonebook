import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import initialContacts from './contacts.json'
import Filter from "./Filter"

class App extends Component {
  state = {
    // contacts: [],
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
      //console.log("restore")
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };
  };

  onAlert = name =>  {
    window.alert(`${name} is already in contacts.`);
  }
  
  checkContact = (name) => {
    const { contacts } = this.state;
    const normolizedName = name.toLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normolizedName)
    );
  }
  
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  
  formSubmitHandler = data => {
    if (this.checkContact(data.name)) {
      this.onAlert(data.name);
      return false;
    }
    this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), ...data }]
    }));
    return true;
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normolizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter)
    );
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        {contacts.length > 0  &&
          <Filter
            value={filter}
            onChange={this.changeFilter} />
        }
        {filteredContacts.length > 0 &&
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact} />
        }
      </div>
    );
  };
};

export default App;