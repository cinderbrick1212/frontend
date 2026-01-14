import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Button, useTheme, Avatar, Card } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    const { userInfo, logout } = useContext(AuthContext);
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <View>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Hello, {userInfo?.profile?.name || 'Student'}</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Welcome to CollegeBase</Text>
                </View>
                <Button mode="outlined" onPress={logout} compact>
                    Logout
                </Button>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <Surface style={[styles.statCard, { backgroundColor: theme.colors.primaryContainer }]} elevation={2}>
                        <Text variant="labelLarge" style={{ color: theme.colors.primary }}>Attendance</Text>
                        <Text variant="displayMedium" style={{ color: theme.colors.primary }}>85%</Text>
                    </Surface>
                    <Surface style={[styles.statCard, { backgroundColor: theme.colors.secondaryContainer }]} elevation={2}>
                        <Text variant="labelLarge" style={{ color: theme.colors.secondary }}>Avg Marks</Text>
                        <Text variant="displayMedium" style={{ color: theme.colors.secondary }}>78</Text>
                    </Surface>
                </View>

                {/* Quick Actions */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    <Card style={styles.actionCard} onPress={() => navigation.navigate('Resources')} mode="elevated">
                        <Card.Content style={styles.cardContent}>
                            <Avatar.Icon size={48} icon="file-document" style={{ backgroundColor: theme.colors.primary }} />
                            <Text style={styles.cardLabel}>Resources</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.actionCard} onPress={() => navigation.navigate('Quizzes')} mode="elevated">
                        <Card.Content style={styles.cardContent}>
                            <Avatar.Icon size={48} icon="school" style={{ backgroundColor: theme.colors.tertiary }} />
                            <Text style={styles.cardLabel}>Quizzes</Text>
                        </Card.Content>
                    </Card>
                </View>

                {/* AI Tutor Promo */}
                <Surface style={styles.promoCard} elevation={4}>
                    <View style={{ flex: 1 }}>
                        <Text variant="titleMedium" style={{ color: 'white', fontWeight: 'bold' }}>AI Tutor</Text>
                        <Text variant="bodySmall" style={{ color: 'white', opacity: 0.9 }}>Get instant help with your studies.</Text>
                    </View>
                    <Button mode="contained" buttonColor="white" textColor={theme.colors.primary} onPress={() => { }}>
                        Chat Now
                    </Button>
                </Surface>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        padding: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        flex: 0.48,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    actionCard: {
        width: '48%',
        marginBottom: 16,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    cardLabel: {
        marginTop: 8,
        fontWeight: 'bold',
    },
    promoCard: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#6366F1', // Indigo 500
        flexDirection: 'row',
        alignItems: 'center',
    },
});
