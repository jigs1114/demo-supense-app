import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddToCartBtn = (props) => {

    const navigate = useNavigate();
    useEffect(() => {
        getCartData();
    }, []);
    const [cartArr, setCartArr] = useState([]);
    const onClickAddtoCartHandle = (data) => {
        const uData = JSON.parse(localStorage.getItem('loginUser')) || null
        if (!uData) {
            navigate('/login')
            return
        }
        const updatedCart = [...cartArr, { ...data, qty: 1 }];
        setCartArr(updatedCart);
        localStorage.setItem('cartlist', JSON.stringify(updatedCart));
    };

    const getCartData = () => {
       
        const cartlist = JSON.parse(localStorage.getItem('cartlist')) || [];
        setCartArr(cartlist);
    };

    const gotoCart = () => {
        const uData = JSON.parse(localStorage.getItem('loginUser')) || null
        if (!uData) {
            navigate('/login')
            return
        }
        navigate('/cartlist')
    }
    return (
        <>
            <div className=''>
                {cartArr.findIndex(e => e.id === props.data.id) !== -1 ?
                    <button className='btn btn-outline-secondary' onClick={gotoCart }>Go to Cart</button>
                    :
                    <button className='btn btn-outline-primary' onClick={() => onClickAddtoCartHandle(props.data)}>Add to Cart</button>}
            </div>
        </>
    )
}

export default AddToCartBtn