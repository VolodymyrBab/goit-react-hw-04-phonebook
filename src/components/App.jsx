import { useState, useEffect } from "react";
import '../../src/index.css';
import { ContactList } from "./ContactList/ContactList";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import data from "../data.json";
export  default function App() {
  
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  
  const localData = 'contacts';
  
  useEffect(() => {
    let parsedContacts = [];
    if (localStorage.getItem(localData)) {
      parsedContacts = JSON.parse(localStorage.getItem(localData));
    }
    if (parsedContacts.length !== 0) {
      setContacts(parsedContacts);
    }
  }, []);
  
  
  // componentDidMount() {
    
    //   if (localData) this.setState({ contacts: JSON.parse(localData)})
    //   else this.setState({contacts: data})
    
    // }
    
    useEffect(() => {
      const prepareContacts = JSON.stringify(contacts);
        localStorage.setItem(localData, prepareContacts);
    }, [contacts])
    
      // componentDidUpdate(_, prevState) {
      //   if(prevState.contacts) {
      //     prevState.contacts.length !== this.state.contacts.length && 
      //     localStorage.setItem('contacts', JSON.stringify (this.state.contacts))  
      //     console.log('update*')
      //   }
      // }



  const onAddContact = (obj) => {
      const equalName = this.state.contacts.find(element => element.name.toLowerCase() === obj.name.toLowerCase());
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
  // filteredContacts = () => {
  //   const { filter, contacts } = this.state;
  //   const normalizedValue = filter.toLowerCase();
  
  //   const filteredContactsArray = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedValue));
  //   // console.log(filteredContactsArray);
  //   return filteredContactsArray;
  // }
  
 
  changeFilter = filter => {
    this.setState({ filter: filter.toLowerCase() });
  };
  
  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }


  

 
    const contactsFilter = filteredContacts();

      return (
        <div className="container">
    
          <div>
            <h2 className="title">Phonebook</h2>
            
            <ContactForm onAddContact={onAddContact}/>
          </div>
          <div>
            <h2 className="title">Contacts</h2>
            <Filter onChange={changeFilter} />

            <ContactList contacts={contactsFilter} deleteContact={deleteContact} />
          </div>
        </div>
      
  );
}