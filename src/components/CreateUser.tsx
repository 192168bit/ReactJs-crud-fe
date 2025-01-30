// src/components/CreateUser.tsx

import React, { useState } from 'react';
import { User } from '../types'; // Import the User interface

interface CreateUserProps {
  onUserCreated: (user: User) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = { id: 0, first_name: firstName, last_name: lastName, email: email }; // Set the id to 0 for now
    try {
      // Add the logic for creating a new user via your API
      onUserCreated(newUser);
    } catch (error) {
      alert('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New User</h3>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
