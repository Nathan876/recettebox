const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (query = '') => {
    try {
        const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
        if (!response.ok) {
            throw new Error('Erreur réseau lors de la recherche');
        }
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Erreur searchMeals:', error);
        throw error;
    }
};

export const getMealById = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Erreur getMealById: ', error);
        throw error;
    }
};

export const getRandomMeal = async () => {
    try {
        const response = await fetch(`${BASE_URL}/random.php`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Erreur getRandomMeal: ', error);
        throw error;
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/categories.php`);
        if (!response.ok) {
            throw new Error('Erreur réseau lors de la récupération des catégories');
        }
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('Erreur getCategories: ', error);
        throw error;
    }
};

export const getMealsByCategory = async (category: string) => {
    try {
        const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
        if (!response.ok) {
            throw new Error('Erreur réseau lors du filtrage par catégorie');
        }
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Erreur getMealsByCategory: ', error);
        throw error;
    }
};