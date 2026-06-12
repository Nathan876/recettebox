import React, { useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getRandomMeal } from '@/api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavorite, removeFavorite } from "@/features/favorites/favoriteSlice";

export default function RandomScreen() {
    const dispatch = useAppDispatch();

    const [meal, setMeal] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isFavorite = useAppSelector((s) => s.favorite.favorites.includes(meal?.idMeal));

    useFocusEffect(
        useCallback(() => {
            loadRandomMeal();
        }, [])
    );

    const loadRandomMeal = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getRandomMeal();
            setMeal(data);
        } catch (err) {
            setError('Impossible de charger une recette aléatoire.');
        } finally {
            setLoading(false);
        }
    };

    const getIngredients = () => {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients;
    };

    const toggleFavorite = () => {
        if (!meal) return;

        if (isFavorite) {
            dispatch(removeFavorite(meal.idMeal));
        } else {
            dispatch(addFavorite(meal.idMeal));
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#FF6FA5" />
            </View>
        );
    }

    if (error || !meal) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error || 'Recette introuvable'}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

            <View style={styles.headerRow}>
                <Text style={styles.title}>{meal.strMeal}</Text>
                <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={32}
                        color={isFavorite ? "#FF6FA5" : "#666"}
                    />
                </Pressable>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingrédients</Text>
                {getIngredients().map((item, index) => (
                    <Text key={index} style={styles.ingredient}>• {item}</Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.instructions}>{meal.strInstructions}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingBottom: 40,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 250,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 16,
    },
    favoriteButton: {
        padding: 4,
    },
    section: {
        marginHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: '#FF6FA5',
    },
    ingredient: {
        fontSize: 16,
        color: '#444',
        marginBottom: 4,
    },
    instructions: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});