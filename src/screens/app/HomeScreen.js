import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Surface, useTheme, Avatar, IconButton, FAB, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { AuthContext } from '../../context/AuthContext';
import LinearGradient from '../../components/LinearGradientShim';
import { CText } from '../../components/atoms/CText';
import { ActionCard } from '../../components/molecules/ActionCard';
import { gradients } from '../../theme';

const { width } = Dimensions.get('window');

// Mock Data for Dynamic Feed
const FEED_ITEMS = [
    { id: '1', type: 'event', title: 'Campus Hackathon', time: 'Tomorrow, 10:00 AM', color: '#8B5CF6', icon: 'trophy-outline' },
    { id: '2', type: 'assignment', title: 'Physics Lab Report', time: 'Due in 2 days', color: '#EF4444', icon: 'clipboard-alert-outline' },
    { id: '3', type: 'ai', title: 'Weak Subject Alert: Chemistry', time: 'Recommended: Take a Quiz', color: '#10B981', icon: 'robot-happy-outline' },
];

export default function HomeScreen({ navigation }) {
    const { userInfo, logout } = useContext(AuthContext);
    const theme = useTheme();

    const renderFeedItem = ({ item }) => (
        <Surface style={styles.feedItem} elevation={1}>
            <View style={[styles.feedIcon, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} size={24} color={item.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
                <CText variant="titleMedium" style={{ fontWeight: '600' }}>{item.title}</CText>
                <CText variant="bodySmall" style={{ color: theme.colors.outline }}>{item.time}</CText>
            </View>
            <Icon name="chevron-right" size={24} color={theme.colors.outline} />
        </Surface>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Extended Gradient Header */}
            <LinearGradient
                colors={gradients.focus} // Utilising V2 Theme Gradient
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.headerContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar.Text
                                size={48}
                                label={userInfo?.profile?.name?.charAt(0) || 'S'}
                                style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginRight: 12 }}
                                color="white"
                            />
                            <View>
                                <CText variant="bodyMedium" style={{ color: 'rgba(255,255,255,0.9)' }}>Namaste,</CText>
                                <CText variant="headlineSmall" style={{ color: 'white', fontWeight: 'bold' }}>
                                    {userInfo?.profile?.name?.split(' ')[0] || 'Student'}
                                </CText>
                            </View>
                        </View>
                        <IconButton
                            icon="bell-ring-outline"
                            iconColor="white"
                            containerColor="rgba(255,255,255,0.2)"
                            onPress={() => { }}
                            size={24}
                        />
                    </View>

                    {/* Quick Stats in Header */}
                    <View style={styles.headerStats}>
                        <View style={styles.headerStatItem}>
                            <CText variant="displayMedium" style={{ color: 'white', fontWeight: 'bold' }}>85%</CText>
                            <CText variant="bodySmall" style={{ color: 'rgba(255,255,255,0.8)' }}>Attendance</CText>
                        </View>
                        <View style={styles.headerStatDivider} />
                        <View style={styles.headerStatItem}>
                            <CText variant="displayMedium" style={{ color: '#FFD700', fontWeight: 'bold' }}>3.8</CText>
                            <CText variant="bodySmall" style={{ color: 'rgba(255,255,255,0.8)' }}>CGPA</CText>
                        </View>
                        <View style={styles.headerStatDivider} />
                        <View style={styles.headerStatItem}>
                            <CText variant="displayMedium" style={{ color: '#6EE7B7', fontWeight: 'bold' }}>12</CText>
                            <CText variant="bodySmall" style={{ color: 'rgba(255,255,255,0.8)' }}>Pending</CText>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* AI Tutor / Mock Test Promo */}
                <TouchableOpacity onPress={() => navigation.navigate('Quizzes')} activeOpacity={0.9}>
                    <Surface style={styles.promoCard} elevation={4}>
                        <LinearGradient
                            colors={gradients.joy} // Utilising V2 Theme Gradient
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                        <View style={{ flex: 1, zIndex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="brain" size={20} color="white" style={{ marginRight: 8 }} />
                                <CText variant="labelLarge" style={{ color: 'white', fontWeight: 'bold', opacity: 0.9 }}>AI STUDY COMPANION</CText>
                            </View>
                            <CText variant="headlineSmall" style={{ color: 'white', fontWeight: 'bold', marginBottom: 4 }}>Take a Mock Test</CText>
                            <CText variant="bodyMedium" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 12 }}>Test your knowledge with AI-generated questions.</CText>
                            <Chip
                                icon="arrow-right"
                                style={{ backgroundColor: 'white', alignSelf: 'flex-start' }}
                                textStyle={{ color: '#F59E0B', fontWeight: 'bold' }}
                                onPress={() => navigation.navigate('Quizzes')}
                            >
                                Start Quiz
                            </Chip>
                        </View>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }} // Placeholder 3D icon
                            style={styles.promoImage}
                        />
                    </Surface>
                </TouchableOpacity>

                {/* Quick Actions Grid */}
                <CText variant="titleLarge" style={styles.sectionTitle}>Quick Access</CText>
                <View style={styles.actionsGrid}>
                    <ActionCard title="Resources" icon="book-open-variant" color="#3B82F6" onPress={() => navigation.navigate('Resources')} />
                    <ActionCard title="Community" icon="account-group" color="#EC4899" onPress={() => navigation.navigate('Forums')} />
                    <ActionCard title="Analytics" icon="chart-box" color="#8B5CF6" onPress={() => navigation.navigate('Stats')} />
                    <ActionCard title="Schedule" icon="calendar-clock" color="#10B981" onPress={() => { }} />
                </View>

                {/* Dynamic Feed */}
                <View style={styles.feedHeader}>
                    <CText variant="titleLarge" style={styles.sectionTitle}>Your Feed</CText>
                    <TouchableOpacity><CText style={{ color: theme.colors.primary, fontWeight: '600' }}>See All</CText></TouchableOpacity>
                </View>

                {/* Implemented Feed Items */}
                {FEED_ITEMS.map((item) => (
                    <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => { }}>
                        {renderFeedItem({ item })}
                    </TouchableOpacity>
                ))}

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Floating Action Button */}
            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
                color="white"
                label="Quick Add"
                onPress={() => { }}
                elevation={4}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerGradient: {
        paddingBottom: 30,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        elevation: 8,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 12,
        marginBottom: 24,
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    headerStatItem: {
        alignItems: 'center',
    },
    headerStatDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    promoCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 160,
        justifyContent: 'center',
    },
    promoImage: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        width: 140,
        height: 140,
        opacity: 0.9,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1F2937',
        fontFamily: 'Inter_600SemiBold',
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    feedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    feedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 12,
    },
    feedIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        borderRadius: 28,
    },
});
