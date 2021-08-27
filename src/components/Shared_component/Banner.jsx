import React from 'react'

function Banner(props) {
    return (
        <div>
            {console.log(typeof(props.msg))}
            <div className={`alert alert-${props.color}`}>
                { typeof(props.msg) === "object" ? 
                        props.msg.map((data,index)=>(
                            <li key={index}>{data}</li>
                        )) 
                    :
                    <>
                        {props.msg}
                    </>
                }
            </div>
        </div>
    )
}

export default Banner
