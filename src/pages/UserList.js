import React, { useState } from "react";

const UserList = () => {
  // Sample user data (this could come from an API or database)
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      mobileNumber: "1234567890",
      pinCode: "123456",
      address: "123 Street, Building A",
      state: "New York",
      city: "NYC",
      addressType: "Home",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      mobileNumber: "9876543210",
      pinCode: "654321",
      address: "456 Avenue, Apartment B",
      state: "California",
      city: "Los Angeles",
      addressType: "Work",
    },
    // Add more users as needed
  ]);

  // Function to handle deleting a user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Function to handle editing (implement this as per your requirements)
  const handleEdit = (id) => {
    console.log(`Editing user with id: ${id}`);
    // Add code to open a form/modal for editing user details
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Management</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Mobile Number</th>
            <th style={styles.th}>Pin Code</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>State</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>Address Type</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.dataRow}>
              <td style={styles.td}>{user.firstName}</td>
              <td style={styles.td}>{user.lastName}</td>
              <td style={styles.td}>{user.mobileNumber}</td>
              <td style={styles.td}>{user.pinCode}</td>
              <td style={styles.td}>{user.address}</td>
              <td style={styles.td}>{user.state}</td>
              <td style={styles.td}>{user.city}</td>
              <td style={styles.td}>{user.addressType}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    padding: "12px 15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textAlign: "left",
    fontSize: "16px",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    color: "#333",
  },
  headerRow: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  dataRow: {
    backgroundColor: "#fff",
    transition: "background-color 0.2s ease-in-out",
  },
  dataRowHover: {
    backgroundColor: "#f1f1f1",
  },
  editButton: {
    marginRight: "10px",
    padding: "8px 12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s ease-in-out",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#DC3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default UserList;
