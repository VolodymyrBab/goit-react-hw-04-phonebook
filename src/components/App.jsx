import { Component } from "react";
import '../../src/index.css';
import { ContactList } from "./ContactList/ContactList";
import { ContactForm } from "./СontactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import data from "../data.json";
export  class App extends Component {

  state = {
    contacts: [],
    filter: '',
  } 

  onAddContact = (obj) => {
    const equalName = this.state.contacts.find(
      element => element.name.toLowerCase() === obj.name.toLowerCase()
    );
    if (equalName) return alert(`${equalName.name} is already in contacts.`)
    this.setState(prevState => ({
      contacts: [...prevState.contacts, obj],
    }))
  }
  
  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedValue = filter.toLowerCase();
  
    const filteredContactsArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue));
    // console.log(filteredContactsArray);
    return filteredContactsArray;
  }
  
 
  changeFilter = filter => {
    this.setState({ filter: filter.toLowerCase() });
  };
  
  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }

  componentDidMount() {
    const localData = localStorage.getItem ('contacts')
    if (localData) this.setState({ contacts: JSON.parse(localData)})
    else this.setState({contacts: data})
  
  }


  componentDidUpdate(_, prevState) {
    if(prevState.contacts) {
      prevState.contacts.length !== this.state.contacts.length && 
      localStorage.setItem('contacts', JSON.stringify (this.state.contacts))  
      console.log('update*')
    }
  }
  

  render() {
    const contacts = this.filteredContacts();

      return (
        <div className="container">
    
          <div>
            <h2 className="title">Phonebook</h2>
            
            <ContactForm onAddContact={this.onAddContact}/>
          </div>
          <div>
            <h2 className="title">Contacts</h2>
            <Filter onChange={this.changeFilter} />

            <ContactList contacts={contacts} deleteContact={this.deleteContact} />
          </div>
        </div>
      )
  }
}