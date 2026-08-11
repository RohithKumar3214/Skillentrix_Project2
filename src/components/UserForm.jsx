import React, { useState } from 'react';

/**
 * UserForm Component
 * Controlled form for entering user contact details.
 * Performs client-side validation and notifies parent on submission.
 * 
 * Props:
 * - onAddContact: Function to lift state up to App component
 */
function UserForm({ onAddContact }) {
  // 1. Controlled state for form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  // State for holding validation errors
  const [errors, setErrors] = useState({});

  // Handler for updating input state dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Clear individual field error as user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  // Helper function to validate form inputs
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Full Name
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@example.com).';
    }

    // Validate Phone Number
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    }

    // Validate Location
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    return newErrors;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    // Prevent standard browser page reload
    e.preventDefault();

    const validationErrors = validateForm();

    // If validation fails, update errors state and block submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create new contact object
    const newContact = {
      id: Date.now(), // Generate unique ID
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim()
    };

    // Pass the new contact to the parent component
    onAddContact(newContact);

    // Reset/clear form state after successful creation
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: ''
    });
    setErrors({});
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Create Contact Card</h2>
        <p className="form-subtitle">Fill in the user details below to add a new card.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="user-form">
        {/* Banner for general validation warning if any error exists */}
        {Object.keys(errors).length > 0 && (
          <div className="error-banner" role="alert">
            <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Please fix the highlighted errors below before submitting.</span>
          </div>
        )}

        {/* Full Name Input */}
        <div className="form-group">
          <label htmlFor="name">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        {/* Email Address Input */}
        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john.doe@example.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        {/* Phone Number Input */}
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 123-4567"
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        {/* Location Input */}
        <div className="form-group">
          <label htmlFor="location">
            Location <span className="required">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Seattle, WA"
            className={errors.location ? 'input-error' : ''}
          />
          {errors.location && <span className="field-error">{errors.location}</span>}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
