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