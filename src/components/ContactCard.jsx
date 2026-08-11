import React from 'react';

/**
 * ContactCard Component
 * Reusable component to display individual contact details.
 * 
 * Props:
 * - contact: Object containing id, name, email, phone, location
 * - onDelete: Callback function to delete this contact
 */
function ContactCard({ contact, onDelete }) {
  // Destructure contact properties for clean usage
  const { id, name, email, phone, location } = contact;

  // Generate initials for the avatar badge (e.g., "John Doe" -> "JD")
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <article className="contact-card">
      <div className="card-header">
        <div className="avatar" aria-hidden="true">
          {getInitials(name)}
        </div>
        <div className="title-area">
          <h3 className="contact-name">{name}</h3>
          <span className="location-tag">
            <svg className="icon-tiny" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {location}
          </span>
        </div>
        {onDelete && (
          <button 
            type="button" 
            className="delete-btn"
            onClick={() => onDelete(id)}
            title="Delete contact"
            aria-label={`Delete ${name}`}
          >
            <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="info-item">
          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <a href={`mailto:${email}`} className="info-text link-text">
            {email}
          </a>
        </div>

        <div className="info-item">
          <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <a href={`tel:${phone}`} className="info-text link-text">
            {phone}
          </a>
        </div>
      </div>
    </article>
  );
}

export default ContactCard;
