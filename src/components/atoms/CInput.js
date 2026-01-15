import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { theme } from '../../theme';

/**
 * CInput (CollegeBase Input) - Atom
 * Standardized input field with error handling and consistent styling.
 * 
 * @param {string} label - Floating label text
 * @param {string} value - Input value
 * @param {Function} onChangeText - Handler
 * @param {string} error - Error message (if any)
 * @param {boolean} secureTextEntry - for passwords
 * @param {Object} props - specific TextInput props (keyboardType, etc)
 */
export const CInput = ({
    label,
    value,
    onChangeText,
    error,
    secureTextEntry,
    right,
    left,
    style,
    ...props
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label={label}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                right={right}
                left={left}
                style={[styles.input, style]}
                outlineStyle={styles.outline}
                activeOutlineColor={theme.colors.primary}
                error={!!error}
                theme={{ roundness: theme.roundness }} // Ensure roundness is passed
                contentStyle={styles.content}
                {...props}
            />
            {error && (
                <HelperText type="error" visible={!!error} style={styles.errorText}>
                    {error}
                </HelperText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        width: '100%',
    },
    input: {
        backgroundColor: theme.colors.surface,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    content: {
        fontFamily: 'Inter_400Regular',
    },
    outline: {
        borderRadius: theme.roundness,
    },
    errorText: {
        fontFamily: 'Inter_400Regular',
    }
});
