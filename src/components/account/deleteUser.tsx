import React, { useState, useEffect } from "react"

function UsersTable({ data, onSelect }:any) {
    return (
      <table className="table table-striped table-hover transparent-table">
        <thead className="thead-dark">
            <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((user:any) => (
                      <tr key={user.username} onClick={() => onSelect(user)}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                </tbody>
        </table>);
}

function Highlight({User, onDelete}:any) {

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          try {
            const response = await fetch(`api`, {
              method: 'DELETE',
            });
    
            const data = await response.json();
            if (data.message === 'success') {
              onDelete(User.username);
              alert('deleted successfully');
            } else {
              alert('Failed to delete');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };

    return(
        <form onSubmit={handleDelete}>
            <div><label>username: {User.username}</label></div>
            <div><label>email: {User.email}</label></div>
            <button type="button">Delete</button>
        </form>

    );
}


function DeleteUser() {
    const [data, setdata] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch('api')
          .then(res => res.json())
          .then(data => {
            setdata(data);
          })
          .catch(error => console.error('Error fetching events:', error));
      }, []);

      const handleSelect = (User:any) => {
        setSelectedUser(User);
      };

      const handleDelete = async (username:any) => {
        window.location.reload();
      };
    
      return(
        <div>
            <div>
            {selectedUser && (
            <Highlight User={selectedUser} onDelete={handleDelete}/>
            )}
            <UsersTable data={data} onSelect={handleSelect}/>
            </div>
        </div>
    )
}

export default DeleteUser