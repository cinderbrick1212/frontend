import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Surface, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../../context/AuthContext';
import LinearGradient from '../../components/LinearGradientShim';
import { CText, CButton, CInput } from '../../components/atoms';
import { gradients } from '../../theme';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { register, isLoading } = useContext(AuthContext);
    const theme = useTheme();

    const handleRegister = async () => {
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            await register(email, password);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Registration failed.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                {/* Background Gradient */}
                <LinearGradient
                    colors={gradients.focus}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />

                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.headerContainer}>
                            <View style={styles.iconContainer}>
                                <CText style={{ fontSize: 40 }}>🚀</CText>
                            </View>
                            <CText variant="displaySmall" style={[styles.title, { color: 'white' }]}>
                                Join CollegeBase
                            </CText>
                            <CText variant="bodyLarge" style={[styles.subtitle, { color: 'rgba(255,255,255,0.9)' }]}>
                                Start your learning journey today
                            </CText>
                        </View>

                        <Surface style={styles.formCard} elevation={5}>
                            <CText variant="headlineSmall" style={[styles.formTitle, { color: theme.colors.primary }]}>
                                Create Account
                            </CText>

                            {error ? (
                                <View style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
                                    <CText style={{ color: theme.colors.error, textAlign: 'center' }}>
                                        {error}
                                    </CText>
                                </View>
                            ) : null}

                            <CInput
                                label="Student Email"
                                value={email}
                                onChangeText={(text) => { setEmail(text); setError(''); }}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                disabled={isLoading}
                                left={<TextInput.Icon icon="email-outline" color={theme.colors.primary} />}
                            />

                            <CInput
                                label="Password"
                                value={password}
                                onChangeText={(text) => { setPassword(text); setError(''); }}
                                secureTextEntry
                                disabled={isLoading}
                                left={<TextInput.Icon icon="lock-outline" color={theme.colors.primary} />}
                            />

                            <CInput
                                label="Confirm Password"
                                value={confirmPassword}
                                onChangeText={(text) => { setConfirmPassword(text); setError(''); }}
                                secureTextEntry
                                disabled={isLoading}
                                left={<TextInput.Icon icon="lock-check-outline" color={theme.colors.primary} />}
                            />

                            <CButton
                                mode="gradient"
                                gradientType="joy"
                                label={isLoading ? 'Creating Account...' : 'Sign Up'}
                                onPress={handleRegister}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.button}
                            />
                        </Surface>

                        <View style={styles.footer}>
                            <CText variant="bodyMedium" style={{ color: 'white' }}>Already have an account? </CText>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <CText style={{ color: 'white', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                    Login
                                </CText>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        opacity: 0.9,
    },
    formCard: {
        padding: 32,
        borderRadius: 24,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    formTitle: {
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    errorContainer: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
        marginBottom: 20, // Extra padding for scroll
        alignItems: 'center',
    },
});
