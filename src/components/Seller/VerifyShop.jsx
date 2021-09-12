import { React, useState } from 'react';
import { useFormik } from 'formik';
import '../root_style.css';
import axios from 'axios';
import { useParams } from 'react-router';
function VerifyShop() {
    const shop_id = useParams()
    console.log(shop_id['shop_id'])
    const [service_list, setservice_list] = useState(['mobile','plywood','toy','elctric','leptop'])
    const formik = useFormik({
        initialValues : {
            phone: '',
            address: '',
            service: ''
        },
        onSubmit: values => {
            let data = JSON.stringify(values,null, 2)
            axios.post(`http://localhost:3000/seller/shop/${shop_id['shop_id']}/verify-shop`,{
                headers: {"Authenticate" : localStorage.token},
                data:{shop_data: data} 
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    });
    return (
        <div>
            <div className="container">
                <div className="shadow-sm px-4 py-4  mt-5">
                    <div className="text-purple text-center h3">
                        Verify the Shop
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="phone" class="form-label">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" class="form-label">Enter address</label>
                            <input
                                id="address"
                                name="address"
                                type="address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="service" class="form-label">service</label>
                            <select name="service" id="service" class="form-select" 
                                onChange={formik.handleChange}
                                value={formik.values.service}
                                >
                                <option value="Select service" label="Select service" />
                                {service_list.map((item, key) =>
                                    <option key={key} value={item} label={item} />
                                )}
                            </select>
                            <div id="serviceHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div>
                            <button type="submit" className="btn bg-purple">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyShop
