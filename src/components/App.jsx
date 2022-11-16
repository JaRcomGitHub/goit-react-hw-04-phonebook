import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
// import initialContacts from './contacts.json'
import Filter from "./Filter"

const localContacts = () => {
  const localContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(localContacts);
  //console.log("restore");
  return parsedContacts ? parsedContacts : [];//[] -> initialContacts
}

export default function App() {
  const [contacts, setContacts] = useState(localContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    //console.log("Update");
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAlert = name =>  {
    window.alert(`${name} is already in contacts.`);
  }
  
  const checkContact = (name) => {
    const normolizedName = name.toLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normolizedName)
    );
  }
  
  const deleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  
  const formSubmitHandler = data => {
    if (checkContact(data.name)) {
      onAlert(data.name);
      return false;
    }
    setContacts(prevContacts => [...prevContacts, { id: nanoid(), ...data }]);
    return true;
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normolizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter)
    );
  }

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      {contacts.length > 0  &&
        <Filter
          value={filter}
          onChange={changeFilter} />
      }
      {filteredContacts.length > 0 &&
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact} />
      }
    </div>
  );
};
