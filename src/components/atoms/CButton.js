import { StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator, TouchableRipple } from 'react-native-paper';
import LinearGradient from '../LinearGradientShim';
import { theme, gradients } from '../../theme';

/**
 * CButton (CollegeBase Button) - Atom
 * 
 * @param {string} mode - 'contained' | 'outlined' | 'text' | 'gradient'
 * @param {string} gradientType - 'joy' | 'focus' | 'success' (only if mode='gradient')
 * @param {boolean} loading - Shows spinner
 * @param {Function} onPress - Press handler
 * @param {string} label - Button text
 * @param {Object} style - Override styles
 */
export const CButton = ({
    mode = 'contained',
    gradientType = 'focus',
    loading = false,
    onPress,
    label,
    style,
    icon,
    disabled
}) => {

    // Custom Gradient Button Implementation
    if (mode === 'gradient') {
        const gradientColors = gradients[gradientType] || gradients.focus;

        return (
            <TouchableRipple
                onPress={loading || disabled ? null : onPress}
                style={[styles.gradientContainer, style, disabled && styles.disabled]}
                borderless
                rippleColor="rgba(255, 255, 255, 0.32)"
            >
                <LinearGradient
                    colors={disabled ? ['#B0B0B0', '#D3D3D3'] : gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" size={20} />
                    ) : (
                        <Text style={styles.gradientLabel}>{label}</Text>
                    )}
                </LinearGradient>
            </TouchableRipple>
        );
    }

    // Fallback to React Native Paper Button for standard modes
    return (
        <Button
            mode={mode}
            onPress={onPress}
            loading={loading}
            disabled={disabled}
            icon={icon}
            style={[styles.button, style]}
            contentStyle={styles.content}
            labelStyle={styles.label}
            buttonColor={mode === 'contained' ? theme.colors.primary : undefined}
            textColor={mode === 'contained' ? '#FFF' : theme.colors.primary}
        >
            {label}
        </Button>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        borderRadius: theme.roundness,
        overflow: 'hidden',
        elevation: 2,
        marginVertical: 4,
    },
    gradient: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientLabel: {
        color: '#FFFFFF',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    button: {
        borderRadius: theme.roundness,
        marginVertical: 4,
    },
    content: {
        height: 48, // Taller, friendlier touch targets
    },
    label: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    disabled: {
        opacity: 0.6,
    }
});
