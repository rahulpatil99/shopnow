import config  from '../Config/config'
import React,{useState,useEffect} from 'react'
import Card from '../components/Card'


const Home =() => {
  const [products,setProducts] = useState(null);


  const getData = async ()=> {
    const url = config.REACT_APP_API_URL+"/product/getAll/1";
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      setProducts(json);
      json.map((i)=>{

        console.log(i.price);
      })
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  }
  useEffect(()=>{
    getData();
  },[]);
  
  if(!products) return (<div>loading..</div>)
   return (
    <div style={styles.container}>
      {products.map((product)=>(
        <Card
        key={product.productId}
        productsId={product.productId}
        img={product.imgUrl}
        productTitle={product.productName}
        description={product.description}
        price={product.price}
        isProductLike={product.isProductLike}
        discount={product.discount}
        />

      ))}
    </div>
  );
}

const styles ={
    container:{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', // Set a specific gap between items
        //justifyContent: 'space-between',
        padding: '16px',
    }
}

export default Home;
