import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slice/productReducer';
import { setCurrentPage } from '../../store/slice/paginationReducer';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { productsData } = useSelector(store => store.products);
    const { currentPage, productsPerPage } = useSelector(store => store.pagination);
    const [searchTerm, setSearchTerm] = useState('');
    const [clickedFavs, setClickedFavs] = useState({})

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (!productsData) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(productsData.length / productsPerPage);

    // Функция для фильтрации продуктов по названию
    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    const goToPage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const renderVisiblePages = () => {
        const visiblePages = [];
        const maxVisiblePages = 4; 
        const startPage = Math.max(currentPage - 1, 1);
        const endPage = Math.min(currentPage + 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    disabled={currentPage === i}
                    style={{ margin: '0 5px' }}
                >
                    {i}
                </button>
            );
        }

        return visiblePages;
    };


    const addToCart = (product) => {
        dispatch({ type: "add", payload: product })
    }

    const handleFavClick = (id) => {
        setClickedFavs(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div style={{justifyContent: "space-between"}} className="flex flex-wrap w-full mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">All PRODUCTS</h1>
                            <div className="h-1 w-20 bg-black rounded"></div>
                        </div>
            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '5px', border: "1px solid black", borderRadius: "4px" }}
            />
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {displayedProducts.map(product => (
                            <div key={product.id} className="xl:w-1/4 md:w-1/2 p-4">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                <Link to={`/product/${product.id}`}>
                                    <img className="h-40 rounded w-full object-cover object-center mb-6" src={product.images} alt="content"/>
                                    </Link>
                                    <div style={{alignItems: "center", justifyContent: "space-between"}} className='flex flex-wrap'>
                                    <h3 style={{ color: "#DC780B" }} className="tracking-widest text-xs font-medium title-font">{product.category.name}</h3>
                                    <button style={{border: "1px solid #DEDBDB"}} onClick={() => {
                                addToCart(product)
                                handleFavClick(product.id)
                            }} className="rounded-full w-10 h-10 bg-white p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                {clickedFavs[product.id] ?
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.8413 4.60999C20.3305 4.099 19.7241 3.69364 19.0566 3.41708C18.3892 3.14052 17.6738 2.99817 16.9513 2.99817C16.2288 2.99817 15.5134 3.14052 14.8459 3.41708C14.1785 3.69364 13.572 4.099 13.0613 4.60999L12.0013 5.66999L10.9413 4.60999C9.90959 3.5783 8.51031 2.9987 7.05128 2.9987C5.59225 2.9987 4.19297 3.5783 3.16128 4.60999C2.12959 5.64169 1.54999 7.04096 1.54999 8.49999C1.54999 9.95903 2.12959 11.3583 3.16128 12.39L4.22128 13.45L12.0013 21.23L19.7813 13.45L20.8413 12.39C21.3523 11.8792 21.7576 11.2728 22.0342 10.6053C22.3108 9.93789 22.4531 9.22248 22.4531 8.49999C22.4531 7.77751 22.3108 7.0621 22.0342 6.39464C21.7576 5.72718 21.3523 5.12075 20.8413 4.60999V4.60999Z" fill="#FC573B" stroke="#FC573B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    :
                                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.8421 2.61012C20.3313 2.09912 19.7249 1.69376 19.0574 1.4172C18.39 1.14064 17.6746 0.998291 16.9521 0.998291C16.2296 0.998291 15.5142 1.14064 14.8467 1.4172C14.1793 1.69376 13.5728 2.09912 13.0621 2.61012L12.0021 3.67012L10.9421 2.61012C9.91038 1.57842 8.51111 0.998826 7.05207 0.998826C5.59304 0.998826 4.19376 1.57842 3.16207 2.61012C2.13038 3.64181 1.55078 5.04108 1.55078 6.50012C1.55078 7.95915 2.13038 9.35842 3.16207 10.3901L4.22207 11.4501L12.0021 19.2301L19.7821 11.4501L20.8421 10.3901C21.3531 9.87936 21.7584 9.27293 22.035 8.60547C22.3115 7.93801 22.4539 7.2226 22.4539 6.50012C22.4539 5.77763 22.3115 5.06222 22.035 4.39476C21.7584 3.7273 21.3531 3.12087 20.8421 2.61012V2.61012Z" stroke="#DEDBDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    }
                            </button>
                                    </div>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{product.title}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div style={{ marginTop: '20px', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", paddingBottom: "30px" }}>
                <button style={{ fontSize: "30px"}} onClick={goToPreviousPage} disabled={currentPage === 1}>
                    {'‹'}
                </button>
                <p>
                    {renderVisiblePages()}
                </p>
                <button style={{ fontSize: "30px"}} onClick={goToNextPage} disabled={currentPage === totalPages}>
                    {'›'}
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
