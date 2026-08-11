import React, { useState } from 'react';
import ContactCard from './ContactCard';

/**
 * UserList Component
 * Renders the collection of contact cards and handles empty state & filtering.
 * 
 * Props:
 * - contacts: Array of contact objects
 * - onDeleteContact: Callback function passed down from App
 */
function UserList({ contacts, onDeleteContact }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter contacts dynamically based on search query
  const filteredContacts = contacts.filter((c) => {
    const query = searchTerm.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.location.toLowerCase().includes(query) ||
      c.phone.toLowerCase().includes(query)
    );
  });

  return (
    <section className="user-list-container">
      {/* Header with Dynamic Contact Count */}
      <div className="list-header">
        <div className="title-with-count">
          <h2>Contact Directory</h2>
          <span className="count-badge">Contacts ({contacts.length})</span>
        </div>

        {/* Search / Filter input if there are contacts */}
        {contacts.length > 0 && (
          <div className="search-box">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search contacts"
            />
            {searchTerm && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        )}
      </div>

      {/* Conditional Rendering: Empty State vs Contact Grid */}
      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrapper" aria-hidden="true">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3>No contacts added yet</h3>
          <p>Add your first contact above to populate the directory.</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts found matching "<strong>{searchTerm}</strong>".</p>
          <button type="button" className="reset-filter-btn" onClick={() => setSearchTerm('')}>
            Clear Search Filter
          </button>
        </div>
      ) : (
        /* Dynamic map rendering of Contact Cards */
        <div className="contacts-grid">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDeleteContact}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default UserList;
