import React, { useState, useEffect } from "react";
import { User } from "../../models/models";
import NavBar from "../../common/navbar";
import { baseUrl, getRequestOptions, handleAuth, postRequestOptions } from "../../common/cookie";
import axios from "axios";

function UsersTable({ users, onSelect }: any) {
  return (
    <table className="table table-striped table-hover transparent-table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Address</th>
          <th scope="col">Account Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user.username} onClick={() => onSelect(user)}>
            <td>{user.username}</td>
            <td>{user.address}</td>
            <td>{user.account_type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Highlight({ User }: any) {
  if (!User) {
    return null;
  }
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission if it's inside a form

    const username = User.username;
    if (window.confirm("Are you sure you want to delete " + username + "?")) {
      const url = baseUrl+ "delete-user"; // Replace with your actual base URL
      const formData = new FormData();
      formData.append("username", username);

      try {
        const action = await axios.post(url, formData, postRequestOptions); // Replace with your actual request options if needed
        if (action.status == 200) {
          alert("Deleted successfully");
          window.location.reload();
        } else {
          alert("Failed to delete");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };
  return (
    <form className="Highlight-form">
      <div>
        Username: <b>{User.username}</b>
      </div>
      <div>
        Address: <b>{User.address}</b>
      </div>
      <div>
        Account Type: <b>{User.account_type}</b>
      </div>
      
      <button type="button" onClick={handleDelete} className="btn btn-danger highlight-btn">
        Delete
      </button>
    </form>
  );
}

function DeleteUser() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  let [users, setUsers] = useState([]);
  let url = baseUrl + "users";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleSelect = (user: any) => {
    if (selectedUser && selectedUser.username === user.username) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <div className="analytics-title">
          <h1>Users</h1>
        </div>
        <div className="table-container">
          <UsersTable users={users} onSelect={handleSelect} />
        </div>
        {selectedUser && <div className="Highlight">{selectedUser && <Highlight User={selectedUser} />}</div>}
      </div>
    </div>
  );
}

export default DeleteUser;
