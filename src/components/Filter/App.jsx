import { Component } from 'react';
import { nanoid } from 'nanoid';
import React from 'react';
import './App.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  form = React.createRef();

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // FUNKCJA DO OBSŁUGI INPUTA W ZALEŻNOŚCI OD NAME NA KTÓYM WYWOŁANA

  addNewContact = event => {
    event.preventDefault();

    // TWORZENIE NOWEGO KONTAKTU

    const nameValue = event.target.elements.name.value;
    const numberValue = event.target.elements.number.value;
    const namePattern = new RegExp(event.target.elements.name.pattern);
    const numberPattern = new RegExp(event.target.elements.number.pattern);

    const newContact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    const isNameValid = namePattern.test(nameValue);
    const isNumberValid = numberPattern.test(numberValue);

    let errorMessage = '';

    if (!isNameValid) {
      errorMessage += 'Invalid name input. ';
    }

    if (!isNumberValid) {
      errorMessage += 'Invalid number input.';
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // SPRAWDZENIE CZY KONTAKT JUŻ ISTNIEJE

    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number.toLowerCase() === newContact.number.toLowerCase()
      )
    ) {
      alert(`${newContact.name} already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
      event.target.reset();
    }
  };

  // USUWANIE KONTAKTU

  deleteContact = idToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };

  // WYŚWIETLANIE KONTAKTÓW

  setStateInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterContacts = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  renderContacts = () => {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => this.deleteContact(contact.id)}>delete</button>
      </li>
    ));
  };

  render() {
    return (
      <div className="wrapper">
        <ContactForm
          submit={this.addNewContact}
          contacts={this.state.contacts}
        />
        <ContactList list={this.renderContacts()}>
          <Filter
            filteredContacts={this.filterContacts}
            // handleInput={this.setStateInput}
          />
        </ContactList>
      </div>
    );
  }
}

export default App;
