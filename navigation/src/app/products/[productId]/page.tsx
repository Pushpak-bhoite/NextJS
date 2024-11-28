import Link from 'next/link'
import React from 'react'

function Product({params}:{params:{productId: String}}) {
    console.log('productId',params.productId);
    return (

        <div>
            <h1> This is Product {}</h1>
           
        </div>
    )
}

export default Product