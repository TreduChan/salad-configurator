import { useState, useEffect } from "react";
import BowlSelection from '../components/BowlSelection';
import CenterBowl from '../components/CenterBowl';
import BaseSelection from '../components/BaseSelection';
import IngredientSection from '../components/IngredientSection';
import SummaryBar from '../components/SummaryBar';
import { getBowls, getCategories, getIngredients } from "../services/api";
import type { Bowl, Category, Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

export default function Configurator() {
    const baseType = useIngredientStore((state) => state.baseType);
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const bowlsData = await getBowls();
                setBowls(bowlsData);

                const categoriesData = await getCategories();
                setCategories(categoriesData);

                const ingredientsData = await getIngredients();
                setIngredients(ingredientsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filteredBowls = bowls.filter((bowl) => bowl.base_type_id === baseType);
    const filteredCategories = categories.filter((category) => category.base_type_id === baseType);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
                <BowlSelection bowls={filteredBowls} />
                <CenterBowl />
                <BaseSelection ingredients={ingredients.filter((ingredient) => ingredient.categoryId === 6 && filteredCategories.some((category) => category.id === ingredient.categoryId))}/>
            </div>
            <IngredientSection categories={filteredCategories} ingredients={ingredients} />
            <SummaryBar />
        </div>
    );
}