import { useState, useEffect } from "react";
import BowlSelection from '../components/BowlSelection';
import CenterBowl from '../components/CenterBowl';
import BaseSelection from '../components/BaseSelection';
import { getBowls, getCategories, getIngredients } from "../services/api";
import type { Bowl, Category, Ingredient } from "../types";

export default function Configurator() {
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

    return (
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
            <BowlSelection bowls={bowls} />
            <CenterBowl />
            <BaseSelection />
        </div>
    );
}