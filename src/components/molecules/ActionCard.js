import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, MaterialCommunityIcons as Icon } from 'react-native-paper'; // Fix import
import { CText } from '../atoms/CText';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ActionCard = ({ title, icon, color, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <Surface style={styles.card} elevation={1}>
                <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                    <MaterialCommunityIcons name={icon} size={28} color={color} />
                </View>
                <CText variant="labelLarge" style={styles.title} centered>{title}</CText>
            </Surface>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '40%',
        minWidth: 80,
        marginBottom: 16,
    },
    card: {
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        minHeight: 100,
        justifyContent: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontWeight: '600',
        marginTop: 4,
        fontFamily: 'sans-serif',
        fontSize: 16,
    }
});
