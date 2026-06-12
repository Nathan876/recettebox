import React from 'react';
import { Text, Image, Pressable, StyleSheet } from 'react-native';

interface MealProps {
    meal: {
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
    };
    onPress: () => void;
}

export default function RecipeCard({ meal, onPress }: MealProps) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: meal.strMealThumb }}
                style={styles.image}
            />
            <Text style={styles.title} numberOfLines={2}>
                {meal.strMeal}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 150,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 12,
        color: '#333',
    },
});