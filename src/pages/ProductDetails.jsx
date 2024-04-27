import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Loading from '../components/Loading';
import AddToCartBtn from '../components/AddToCartBtn';



function ProductDetails() {
    const params = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [productImages, setProductImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProductData();
    }, []);

    const getProductData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${params.id}`);
            const data = await response.json();
            console.log(data);
            setProductDetails(data || {});
            setProductImages(data.images || {});
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

   

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='p-3'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-4 col-12 productImages'>
                                <div className=' py-3'>
                                    <Carousel autoPlay={false} swipeable emulateTouch showArrows>
                                        {Object.values(productImages).map((data, i) =>
                                            <div key={i}>
                                                <img src={data} alt={'...'} />
                                            </div>
                                        )}
                                    </Carousel>
                                </div>
                            </div>
                            <div className='col-lg-8 col-12'>
                                <div className='p-5'>
                                    <div className="fs-3">{productDetails.title}</div>
                                    <div className='text-dark'>({productDetails.category})</div>
                                    <div className="mb-2 text-muted fs-4">{productDetails.brand}</div>
                                    <div className="mb-2 text-muted fs-6">{productDetails.description}</div>
                                    <div className="fw-bold fs-5">$ {Number(productDetails.price).toFixed(2)}</div>
                                    <div className='mt-3'>
                                        <AddToCartBtn data={productDetails} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetails;
