import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import RecipeCard from '../../components/recipe-card';
import { getMealById } from '@/api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavorite, removeFavorite } from "@/features/favorites/favoriteSlice";

export default function FavoriteScreen() {
    const navigation = useNavigation<any>();
    const favoriteIds = useAppSelector((s) => s.favorite.favorites);
    const dispatch = useAppDispatch();

    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFavorites();
    }, [favoriteIds]);

    const loadFavorites = async () => {
        try {
            setLoading(true);
            setError(null);

            let fetchedMeals = [];
            for (const id of favoriteIds) {
                fetchedMeals.push(await getMealById(Number(id)));
            }
            setMeals(fetchedMeals);
        } catch (err) {
            setError('Impossible de charger les favoris');
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

    return (
        <View style={styles.container}>
            { loading ? (
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
    }
});