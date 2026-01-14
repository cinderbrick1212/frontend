import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, List, FAB, useTheme, ActivityIndicator } from 'react-native-paper';
import client from '../../api/client';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResourcesScreen() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    const fetchResources = async () => {
        try {
            // Endpoint based on backend route
            const res = await client.get('/resources'); // Assume /api/resources returns { success: true, resources: [] }
            if (res.data.success) {
                setResources(res.data.resources || []);
            }
        } catch (err) {
            console.log('Error fetching resources:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const renderItem = ({ item }) => (
        <List.Item
            title={item.title}
            description={`${item.category} • ${item.subject || 'General'}`}
            left={props => <List.Icon {...props} icon="file-download" />}
            onPress={() => { /* Handle download */ }}
            style={styles.item}
        />
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Resources</Text>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={resources}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchResources} />}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No resources found</Text>}
                />
            )}

            {/* TODO: Add FAB for upload if teacher */}
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
});
