import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from '../../components/LinearGradientShim';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useContext(AuthContext);
    const theme = useTheme();

    const handleLogin = async () => {
        setError('');
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
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
                    colors={[theme.colors.primary, theme.colors.secondaryContainer]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />

                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.headerContainer}>
                            <View style={styles.iconContainer}>
                                <Text style={{ fontSize: 40 }}>🎓</Text>
                            </View>
                            <Text variant="displaySmall" style={[styles.title, { color: 'white' }]}>
                                CollegeBase
                            </Text>
                            <Text variant="bodyLarge" style={[styles.subtitle, { color: 'rgba(255,255,255,0.9)' }]}>
                                Your Campus Companion
                            </Text>
                        </View>

                        <Surface style={styles.formCard} elevation={5}>
                            <Text variant="headlineSmall" style={[styles.formTitle, { color: theme.colors.primary }]}>
                                Welcome Back
                            </Text>

                            {error ? (
                                <View style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
                                    <Text style={{ color: theme.colors.error, textAlign: 'center' }}>
                                        {error}
                                    </Text>
                                </View>
                            ) : null}

                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={(text) => { setEmail(text); setError(''); }}
                                mode="outlined"
                                style={styles.input}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                disabled={isLoading}
                                left={<TextInput.Icon icon="email" color={theme.colors.primary} />}
                                outlineColor="transparent"
                                activeOutlineColor={theme.colors.primary}
                                theme={{ roundness: 12 }}
                            />
                            <TextInput
                                label="Password"
                                value={password}
                                onChangeText={(text) => { setPassword(text); setError(''); }}
                                mode="outlined"
                                secureTextEntry
                                style={styles.input}
                                disabled={isLoading}
                                left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
                                outlineColor="transparent"
                                activeOutlineColor={theme.colors.primary}
                                theme={{ roundness: 12 }}
                            />

                            <Button
                                mode="contained"
                                onPress={handleLogin}
                                style={styles.button}
                                contentStyle={{ height: 56 }}
                                labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Login'}
                            </Button>
                        </Surface>

                        <View style={styles.footer}>
                            <Text variant="bodyMedium" style={{ color: 'white' }}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
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
    input: {
        marginBottom: 16,
        backgroundColor: '#F3F4F6',
    },
    button: {
        marginTop: 16,
        borderRadius: 16,
        elevation: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        alignItems: 'center',
    },
});
