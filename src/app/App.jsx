// App.js

import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../page/Home/Home';
import Admin from '../page/Admin/Admin';
import Products from '../page/Products/Products';
import Contact from '../page/Contact/Contact';
import Category from '../components/Category/Category';
import Header from '../page/Header/Header';
import Footer from '../page/Footer/Footer';
import RegistrationModal from '../components/RegistrationModal/RegistrationModal';
import ProductsPage from '../page/ProductsPage/ProductsPage';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import Favorites from '../page/Favorites/Favorites';
import SignIn from '../components/SIgnIn/SignIn';

const App = () => {
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showRegistrationModalAdmin, setShowRegistrationModalAdmin] = useState(false);
    const [registeredUserName, setRegisteredUserName] = useState('');

    const location = useLocation();

    const handleContactClick = () => {
        setShowRegistrationModal(true);
        setShowRegistrationModalAdmin(false);
    };

    const handleCloseModal = () => {
        setShowRegistrationModal(false);
        setShowRegistrationModalAdmin(false);

        const storedName = localStorage.getItem('registeredName');
        if (storedName) {
            setRegisteredUserName(storedName);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('registeredEmail');
        localStorage.removeItem('registeredName');
        localStorage.removeItem('isUserRegistered');
        setRegisteredUserName('');
    };

    useEffect(() => {
        const storedName = localStorage.getItem('registeredName');
        const isUserRegistered = localStorage.getItem('isUserRegistered');

        if (storedName && isUserRegistered === 'true') {
            setRegisteredUserName(storedName);
            setShowRegistrationModal(false); // Закрыть модальное окно, если пользователь уже зарегистрирован
            setShowRegistrationModalAdmin(false); // Закрыть модальное окно, если пользователь уже зарегистрирован
        } else {
            setShowRegistrationModal(location.pathname === '/contact'); // Показать модальное окно, если пользователь перешел по ссылке "Contact"
            setShowRegistrationModalAdmin(location.pathname === '/admin'); // Показать модальное окно, если пользователь перешел по ссылке "Contact"
        }
    }, [location]);

    return (
        <>
            <Header
                onContactClick={handleContactClick}
                registeredUserName={registeredUserName}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="/products/:categoryId" element={<Products />} />
                <Route path='/productspage' element={<ProductsPage />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/category' element={<Category />} />
                <Route path='/product/:id' element={<ProductInfo />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/signup' element={<SignIn/>}/>
                <Route path='/registrmodal' element={<RegistrationModal/>}/>
            </Routes>
            <Footer />
            {showRegistrationModal && <RegistrationModal onClose={handleCloseModal} showCloseIcon={location.pathname === '/contact'} />}
            {showRegistrationModalAdmin
                && <RegistrationModal onClose={handleCloseModal} showCloseIcon={location.pathname === '/admin'} />}
        </>
    );
};

export default App;
