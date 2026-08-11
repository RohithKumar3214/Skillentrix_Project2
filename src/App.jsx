import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './index.css';

/**
 * App Component (Main Parent Component)
 * Holds the central contact list state and coordinates data flow between UserForm and UserList.
 */
function App() {
  // Initial contacts data to display cards on initial render
  const initialContacts = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'David Miller',
      email: 'david.m@example.com',
      phone: '+1 (555) 987-6543',
      location: 'Austin, TX'
    }
  ];

  // Centralized State Management for Contacts List
  const [contacts, setContacts] = useState(initialContacts);

  /**
   * Handler to add a new contact object
   * Called by UserForm when form is validly submitted
   */
  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  /**
   * Handler to delete a contact by ID
   * Called by ContactCard -> UserList -> App
   */
  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="header-badge">React SPA</div>
        <h1>Contact Cards</h1>
        <p className="app-description">
          A dynamic user contact manager built with React functional components, 
          state management, controlled forms, props, and dynamic rendering.
        </p>
      </header>

      {/* Main Content Layout */}
      <main className="app-content">
        {/* Left Column: Input Form */}
        <section className="form-section">
          <UserForm onAddContact={handleAddContact} />
        </section>

        {/* Right Column: Dynamic Contact Cards List */}
        <section className="list-section">
          <UserList 
            contacts={contacts} 
            onDeleteContact={handleDeleteContact} 
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>React Components Contact Cards Project &bull; Built with Vite + React</p>
      </footer>
    </div>
  );
}

export default App;
