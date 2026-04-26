import type { PriceListItem } from "../types";

export type SaveRecipePayload = {
  name: string;
  bowlId: number;
  ingredientIds: number[];
  isPublic?: boolean;
};

const Base_url = 'https://fresse-api.onrender.com/api'

async function fetchData(endpoint: string) {
  const response = await fetch(`${Base_url}/${endpoint}`)

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

export async function getBowls(typeId?: number) {
  const endpoint = typeId ? `bowls?type_id=${typeId}` : 'bowls'
  return fetchData(endpoint)
}

export async function getCategories(typeId?: number) {
  const endpoint = typeId ? `categories?type_id=${typeId}` : 'categories'
  return fetchData(endpoint)
}

export async function getIngredients() {
    return fetchData('ingredients')
}

export async function getPrices() {
  return fetchData('prices')
}

export async function getPricesWithToken(token: string): Promise<PriceListItem[]> {
  const response = await fetch(`${Base_url}/prices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ REQUIRED
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${Base_url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export async function saveRecipe(token: string, recipeData: SaveRecipePayload) {
  const response = await fetch(`${Base_url}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: recipeData.name,
      bowlId: recipeData.bowlId,
      ingredientIds: recipeData.ingredientIds,
      isPublic: recipeData.isPublic ?? false,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}