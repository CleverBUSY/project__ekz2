import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../store/slice/orderReducer';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const orders = useSelector(store => store.orders.orders);
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = (id) => {
        dispatch(remove(id));
    }

    console.log(orders, "orders")
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {
                            orders.map(el => (
                                console.log(el, "el"),
                                <div key={el.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                    <Link to={`/product/${el.id}`}>
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={el.images} />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className=" text-gray-900 text-indigo-400 text-xl tracking-widest title-font mb-1">{el.title}</h3>
                                        </div>
                                    </Link>
                                    <p className="mt-1 text-white text-xl">${el.price}</p>
                                    <button onClick={() => handleRemoveFromFavorites(el.id)}>
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Favorites;
