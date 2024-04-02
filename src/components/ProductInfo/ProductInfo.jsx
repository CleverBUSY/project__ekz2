import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';


const ProductInfo = () => {
    const [clickedFavs, setClickedFavs] = useState({})

    const dispatch = useDispatch()
    const addToCart = (product) => {
        dispatch({ type: "add", payload: product })
    }

    const handleFavClick = (id) => {
        setClickedFavs(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    const [card, setCard] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios(`https://6576f7c7197926adf62ce478.mockapi.io/api/v1/food/${id}`)
            .then(({ data }) => {
                setCard(data);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);
    console.log(card);

    return (
        <section className="text-gray-600 bg-white body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -mx-4 -mb-4">
                    <div className="lg:w-1/2 w-full px-4 mb-4 lg:mb-0">

                        <div>
                            <img
                                className="w-full h-auto object-cover object-center rounded"
                                src={card.images}
                                onClick={() => {
                                    handleThumbnailClick(images, index);
                                }}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full px-4 mt-4">
                        <h1 className="text-black text-black text-3xl title-font font-medium mb-1">{card.title}</h1>
                        <p className="leading-relaxed text-white">{card.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-gray-100 mb-5">
                            <span className="title-font font-medium text-2xl text-black"> ${card.price} </span>
                            <button style={{backgroundColor: "#DC780B"}} className="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Pay product</button>
                            <button style={{border: "1px solid #DEDBDB"}} onClick={() => {
                                addToCart(card)
                                handleFavClick(card.id)
                            }} className="rounded-full w-10 h-10 bg-white p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                {clickedFavs[card.id] ?
                                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.8421 2.61012C20.3313 2.09912 19.7249 1.69376 19.0574 1.4172C18.39 1.14064 17.6746 0.998291 16.9521 0.998291C16.2296 0.998291 15.5142 1.14064 14.8467 1.4172C14.1793 1.69376 13.5728 2.09912 13.0621 2.61012L12.0021 3.67012L10.9421 2.61012C9.91038 1.57842 8.51111 0.998826 7.05207 0.998826C5.59304 0.998826 4.19376 1.57842 3.16207 2.61012C2.13038 3.64181 1.55078 5.04108 1.55078 6.50012C1.55078 7.95915 2.13038 9.35842 3.16207 10.3901L4.22207 11.4501L12.0021 19.2301L19.7821 11.4501L20.8421 10.3901C21.3531 9.87936 21.7584 9.27293 22.035 8.60547C22.3115 7.93801 22.4539 7.2226 22.4539 6.50012C22.4539 5.77763 22.3115 5.06222 22.035 4.39476C21.7584 3.7273 21.3531 3.12087 20.8421 2.61012V2.61012Z" stroke="#DEDBDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    :
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.8413 4.60999C20.3305 4.099 19.7241 3.69364 19.0566 3.41708C18.3892 3.14052 17.6738 2.99817 16.9513 2.99817C16.2288 2.99817 15.5134 3.14052 14.8459 3.41708C14.1785 3.69364 13.572 4.099 13.0613 4.60999L12.0013 5.66999L10.9413 4.60999C9.90959 3.5783 8.51031 2.9987 7.05128 2.9987C5.59225 2.9987 4.19297 3.5783 3.16128 4.60999C2.12959 5.64169 1.54999 7.04096 1.54999 8.49999C1.54999 9.95903 2.12959 11.3583 3.16128 12.39L4.22128 13.45L12.0013 21.23L19.7813 13.45L20.8413 12.39C21.3523 11.8792 21.7576 11.2728 22.0342 10.6053C22.3108 9.93789 22.4531 9.22248 22.4531 8.49999C22.4531 7.77751 22.3108 7.0621 22.0342 6.39464C21.7576 5.72718 21.3523 5.12075 20.8413 4.60999V4.60999Z" fill="#FC573B" stroke="#FC573B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>}
                            </button>
                        </div>
                        <div className="lg:w-1/0 mt-40 w-full mt-4 px-4 mb-4 lg:mb-0 hidden md:block">
                            <div className="flex flex-wrap -mx-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductInfo;
