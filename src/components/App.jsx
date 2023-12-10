import { useState, useEffect } from "react";
import '../../src/index.css';
import { ContactList } from "./ContactList/ContactList";
import  ContactForm  from "./ContactForm/ContactForm";
import  Filter  from "./Filter/Filter";
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
      setContacts(data);
    }
  }, []);
  
  

    
    useEffect(() => {
      const prepareContacts = JSON.stringify(contacts);
        localStorage.setItem(localData, prepareContacts);
    }, [contacts])
    
  


  const onAddContact = (obj) => {
      const equalName = contacts.find(element => element.name.toLowerCase() === obj.name.toLowerCase());
      if (equalName) return alert(`${equalName.name} is already in contacts.`)
      setContacts(prevState => ([...prevState, obj]))
  }
  
  const changeFilter = (filterValue) => {
    setFilter(filterValue)
  }

  
    
  const normalizedValue = filter.toLowerCase();
  
  const filteredContactsArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue));
    
  
  
  const deleteContact = (id) => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== id)));
  }


  


  return (
        <div className="container">
    
          <div>
            <h2 className="title">Phonebook</h2>
            
            <ContactForm onAddContact={onAddContact}/>
          </div>
          <div>
            <h2 className="title">Contacts</h2>
            <Filter onChange={changeFilter} />

            <ContactList contacts={filteredContactsArray} deleteContact={deleteContact} />
          </div>
        </div>
      
  );
}