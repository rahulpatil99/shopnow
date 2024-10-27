import config from '../Config/config';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const DeliveryAddresses = () => {
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [allAddress,setAllAddress] = useState(null);
  const [customerId,setCustomerId] = useState(1);
  const navigate = useNavigate();


  const getAllDeliveryAddress = async () =>{
    const url = config.REACT_APP_API_URL+"/deliveryaddress/"+customerId;

    try{
    const response = await fetch(url,{
      method:'GET',
      headers:{"content-type":"application/json"}
    })
    if (!response.ok) {
      throw new Error(`Failed to get delivery address. Status: ${response.status}`);
    }

    const json = await response.json();
    setAllAddress(json);
  } catch (error) {
    console.error('Error getting delivery address:', error.message);
  }
  }

  const deletedDeliveryAddress = async (deliveryAddressId) =>{
    const url = config.REACT_APP_API_URL+"/deliveryaddress/delete";

    const payload = {
      deliveryAddressId
    }
    try{
    const response = await fetch(url,{
      method:'DELETE',
      headers:{"content-type":"application/json"},
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new Error(`Failed to delete delivery address. Status: ${response.status}`);
    }

    const json = await response.json();
    
  } catch (error) {
    console.error('Error deleting delivery address:', error.message);
  }
  }

  useEffect(()=>{
    getAllDeliveryAddress();
  },[])

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleProceedToPayment = () => {
    if (selectedAddress) {
      console.log('Proceeding with address ID:', selectedAddress);
    } else {
      alert('Please select a delivery address.');
    }
  };

  const handleEditAddress = (addressId) => {
    const deliveryaddress = [...allAddress].filter((i)=> i.deliveryAddressId == addressId)
    navigate('/ProceedPage', { state: { deliveryaddress } })
    console.log('Editing address with ID:', addressId);
    // Add code here to open the edit form or modal for the selected address
  };

  const handleDeleteAddress = (addressId) => {
    console.log('Deleting address with ID:', addressId);
    const address = [...allAddress].filter((i)=>i.deliveryAddressId != addressId);
    setAllAddress(address);
    deletedDeliveryAddress(addressId);
    // Add code here to delete the address
  };


  const handleAddNewAddress = (addressId) => {
    console.log('Deleting address with ID:', addressId);
    navigate('/ProceedPage');
    // Add code here to delete the address
  };



  if(!allAddress) return(<div>loading...</div>);
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Select Delivery Address</h3>
      <button onClick={handleAddNewAddress} style={styles.addButton}>
        Add New Address
      </button>
      <ul style={styles.addressList}>
        {allAddress.map((address) => (
          <li
            key={address.deliveryAddressId}
            style={{
              ...styles.addressItem,
              border: selectedAddress === address.deliveryAddressId ? '2px solid #4CAF50' : '1px solid #ddd',
            }}
          >
            <input
              type="radio"
              name="address"
              value={address.deliveryAddressId}
              checked={selectedAddress === address.deliveryAddressId}
              onChange={() => handleAddressSelect(address.deliveryAddressId)}
              style={styles.radioButton}
            />
            <div style={styles.addressContent}>
              <strong>{address.fullName}</strong> - {address.addressType}
              <p>{address.address}, {address.city}, {address.state} - {address.pinCode}</p>
              <p>Mobile: {address.mobileNumber}</p>
              <div style={styles.actionButtons}>
                <button onClick={() => handleEditAddress(address.deliveryAddressId)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDeleteAddress(address.deliveryAddressId)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleProceedToPayment} style={styles.button}>
        Proceed to Payment
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  addressList: {
    listStyle: 'none',
    padding: 0,
  },
  addressItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    transition: 'border 0.2s ease',
  },
  radioButton: {
    marginRight: '15px',
    transform: 'scale(1.2)',
  },
  addressContent: {
    flex: 1,
    color: '#555',
  },
  actionButtons: {
    marginTop: '10px',
  },
  addButton: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
  },
  editButton: {
    marginRight: '10px',
    padding: '6px 12px',
    backgroundColor: '#ffa726',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#ef5350',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
  },
};

export default DeliveryAddresses;
