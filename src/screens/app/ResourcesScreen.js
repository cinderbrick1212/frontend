import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text, Surface, Button, useTheme, Searchbar, Chip, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const MOCK_RESOURCES = [
    { id: '1', title: 'React Native Basics', type: 'PDF', size: '2.4 MB', date: '2 days ago', color: '#EF4444' },
    { id: '2', title: 'Advanced Hooks Tutorial', type: 'Video', duration: '15:30', date: '1 week ago', color: '#3B82F6' },
    { id: '3', title: '2025 Mid-Sem Question Paper', type: 'Paper', size: '1.1 MB', date: '2 weeks ago', color: '#F59E0B' },
    { id: '4', title: 'State Management Guide', type: 'Link', url: 'blog.dev', date: '3 days ago', color: '#10B981' },
    { id: '5', title: 'Calculus III Notes', type: 'PDF', size: '5.0 MB', date: '1 month ago', color: '#EF4444' },
    { id: '6', title: 'Data Structures Algo', type: 'Video', duration: '45:00', date: '2 months ago', color: '#3B82F6' },
];

const FILTERS = ['All', 'PDF', 'Video', 'Paper', 'Link'];

export default function ResourcesScreen({ navigation }) {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isGridView, setIsGridView] = useState(false);
    const [filteredData, setFilteredData] = useState(MOCK_RESOURCES);

    useEffect(() => {
        const filtered = MOCK_RESOURCES.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = selectedFilter === 'All' || item.type === selectedFilter; // Simple mock mapping
            return matchesSearch && matchesFilter;
        });
        setFilteredData(filtered);
    }, [searchQuery, selectedFilter]);

    const renderItem = ({ item }) => {
        if (isGridView) {
            return (
                <TouchableOpacity style={styles.gridItemContainer}>
                    <Surface style={styles.gridItem} elevation={2}>
                        <View style={[styles.iconPlaceholder, { backgroundColor: item.color + '20' }]}>
                            <Icon name={getIcon(item.type)} size={32} color={item.color} />
                        </View>
                        <Text variant="titleSmall" numberOfLines={2} style={[styles.gridTitle, { marginTop: 12 }]}>
                            {item.title}
                        </Text>
                        <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                            <Chip textStyle={{ fontSize: 10, marginVertical: -4 }} style={{ height: 24, backgroundColor: '#F3F4F6' }}>
                                {item.type}
                            </Chip>
                        </View>
                    </Surface>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity>
                <Surface style={styles.listItem} elevation={1}>
                    <View style={[styles.listIcon, { backgroundColor: item.color + '20' }]}>
                        <Icon name={getIcon(item.type)} size={24} color={item.color} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text variant="titleMedium" style={{ fontWeight: '600' }}>{item.title}</Text>
                        <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                            {item.type === 'Video' ? item.duration : item.size} • {item.date}
                        </Text>
                    </View>
                    <IconButton icon="download-outline" onPress={() => { }} />
                </Surface>
            </TouchableOpacity>
        );
    };

    const getIcon = (type) => {
        switch (type) {
            case 'PDF': return 'file-pdf-box';
            case 'Video': return 'video';
            case 'Paper': return 'file-document-outline';
            case 'Link': return 'link-variant';
            default: return 'file';
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>Library</Text>
                    <IconButton
                        icon={isGridView ? "view-list" : "view-grid"}
                        onPress={() => setIsGridView(!isGridView)}
                        mode="contained-tonal"
                    />
                </View>

                <Searchbar
                    placeholder="Search resources..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    inputStyle={{ minHeight: 0 }} // Fix for searchbar height
                />

                <View style={{ height: 50, marginTop: 12 }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={FILTERS}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <Chip
                                selected={selectedFilter === item}
                                onPress={() => setSelectedFilter(item)}
                                style={[styles.filterChip, selectedFilter === item && { backgroundColor: theme.colors.secondaryContainer }]}
                                textStyle={selectedFilter === item && { color: theme.colors.onSecondaryContainer, fontWeight: 'bold' }}
                                showSelectedOverlay
                            >
                                {item}
                            </Chip>
                        )}
                        contentContainerStyle={{ paddingRight: 20 }}
                    />
                </View>
            </View>

            <FlatList
                key={isGridView ? 'grid' : 'list'}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={isGridView ? 2 : 1}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={isGridView ? { justifyContent: 'space-between' } : null}
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
        paddingBottom: 0,
    },
    searchBar: {
        borderRadius: 16,
        backgroundColor: 'white',
        elevation: 2,
    },
    filterChip: {
        marginRight: 8,
        backgroundColor: 'white',
    },
    listContent: {
        padding: 20,
        paddingTop: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 12,
    },
    listIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemContainer: {
        width: '48%',
        marginBottom: 16,
    },
    gridItem: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        height: 160,
        justifyContent: 'flex-start',
    },
    iconPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    gridTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
