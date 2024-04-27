import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading'
import AddToCartBtn from '../components/AddToCartBtn';
const ProductList = () => {
  const navigate = useNavigate();
  const [productArr, setProductArr] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProductArr(data.products || []);
      setFilteredProducts(data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeSortByHandle = (e) => {
    setSearchKey('');
    let sortedArr = [...filteredProducts];
    let value = e.target.value;
    if (value === 'LtoH') {
      sortedArr.sort((a, b) => a.price - b.price);
    }
    if (value === 'HtoL') {
      sortedArr.sort((a, b) => b.price - a.price);
    }
    setSortBy(value);
    setFilteredProducts(sortedArr);
  };

  const searchHandle = (e) => {
    const value = e.target.value;
    setSearchKey(value);
    const filtered = productArr.filter(product => product.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredProducts(filtered);
    setSortBy('');
  };


  return (
    <>
      {filteredProducts.length > 0 ?
        <div className='p-3'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3 col-6'>
                <div className=''>
                  <input
                    onChange={searchHandle}
                    className="form-control me-2"
                    value={searchKey}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </div>
              <div className='col-lg-3 col-6'>
                <div className=''>
                  <select onChange={onChangeSortByHandle} className='form-select' value={sortBy}>
                    <option value='' disabled>Price Filter</option>
                    <option value='LtoH'>Low to High</option>
                    <option value='HtoL'>High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='row'>
              {filteredProducts.map((data) =>
                <div key={data.id} className='col-lg-4 col-12 p-3'>
                  <div className="card border-0 shadow" >
                    <div className='p-2'>
                      <img src={data.thumbnail} className="card-img-top rounded " alt="..." />
                    </div>
                    <div className="card-body" >
                      <div onClick={() => navigate(`/details/${data.id}`)}>
                        <div className="card-title fs-5">{data.title}</div>
                        <div className="card-subtitle mb-2 text-muted fs-6">{data.brand} <small className='text-dark'>({data.category})</small> </div>
                        <div className="card-text fw-bold fs-5">$ {data.price.toFixed(2)}</div>
                      </div>
                      <div className='mt-3'>
                       <AddToCartBtn data={data} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div> :
        <Loading />
      }
    </>
  );
};

export default ProductList;
