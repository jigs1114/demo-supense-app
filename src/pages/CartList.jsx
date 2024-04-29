import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CartList = () => {
    const navigate = useNavigate();
    const [cartListArr, setCartListArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartList = async () => {
            try {
                const cartArr = JSON.parse(localStorage.getItem('cartlist')) || [];
                setCartListArr(cartArr);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching cart list: ", error);
            }
        };

        fetchCartList();
    }, []);

    const updateCartList = (updatedCartList) => {
        setCartListArr(updatedCartList);
        localStorage.setItem('cartlist', JSON.stringify(updatedCartList));
    };

    const onClickQtyAdd = (id) => {
        const updatedCartList = cartListArr.map(item => {
            if (item.id === id) {
                return { ...item, qty: item.qty + 1 };
            }
            return item;
        });
        updateCartList(updatedCartList);
    };

    const onClickQtyMinus = (id) => {
        const updatedCartList = cartListArr.map(item => {
            if (item.id === id && item.qty > 1) {
                return { ...item, qty: item.qty - 1 };
            }
            return item;
        });
        updateCartList(updatedCartList);
    };

    const onClickDelete = (id) => {
        const updatedCartList = cartListArr.filter(item => item.id !== id);
        updateCartList(updatedCartList);
    };

    return (
        <>
            <Header />
            <div className='p-3'>
                <div className='container cartlist_container'>
                    {isLoading ? (
                        <Loading />
                    ) : cartListArr.length > 0 ? (
                        <div className='row'>
                            {cartListArr.map((data) =>
                                <div key={data.id} className='col-12 p-3'>
                                    <div className=" d-flex justify-content-between border-0 shadow p-3" >
                                        <div className='d-flex  pointer' onClick={() => navigate(`/details/${data.id}`)}>
                                            
                                            <div className=''>
                                                <img src={data.thumbnail} className=" rounded " alt="..." width={150} />
                                            </div>
                                            <div className='ms-3'>
                                                <div className="card-title fs-5">{data.title}</div>
                                                <div className="card-subtitle mb-2 text-muted fs-6">{data.brand} <small className='text-dark'>({data.category})</small> </div>
                                            </div>
                                        </div>
                                        <div className="d-flex fw-bold fs-5">
                                            <div className="card-text fw-bold fs-5 me-5">$ {(data.price * data.qty).toFixed(2)}</div>
                                            <div>
                                                <button className='btn btn-outline-secondary' onClick={() => onClickQtyMinus(data.id)} disabled={data.qty === 1}>-</button>
                                            </div>
                                            <div className='mx-3'>
                                                {data.qty}
                                            </div>
                                            <div>
                                                <button className='btn btn-outline-secondary' onClick={() => onClickQtyAdd(data.id)}>+</button>
                                            </div>

                                        <div className="ms-3">
                                                <div className='badge text-danger pointer' onClick={() => onClickDelete(data.id)}><FontAwesomeIcon icon={faTimes} /></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            <div className='mt-3 text-end'>
                                <button className='btn btn-outline-primary'>Check Out</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='text-center'>
                                <div className='mt-3'>
                                    Cart is empty!
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-outline-primary' onClick={() => navigate('/')}>Continue Shopping</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartList;
