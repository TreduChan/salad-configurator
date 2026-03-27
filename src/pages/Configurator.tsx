import { useState } from "react";
import BowlSelection from '../components/BowlSelection';
import CenterBowl from '../components/CenterBowl';
import BaseSelection from '../components/BaseSelection';

export default function Configurator() {
    type Bowl = any;
    type Category = any;
    type Ingredient = any;
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    //For peace and mind delete later
    void bowls, setBowls;
    void categories, setCategories;
    void ingredients, setIngredients;
    return (
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
            <BowlSelection />
            <CenterBowl />
            <BaseSelection />
        </div>
    );
}