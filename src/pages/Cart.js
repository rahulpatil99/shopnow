//require('dotenv').config()
import config from '../Config/config'
import React, { useState,useEffect } from "react";
import OrderCard from "../components/OrderCard";

const Cart = () => {
  const [deliveryCharges, setDeliveryCharges] = useState(70);
  const [packagingCharges, setPackagingCharges] = useState(50);
  const [freeDeliveryLimit, setFreeDeliveryLimit] = useState(499);
  const [orders, setOrders] = useState(null);

const getCardDetails = async () =>{
  const url = config.REACT_APP_API_URL+"/cart/userproducts/"+1;

  try{
    const response = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setOrders(json);
     json.map((i)=>{

      console.log(i);
    })
  }catch(error){
    console.error("Error fetching data: ", error.message);
  }
}


const deleteProduct = async (productId) =>{
  const url = config.REACT_APP_API_URL+"/cart/delete";

  const userId = 1;
  const payload = {
    userId,
    productId
  }
  try{
    const response = await fetch(url,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setOrders(orders.filter((order) => order.productId !== productId));
  }catch(error){
    console.error("Error fetching data: ", error.message);
  }
}


//getCardDetails();

useEffect(()=>{
  getCardDetails()
},[]);



  const handleRemove = (productId) => {

    deleteProduct(productId)
  };
  if (!orders) {
    return <div>Loading...</div>; // Show loading indicator while waiting for data
  }
  else{
  return (
    <div>
      <OrderCard
        items={orders}
        deliveryCharges={deliveryCharges}
        packagingCharges={packagingCharges}
        freeDeliveryLimit={freeDeliveryLimit}
        onRemove={handleRemove}
      />
      {/* <PriceDetails/> */}
    </div>
  );
}
};

export default Cart;