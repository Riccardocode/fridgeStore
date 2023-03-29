import { useState } from "react";
import { CATEGORIES } from "../shared/itemCategories";
import CategoryScreen from "./CategoryScreen";


const Main=() =>{
    const [categories,setCategories] = useState(CATEGORIES);

    return <CategoryScreen categories = {categories}/>
}

export default Main;