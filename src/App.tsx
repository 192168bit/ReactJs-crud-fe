// src/App.tsx
import React, { useState } from 'react';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import { User } from './types';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const handleUserCreated = (user: User) => {
    setUsers([...users, user]);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUserId(null); // Close the editing form after update
  };

  const handleEditUser = (userId: number) => {
    setEditingUserId(userId);
  };

  return (
    <div>
      <h1>React CRUD with Flask API</h1>
      {editingUserId ? (
        <UpdateUser userId={editingUserId} onUserUpdated={handleUserUpdated} />
      ) : (
        <>
          <CreateUser onUserCreated={handleUserCreated} />
          <UserList onEditUser={handleEditUser} />
        </>
      )}
    </div>
  );
};

export default App;
