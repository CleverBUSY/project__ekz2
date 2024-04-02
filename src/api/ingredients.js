import axios from "../ingredients";

class IngredientsFood {
    async getProducts(){
        const res = await axios.get('/ingredients').then(res => res.data);
        console.log(res, "ingredients");
        return res;      
    }
}

export default new IngredientsFood();
