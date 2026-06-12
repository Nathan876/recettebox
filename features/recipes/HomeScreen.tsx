import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import RecipeCard from '../../components/recipe-card';
import { searchMeals, getCategories, getMealsByCategory } from '@/api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setMealsCache } from './recipesSlice';
import { addFavorite, removeFavorite } from '../favorites/favoriteSlice';

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();

    const meals = useAppSelector((s) => s.recipe.meals);
    const favoriteIds = useAppSelector((s) => s.favorite.favorites);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [text, onChangeText] = useState('');

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            const catData = await getCategories();
            setCategories(catData);

            const mealData = await searchMeals('');
            dispatch(setMealsCache(mealData));
        } catch (err) {
            setError('Impossible de charger les données');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setSelectedCategory('');
        try {
            setLoading(true);
            setError(null);
            const data = await searchMeals(text);
            dispatch(setMealsCache(data));
        } catch (err) {
            setError('Impossible de charger les recettes');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCategory = async (categoryName: string) => {
        try {
            setLoading(true);
            setError(null);

            if (selectedCategory === categoryName) {
                setSelectedCategory('');
                const data = await searchMeals('');
                dispatch(setMealsCache(data));
            } else {
                setSelectedCategory(categoryName);
                onChangeText('');
                const data = await getMealsByCategory(categoryName);
                dispatch(setMealsCache(data));
            }
        } catch (err) {
            setError('Impossible de charger cette catégorie');
        } finally {
            setLoading(false);
        }
    };

    const renderRecipe = ({ item }: { item: any }) => {
        const isFavorite = favoriteIds.includes(item.idMeal);

        const toggleFavorite = () => {
            if (isFavorite) {
                dispatch(removeFavorite(item.idMeal));
            } else {
                dispatch(addFavorite(item.idMeal));
            }
        };

        return (
            <View style={styles.cardContainer}>
                <RecipeCard
                    meal={item}
                    onPress={() => navigation.navigate('Detail', { idMeal: item.idMeal })}
                />
                <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={28}
                        color={isFavorite ? "#FF6FA5" : "#666"}
                    />
                </Pressable>
            </View>
        );
    };

    const renderCategory = ({ item }: { item: any }) => {
        const isSelected = selectedCategory === item.strCategory;
        return (
            <Pressable
                style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
                onPress={() => handleSelectCategory(item.strCategory)}
            >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                    {item.strCategory}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                onSubmitEditing={handleSearch}
                placeholder="Chercher une recette..."
            />

            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item) => item.idCategory}
                    renderItem={renderCategory}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#FF6FA5" />
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={renderRecipe}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>Aucune recette trouvée.</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
    },
    listContent: {
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    input: {
        height: 40,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff'
    },
    cardContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    categoriesContainer: {
        height: 50,
        marginBottom: 8,
    },
    categoriesList: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        justifyContent: 'center',
    },
    categoryButtonSelected: {
        backgroundColor: '#FF6FA5',
        borderColor: '#FF6FA5',
    },
    categoryText: {
        color: '#666',
        fontWeight: '600',
    },
    categoryTextSelected: {
        color: '#fff',
    },
});