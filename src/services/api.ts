import type { PriceListItem } from "../types";

const Base_url = 'https://fresse-api.onrender.com/api'

async function fetchData(endpoint: string) {
  const response = await fetch(`${Base_url}/${endpoint}`)

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

export async function getBowls() {
    return fetchData('bowls')
}

export async function getCategories() {
    return fetchData('categories')
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