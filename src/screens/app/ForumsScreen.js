import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions } from 'react-native';
import { Text, Surface, Button, FAB, Modal, Portal, TextInput, useTheme, Avatar, IconButton, Divider } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import client from '../../api/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ForumsScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { userToken, userInfo } = useContext(AuthContext);
    const theme = useTheme();

    // Modal State
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posting, setPosting] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => { setVisible(false); setTitle(''); setContent(''); };

    const fetchPosts = async () => {
        try {
            const response = await client.get('/forums');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchPosts();
    };

    const handleCreatePost = async () => {
        if (!title || !content) return;
        setPosting(true);
        try {
            await client.post('/forums', { title, content });
            hideModal();
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setPosting(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.chatRow}>
            <Avatar.Text
                size={48}
                label={item.author?.profile?.name?.charAt(0) || 'U'}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                color={theme.colors.primary}
            />
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text variant="titleMedium" style={styles.chatTitle} numberOfLines={1}>{item.title}</Text>
                    <Text variant="bodySmall" style={styles.chatTime}>
                        {formatDistanceToNow(new Date(item.createdAt || Date.now()), { addSuffix: true })}
                    </Text>
                </View>
                <Text variant="bodyMedium" numberOfLines={2} style={styles.chatPreview}>
                    {item.author?.profile?.name?.split(' ')[0]}: {item.content}
                </Text>
                <Divider style={{ marginTop: 12, backgroundColor: '#F3F4F6' }} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#000' }]}>
            {/* Header - WhatsApp Style */}
            <LinearGradient
                colors={['#9519fa', '#6e45fb', '#215bfb']} // Utilising V2 Theme Gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            > 
                <View>        
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: 'white', flex: 1 }}>College Community</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton icon="magnify" iconColor="white" onPress={() => { }} />
                        <IconButton icon="dots-vertical" iconColor="white" onPress={() => { }} />
                    </View>
                </View>    
            </LinearGradient>  

            {/* Tabs (Mock) */}
            <View style={[styles.tabs, { backgroundColor: theme.colors.primary }]}>
                <View style={styles.tabItem}>
                    <Icon name="account-group" size={24} color="rgba(255,255,255,0.6)" />
                </View>
                <View style={[styles.tabItem, styles.activeTab]}>
                    <Text style={styles.tabText}>Chats</Text>
                </View>
                <View style={styles.tabItem}>
                    <Text style={styles.tabText}>Updates</Text>
                </View>
                <View style={styles.tabItem}>
                    <Text style={styles.tabText}>Calls</Text>
                </View>
            </View>

            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item._id || Math.random().toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <Icon name="chat-outline" size={64} color="#E5E7EB" />
                        <Text variant="bodyLarge" style={{ color: '#9CA3AF', marginTop: 16 }}>No discussions yet.</Text>
                    </View>
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text variant="titleLarge" style={{ marginBottom: 24, fontWeight: 'bold' }}>New Discussion</Text>
                    <TextInput
                        label="Topic Title"
                        value={title}
                        onChangeText={setTitle}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Content"
                        value={content}
                        onChangeText={setContent}
                        mode="outlined"
                        multiline
                        numberOfLines={6}
                        style={styles.input}
                    />
                    <View style={styles.modalActions}>
                        <Button onPress={hideModal} style={{ marginRight: 8 }}>Cancel</Button>
                        <Button mode="contained" onPress={handleCreatePost} loading={posting} disabled={posting}>
                            Post
                        </Button>
                    </View>
                </Modal>
            </Portal>

            <FAB
                icon="message-plus"
                style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
                color="white"
                onPress={showModal}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 0,
    },
    tabs: {
        flexDirection: 'row',
        paddingBottom: 0,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: 'white',
    },
    tabText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    list: {
        paddingTop: 8,
    },
    chatRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'flex-start',
    },
    chatContent: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    chatTitle: {
        fontWeight: 'bold',
        color: '#111827',
        flex: 1,
        marginRight: 8,
    },
    chatTime: {
        color: '#10B981', // WhatsApp Green for time? Or Gray. Let's stick to theme.
        fontSize: 12,
    },
    chatPreview: {
        color: '#6B7280',
        fontSize: 14,
        lineHeight: 20,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        borderRadius: 16,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 24,
        margin: 20,
        borderRadius: 24,
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
});
