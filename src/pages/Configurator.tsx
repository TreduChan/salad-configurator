import { useState, useEffect } from "react";
import BowlSelection from '../components/BowlSelection';
import CenterBowl from '../components/CenterBowl';
import BaseSelection from '../components/BaseSelection';
import IngredientSection from '../components/IngredientSection';
import SummaryBar from '../components/SummaryBar';
import { getBaseIngredients, getBowls, getCategories, getIngredients, getPrices } from "../services/api";
import type { Bowl, Category, Ingredient, PriceListItem } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

export default function Configurator() {
    const baseType = useIngredientStore((state) => state.baseType);
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);
    const [prices, setPrices] = useState<PriceListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const bowlsData = await getBowls(baseType);
                setBowls(bowlsData);

                const categoriesData = await getCategories(baseType);
                setCategories(categoriesData);

                const ingredientsData = await getIngredients();
                setIngredients(ingredientsData);

                const baseIngredientsData = await getBaseIngredients();
                setBaseIngredients(baseIngredientsData);

                const pricesData = await getPrices();
                setPrices(pricesData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [baseType]);

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
                {baseType === 1 ? (
                    <BaseSelection ingredients={baseIngredients} />
                ) : (
                    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center justify-center shadow-lg">
                        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">2</div>
                        <p className="text-center text-sm text-zinc-300">No base options for Quark</p>
                    </div>
                )}
            </div>
            <IngredientSection categories={filteredCategories} ingredients={ingredients} />
            <SummaryBar prices={prices} />
        </div>
    );
}