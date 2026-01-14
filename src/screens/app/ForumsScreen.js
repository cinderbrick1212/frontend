import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, List, FAB, useTheme, ActivityIndicator } from 'react-native-paper';
import client from '../../api/client';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForumsScreen() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    const fetchPosts = async () => {
        try {
            const res = await client.get('/forums');
            if (res.data.success) {
                setPosts(res.data.posts || []);
            }
        } catch (err) {
            console.log('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderItem = ({ item }) => (
        <List.Item
            title={item.title}
            description={`by ${item.author?.profile?.name || 'Unknown'} • ${new Date(item.createdAt).toLocaleDateString()}`}
            left={props => <List.Icon {...props} icon="message-text-outline" />}
            right={props => <Text {...props} style={{ alignSelf: 'center', marginRight: 10 }}>{item.replies?.length || 0}</Text>}
            onPress={() => { /* Navigate to detail */ }}
            style={styles.item}
        />
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Forums</Text>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No discussions yet</Text>}
                />
            )}

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => console.log('Create post')}
            />
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
    item: {
        backgroundColor: 'white',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
