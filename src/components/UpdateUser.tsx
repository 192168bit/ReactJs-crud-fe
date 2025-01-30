// src/components/UpdateUser.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { updateUser } from '../services/api';

interface UpdateUserProps {
  userId: number;
  onUserUpdated: (updatedUser: User) => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ userId, onUserUpdated }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the user to edit when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/${user?.id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const userData = await response.json();
        setUser(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = { id: userId, first_name: firstName, last_name: lastName, email };

    try {
      const updatedUserResponse = await updateUser(updatedUser);
      onUserUpdated(updatedUserResponse); // Pass the updated user back to the parent
    } catch (error) {
      setError('Failed to update user');
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update User</h3>
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
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
