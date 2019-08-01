import React, {useState, useEffect} from 'react';
import './App.css';

function Shop() {

    useEffect(()=>{
        fetchItems();
    },[]);

    // idk
    const [items, setItems] = useState([]);

    // Fetch Data
    const fetchItems = async()=>{
        const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get'); 
        const items = await data.json();
        console.log(items.items);
        setItems(items.items);
    }


    return (
        <div>
            {items.map(item => {
                <h1 key={item.itemid}>{item.name}</h1>
            })} 
        </div> 
    );
}

export default Shop;
