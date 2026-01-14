import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, useTheme, ActivityIndicator, Chip } from 'react-native-paper';
import client from '../../api/client';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuizzesScreen({ navigation }) {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    const fetchQuizzes = async () => {
        try {
            const res = await client.get('/quizzes');
            if (res.data.success) {
                setQuizzes(res.data.quizzes || []);
            }
        } catch (err) {
            console.log('Error fetching quizzes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const renderItem = ({ item }) => (
        <Card style={styles.card} onPress={() => { /* Navigate to attempt */ }}>
            <Card.Content>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text variant="bodyMedium" numberOfLines={2} style={{ marginVertical: 4 }}>
                    {item.description}
                </Text>
                <View style={styles.chips}>
                    <Chip icon="clock" compact style={{ marginRight: 8 }}>{item.timeLimit} mins</Chip>
                    <Chip icon="star" compact>{item.totalMarks} marks</Chip>
                </View>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained-tonal" onPress={() => { }}>Start Quiz</Button>
            </Card.Actions>
        </Card>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Quizzes</Text>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={quizzes}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No active quizzes</Text>}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        elevation: 2,
    },
    list: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    chips: {
        flexDirection: 'row',
        marginTop: 8,
    },
});
