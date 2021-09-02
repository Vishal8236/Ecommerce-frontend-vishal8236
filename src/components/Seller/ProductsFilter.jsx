import React from 'react'

function ProductsFilter(props) {
    // console.log(props.filter_array)
    const getFilterName = (params,brand_name) =>{
        if (params) {
            props.filter_func(props.filter_array.concat([brand_name]));
            // console.log("From child-",props.filter_array)
        }else{
            var removeFilter = props.filter_array.filter((data)=>{
                return data !== brand_name
            })
            // console.log(removeFilter);
            props.filter_func(removeFilter);
        }
    }
    return (
        <div>
            <div className="d-flex w-100 align-items-center justify-content-around">
                <strong>Brand Name : </strong>
                <div className="">
                    <span>Realme</span> 
                    <input type="checkbox" className="mx-2" onChange={(e)=>{getFilterName(e.target.checked,"Realme")}}  />
                </div> 
                <div className="">
                    <span>Infinix</span> 
                    <input type="checkbox"  className="mx-2" onChange={(e)=>{getFilterName(e.target.checked,"Infinix")}} />
                </div>
                <div className="">
                    <span>Mi</span> 
                    <input type="checkbox"  className="mx-2" onChange={(e)=>{getFilterName(e.target.checked,"Mi")}} />
                </div>
                <div className="align-items-center">
                    <span>Samsung</span> 
                    <input type="checkbox"  className="mx-2" onChange={(e)=>{getFilterName(e.target.checked,"Samsung")}} />
                </div>
            </div>
        </div>
    )
}

export default ProductsFilter
