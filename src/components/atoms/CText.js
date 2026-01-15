import React from 'react';
import { Text } from 'react-native-paper';

/**
 * CText (CollegeBase Text) - Atom
 * Wrapper around RNP Text to enforce design system typography.
 * 
 * @param {string} variant - 'displayLarge' | 'headlineMedium' | 'bodyLarge' | ...
 * @param {string} color - Optional color override
 * @param {boolean} centered - Text alignment
 */
export const CText = ({
    variant = 'bodyMedium',
    style,
    children,
    color,
    centered,
    ...props
}) => {
    return (
        <Text
            variant={variant}
            style={[
                color && { color },
                centered && { textAlign: 'center' },
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
