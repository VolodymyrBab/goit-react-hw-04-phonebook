import { useState, useEffect } from "react";
import '../../src/index.css';
import { ContactList } from "./ContactList/ContactList";
import  ContactForm  from "./СontactForm/ContactForm";
import  {Filter}  from "./Filter/Filter";
import data from "../data.json";

const localData = 'contacts';

export  default function App() {
  
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  
 
  
  useEffect(() => {
    let parsedContacts = data;
    if (localStorage.getItem(localData)) {
      parsedContacts = JSON.parse(localStorage.getItem(localData));
    }
    if (parsedContacts.length !== 0) {
      setContacts(parsedContacts);
    };
  }, []);
  
  
      
    useEffect(() => {
      const prepareContacts = JSON.stringify(contacts);
        localStorage.setItem(localData, prepareContacts);
    }, [contacts]);
    
  


  const onAddContact = (obj) => {
      const equalName = contacts.find(element => element.name.toLowerCase() === obj.name.toLowerCase());
      if (equalName) return alert(`${equalName.name} is already in contacts.`)
      else  {setContacts(prevState => ([obj, ...prevState]))}
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
            
            <ContactForm onSubmit = {onAddContact}/>
          </div>
          <div>
            <h2 className="title">Contacts</h2>
            <Filter onChange={changeFilter} />

            <ContactList contacts={filteredContactsArray} deleteContact={deleteContact} />
          </div>
        </div>
      
  );
}