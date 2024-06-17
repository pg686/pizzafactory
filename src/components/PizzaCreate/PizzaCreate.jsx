import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as pizzaService from '../../services/pizzaService.js';
import { useParams } from 'react-router-dom';
export default function PizzaCreate() {
    const navigate = useNavigate();
    let { pizzaId } = useParams();
const [products, setProducts] = useState({});
const [description, setDescription] = useState([]);
const [pizzaType, setPizzaType] = useState('vegan');
const [price, setPrice] = useState(0);
    useEffect(() => {
if(!pizzaId){
     pizzaService.getAllIngredients().then(result => {

        const filteredProducts = Object.entries(result[0]).filter(x => x[0] !== '_id');
        setProducts(Object.fromEntries(filteredProducts));
       })
}
      

   }
   , [] );

   const onProductChange = (e) => {
    const category = Object.entries(products).find(x => Object.keys(x[1]).includes(e.target.value))[0];
    const productsCopy = {...products,
        [category]: {
            ...products[category],
            [e.target.value]: { ...products[category][e.target.value],
                "checked": e.target.checked
              
            } 
        }
        
        };
    setProducts(productsCopy);
    const ingredientArr = Object.entries(productsCopy[category]).find(x =>  x[0] === e.target.value)





console.log(ingredientArr[1].checked,"ingredientArr[1].checked")
if(ingredientArr[1].checked){
    setPrice(price => price + ingredientArr[1].price);
   
    if(!description.includes(ingredientArr[0])){
        setDescription(x => [...x, ingredientArr[0]]);
    }
    
}else{
    setPrice(price => price - ingredientArr[1].price);
    if(description.includes( ingredientArr[0])){
        setDescription(x => x.filter(x => x !==  ingredientArr[0]));
    }
}

const checkedArr = Object.values(productsCopy).reduce((acc, curr) => {
    const checked = Object.values(curr)?.filter(x => x.checked === true).map(x => x.type);
acc.push(...checked);
return acc;
}, []);
if(checkedArr.includes("meat")){
    setPizzaType("meat")
}else if(checkedArr.includes("vegetarian")){
    setPizzaType("vegetarian")
}else{
    setPizzaType("vegan")
}
   }
console.log(description, "description");
console.log(price, "price");

    return (
        <section id="create-page" className="auth">
            <form id="create">
                <div className="container">
                    <h1>Create Pizza</h1>
                    <div className='input-box'>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter pizza title..." />
                    </div>
                    <div className='input-box'>
                    <label htmlFor="pizza-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />
                    </div>
                    <div className='input-box'>
            <label htmlFor="description">Description</label>
            <p>{description.join(", ") || ''}</p>
            </div>
            <div className='input-box'>
            <label htmlFor="price">Price</label>
            <p>{price}</p>
            </div>
            <div className='input-box'>
            <label htmlFor="type">Type</label>
            <p>{pizzaType}</p>
            </div>
                    <div className="ingredients">
                     { Object.keys(products).map(category => {
                       
return (
<div className="ingredientsContainer" key={category}>
    <h3>{category}</h3>
    { Object.keys(products[category]).map(ingredient => {
  return ( <div className="ingredient" key={ingredient}>
    <p>{ingredient}</p>
<label>
<input type="checkbox" id="title" name="title" value={ingredient} onChange={ onProductChange} checked={products[category][ingredient].checked}></input>
<span></span>
</label>
</div>)
    })

 }
</div>)
                     })

             }
                          </div>
                          <input className="btn submit" type="submit" value="Create Pizza" />
                </div>
            </form>
        </section>
    );
}