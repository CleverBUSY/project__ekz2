import axios from "../axios";

class ProductsFood {
    async getProducts(){
        const res = await axios.get('/food').then(res => res.data);
        return res;      
    }
}

export default new ProductsFood();
