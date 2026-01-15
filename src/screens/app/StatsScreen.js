import React, { useState, useContext, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Text, Surface, Button, useTheme, Avatar, ProgressBar, SegmentedButtons } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import client from '../../api/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { userToken } = useContext(AuthContext);
    const theme = useTheme();
    const [period, setPeriod] = useState('sem');

    const fetchStats = async () => {
        try {
            const response = await client.get('/stats/dashboard');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchStats();
    }, []);

    React.useEffect(() => {
        fetchStats();
    }, []);

    // Mock Data for Charts (Use real data if available from stats object)
    const gradeTrendData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            data: [65, 78, 72, 85, 82, 90],
            color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Indigo
            strokeWidth: 3
        }]
    };

    const attendanceData = {
        labels: ["Math", "Phy", "Chem"], // abbreviated
        data: [0.9, 0.75, 0.8]
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: { r: "5", strokeWidth: "2", stroke: "#4F46E5" }
    };

    // Fallback data
    const displayStats = stats || {
        attendance: 85,
        avgMarks: 82,
        subjects: [
            { name: 'Mathematics', attendance: 90, marks: 85, badge: 'A+' },
            { name: 'Physics', attendance: 75, marks: 70, badge: 'B' },
            { name: 'Chemistry', attendance: 80, marks: 75, badge: 'A' },
            { name: 'Computer Science', attendance: 95, marks: 92, badge: 'O' },
        ]
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>Performance</Text>
                <Icon name="poll" size={28} color={theme.colors.primary} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                {/* Semester Progress */}
                <Surface style={styles.mainCard} elevation={2}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 16 }}>Semester Progress</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ProgressChart
                            data={attendanceData}
                            width={width - 80}
                            height={160}
                            strokeWidth={12}
                            radius={24}
                            chartConfig={{
                                ...chartConfig,
                                color: (opacity = 1, index) => {
                                    const colors = [theme.colors.primary, theme.colors.secondary, theme.colors.tertiary];
                                    return colors[index % colors.length];
                                }
                            }}
                            hideLegend={false}
                        />
                    </View>
                    <View style={styles.statBadges}>
                        <View style={styles.badgeItem}>
                            <Text variant="displaySmall" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{displayStats.attendance}%</Text>
                            <Text variant="bodySmall" style={{ color: '#6B7280' }}>Attendance</Text>
                        </View>
                        <View style={[styles.divider, { backgroundColor: '#E5E7EB' }]} />
                        <View style={styles.badgeItem}>
                            <Text variant="displaySmall" style={{ fontWeight: 'bold', color: theme.colors.secondary }}>{displayStats.avgMarks}</Text>
                            <Text variant="bodySmall" style={{ color: '#6B7280' }}>Avg Marks</Text>
                        </View>
                    </View>
                </Surface>

                {/* Grade Trends */}
                <Text variant="titleLarge" style={styles.sectionTitle}>Grade Trends</Text>
                <LineChart
                    data={gradeTrendData}
                    width={width - 40}
                    height={220}
                    chartConfig={{
                        ...chartConfig,
                        decimalPlaces: 0,
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        paddingRight: 40 // fit right label
                    }}
                />

                {/* Subject Breakdown with Badges */}
                <Text variant="titleLarge" style={styles.sectionTitle}>Subject Analysis</Text>

                {displayStats.subjects?.map((subject, index) => (
                    <Surface key={index} style={styles.subjectCard} elevation={0}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold', flex: 1 }}>{subject.name}</Text>
                            <Surface style={[styles.gradeBadge, { backgroundColor: getBadgeColor(subject.badge) }]} elevation={0}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{subject.badge}</Text>
                            </Surface>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <Text variant="bodySmall" style={{ color: '#6B7280' }}>Attendance</Text>
                                <Text variant="bodySmall" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{subject.attendance}%</Text>
                            </View>
                            <ProgressBar
                                progress={subject.attendance / 100}
                                color={theme.colors.primary}
                                style={styles.progressBar}
                            />
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <Text variant="bodySmall" style={{ color: '#6B7280' }}>Marks</Text>
                                <Text variant="bodySmall" style={{ fontWeight: 'bold', color: theme.colors.secondary }}>{subject.marks}</Text>
                            </View>
                            <ProgressBar
                                progress={subject.marks / 100}
                                color={theme.colors.secondary}
                                style={styles.progressBar}
                            />
                        </View>
                    </Surface>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const getBadgeColor = (grade) => {
    switch (grade) {
        case 'O': return '#10B981';
        case 'A+': return '#3B82F6';
        case 'A': return '#6366F1';
        case 'B': return '#F59E0B';
        default: return '#EF4444';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    mainCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    statBadges: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 20,
        alignItems: 'center',
    },
    badgeItem: {
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: 40,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#111827',
        marginTop: 8,
    },
    subjectCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    gradeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statRow: {
        marginBottom: 12,
    },
    statLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#F3F4F6',
    },
});
