import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Surface, Button, useTheme, ProgressBar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { AuthContext } from '../../context/AuthContext';
import client from '../../api/client';
import LinearGradient from '../../components/LinearGradientShim';
import { CText, StatCard } from '../../components/atoms'; // Import StatCard? No, it's in molecules.
import { StatCard as StatCardMolecule } from '../../components/molecules';
import { gradients } from '../../theme';

const { width } = Dimensions.get('window');

export default function StatsScreen({ navigation }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Unused for now but kept for logic
    const { userToken } = useContext(AuthContext);
    const theme = useTheme();

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

    useEffect(() => {
        fetchStats();
    }, []);

    // Mock Data for Charts
    const gradeTrendData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            data: [65, 78, 72, 85, 82, 90],
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White line on gradient
            strokeWidth: 3
        }]
    };

    const attendanceData = {
        labels: ["Math", "Phy", "Chem"],
        data: [0.9, 0.75, 0.8]
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <LinearGradient
                colors={gradients.focus}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.headerContent}>
                        <IconButton
                            icon="arrow-left"
                            iconColor="white"
                            size={24}
                            onPress={() => navigation.goBack()}
                        />
                        <CText variant="headlineSmall" style={styles.headerTitle}>Overview</CText>
                        <IconButton
                            icon="share-variant"
                            iconColor="white"
                            size={24}
                            onPress={() => { }}
                        />
                    </View>

                    {/* Hero Chart inside Header */}
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={gradeTrendData}
                            width={width}
                            height={180}
                            withDots={false}
                            withInnerLines={false}
                            withOuterLines={false}
                            withVerticalLabels={false}
                            withHorizontalLabels={false}
                            chartConfig={{
                                ...chartConfig,
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: () => `rgba(255, 255, 255, 0.7)`,
                            }}
                            bezier
                            style={{ paddingRight: 0, marginLeft: -20 }}
                        />
                        <CText variant="titleMedium" style={styles.chartOverlayText}>Cumulative Performance</CText>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                {/* Metric Cards */}
                <View style={styles.statsGrid}>
                    <StatCardMolecule
                        label="Avg Attendance"
                        value={`${displayStats.attendance}%`}
                        icon="account-check"
                        color={theme.colors.secondary}
                        style={{ marginRight: 8 }}
                    />
                    <StatCardMolecule
                        label="CGPA"
                        value={(displayStats.avgMarks / 20).toFixed(1)} // Mock calc
                        icon="school"
                        color={theme.colors.primary}
                        style={{ marginLeft: 8 }}
                    />
                </View>

                {/* Subject Breakdown */}
                <CText variant="titleLarge" style={styles.sectionTitle}>Subject Analysis</CText>

                {displayStats.subjects?.map((subject, index) => (
                    <Surface key={index} style={styles.subjectCard} elevation={1}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <CText variant="titleMedium" style={{ fontWeight: 'bold', flex: 1 }}>{subject.name}</CText>
                            <Surface style={[styles.gradeBadge, { backgroundColor: getBadgeColor(subject.badge) }]} elevation={0}>
                                <CText style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{subject.badge}</CText>
                            </Surface>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <CText variant="bodySmall" style={{ color: '#6B7280' }}>Attendance</CText>
                                <CText variant="bodySmall" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{subject.attendance}%</CText>
                            </View>
                            <ProgressBar
                                progress={subject.attendance / 100}
                                color={theme.colors.primary}
                                style={styles.progressBar}
                            />
                        </View>

                        {/* Separator */}
                        <View style={{ height: 12 }} />

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <CText variant="bodySmall" style={{ color: '#6B7280' }}>Marks</CText>
                                <CText variant="bodySmall" style={{ fontWeight: 'bold', color: theme.colors.secondary }}>{subject.marks}</CText>
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
        </View>
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
    headerGradient: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        elevation: 8,
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    chartContainer: {
        alignItems: 'center',
        marginTop: 10,
        height: 140,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    chartOverlayText: {
        position: 'absolute',
        top: 20,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
    },
    content: {
        padding: 20,
        paddingTop: 30,
    },
    statsGrid: {
        flexDirection: 'row',
        marginBottom: 32,
        marginTop: -50, // Pull up to overlap with header
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#111827',
        fontFamily: 'Inter_600SemiBold',
    },
    subjectCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    gradeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statRow: {
        marginBottom: 4,
    },
    statLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#F3F4F6',
    },
});
