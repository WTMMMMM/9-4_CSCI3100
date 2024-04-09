import React, { useState, useEffect } from "react"
import { User } from "../../models/models";

function UsersTable({ data, onSelect }: any) {
  return (
    <table className="table table-striped table-hover transparent-table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Address</th>

          <th scope="col">Account Type</th>

          <th scope="col">Num of Products P. </th>

        </tr>
      </thead>
      <tbody>
        {data.map((user: any) => (
          <tr key={user.username} onClick={() => onSelect(user)}>
            <td>{user.username}</td>
            <td>{user.address}</td>
            <td>{user.account_type}</td>
            <td>{user.products.length}</td>


          </tr>
        ))}
      </tbody>
    </table>);
}

function Highlight({ User, onDelete }: any) {

  if (!User) {
    return null;
  }

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

  return (
    <form onSubmit={handleDelete} className="Highlight-form">
      <h1>The User Selecting</h1>
      <div>Username: <b>{User.username}</b></div>
      <div>Address: <b>{User.address}</b></div>
      <div>Account Type: <b>{User.account_type}</b></div>
      <div>Num of Products P: <b>{User.products.length}</b></div>
      <button type="button" className="btn btn-danger highlight-btn">Delete</button>
    </form>

  );
}


function DeleteUser() {
  const [data, setdata] = useState<User[]>([
    {
      username: "adminUser123",
      password: "securePassword1!", // Remember, never store passwords as plain text in real applications.
      address: "123 Admin Blvd, Admin City, AC 12345",
      account_type: "admin" as "admin" | "normal",
      profile_image_link: "https://example.com/images/admin_profile.jpg",
      products: [

      ],
    },
    {
      username: "userStandard01",
      password: "passwordStrong2!", // Reminder: Use proper encryption for real passwords.
      address: "101 User Lane, Usersville, US 10101",
      account_type: "normal" as "admin" | "normal",
      profile_image_link: "https://example.com/images/user_profile_01.jpg",
      products: [],
    },
    {
      username: "userStandard02",
      password: "passwordStrong3!", // Reminder: Use proper encryption for real passwords.
      address: "102 User Road, Usersburg, US 10202",
      account_type: "normal" as "admin" | "normal",
      profile_image_link: "https://example.com/images/user_profile_02.jpg",
      products: [],
    },
    {
      username: "userStandard03",
      password: "passwordStrong4!", // Reminder: Use proper encryption for real passwords.
      address: "103 User Street, Userstown, US 10303",
      account_type: "normal" as "admin" | "normal",
      profile_image_link: "https://example.com/images/user_profile_03.jpg",
      products: [],
    },
    {
      username: "userStandard04",
      password: "passwordStrong5!", // Reminder: Use proper encryption for real passwords.
      address: "104 User Avenue, Usersfield, US 10404",
      account_type: "normal" as "admin" | "normal",
      profile_image_link: "https://example.com/images/user_profile_04.jpg",
      products: [],
    },
    {
      username: "userStandard05",
      password: "passwordStrong6!", // Reminder: Use proper encryption for real passwords.
      address: "105 User Blvd, Usersport, US 10505",
      account_type: "normal" as "admin" | "normal",
      profile_image_link: "https://example.com/images/user_profile_05.jpg",
      products: [],
    }
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // useEffect(() => {
  //     fetch('api')
  //       .then(res => res.json())
  //       .then(data => {
  //         setdata(data);
  //       })
  //       .catch(error => console.error('Error fetching events:', error));
  //   }, []);

  const handleSelect = (user: any) => {
    if (selectedUser && selectedUser.username === user.username) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleDelete = async (username: any) => {
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div className="table-title">
          <h1>Users</h1>
        </div>
        <div className="table-container">
          <UsersTable data={data} onSelect={handleSelect} />
        </div>
        {selectedUser && (
          <div className="Highlight">
            {selectedUser && (
              <Highlight User={selectedUser} onDelete={handleDelete} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeleteUser