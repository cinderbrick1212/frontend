import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, IconButton } from 'react-native-paper';
import { CText } from '../atoms/CText';
import { theme } from '../../theme';

export const StatCard = ({
    label,
    value,
    icon = 'chart-bar',
    color = theme.colors.primary,
    style
}) => {
    return (
        <Surface style={[styles.container, style]} elevation={1}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                    <IconButton icon={icon} iconColor={color} size={24} style={{ margin: 0 }} />
                </View>
                {/* Optional: Add a sparkline or trend indicator here later */}
            </View>

            <View style={styles.content}>
                <CText variant="headlineMedium" style={styles.value}>{value}</CText>
                <CText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {label}
                </CText>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surface,
        flex: 1, // Allow grid layout
        minWidth: 150,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: 4,
    },
    value: {
        fontWeight: 'bold',
    }
});
