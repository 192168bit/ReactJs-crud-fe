import React, { useState } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import FileUpload from "./components/FileUpload";
import { User } from "./types";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const handleUserCreated = (user: User) => {
    setUsers([...users, user]);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUserId(null);
  };

  const handleEditUser = (userId: number) => {
    setEditingUserId(userId);
  };

  const handleFileUploaded = (fileUrl: string) => {
    setUploadedFileUrl(fileUrl);
    alert(`File uploaded: ${fileUrl}`);
  };

  return (
    <div>
      <h1>React CRUD with Flask API</h1>

      <FileUpload onFileUploaded={handleFileUploaded} />

      {uploadedFileUrl && (
        <p>
          Uploaded File: <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">{uploadedFileUrl}</a>
        </p>
      )}

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
