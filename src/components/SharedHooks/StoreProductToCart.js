import axios from "axios";

export const StoreProductToCart = (product_name, product_price, product_image, product_id) =>{
    console.log(product_name);
    console.log(product_price);
    console.log(product_image);
    if (product_id)
    {
        console.log(product_id)
        axios.post('http://localhost:3000/user/carts',{
            headers: {"Authenticate" : localStorage.token},
            id: product_id
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>console.log(err));
    }
}