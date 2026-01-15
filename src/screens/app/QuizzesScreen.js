import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text, Surface, Button, useTheme, ProgressBar, IconButton, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from '../../components/LinearGradientShim';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// Mock AI Generated Questions
const MOCK_QUIZ = [
    {
        id: 1,
        question: "In React Native, which component is used to render a list of items efficiently?",
        options: ["ScrollView", "FlatList", "View", "RenderList"],
        correct: 1
    },
    {
        id: 2,
        question: "What is the primary purpose of useEffect in React?",
        options: ["State Management", "Routing", "Side Effects", "Styling"],
        correct: 2
    },
    {
        id: 3,
        question: "Which hook is used to access the context API?",
        options: ["useContext", "useState", "useReducer", "useCallback"],
        correct: 0
    },
    {
        id: 4,
        question: "What is the specialized component for safe area insets?",
        options: ["SafeAreaView", "View", "KeyboardAvoidingView", "InsetsProvider"],
        correct: 0
    },
    {
        id: 5,
        question: "How do you style components in React Native?",
        options: ["CSS Files", "StyleSheet.create", "HTML Tags", "Inline Strings"],
        correct: 1
    }
];

export default function QuizzesScreen({ navigation }) {
    const theme = useTheme();
    const [active, setActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    useEffect(() => {
        let timer;
        if (active && !showResult && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleFinish();
        }
        return () => clearInterval(timer);
    }, [active, showResult, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleStart = () => {
        setActive(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setTimeLeft(600);
        setSelectedOption(null);
    };

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNext = () => {
        if (selectedOption === MOCK_QUIZ[currentQuestion].correct) {
            setScore(score + 1);
        }

        if (currentQuestion < MOCK_QUIZ.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        // Check last question if submitting
        if (selectedOption === MOCK_QUIZ[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }
        setShowResult(true);
        setActive(false);
    };

    if (!active && !showResult) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
                    <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>AI Mock Tests</Text>
                </View>
                <View style={styles.introContent}>
                    <Icon name="brain" size={120} color={theme.colors.secondary} style={{ marginBottom: 32 }} />
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
                        Ready to challenge yourself?
                    </Text>
                    <Text variant="bodyLarge" style={{ textAlign: 'center', color: '#6B7280', marginBottom: 48 }}>
                        Take our AI-generated mock test to assess your knowledge in React Native.
                        10 minutes, 5 questions.
                    </Text>
                    <Button
                        mode="contained"
                        onPress={handleStart}
                        style={styles.startButton}
                        contentStyle={{ height: 56 }}
                        labelStyle={{ fontSize: 18 }}
                    >
                        Start Quiz
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    if (showResult) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.resultContainer}>
                    <Surface style={styles.resultCard} elevation={4}>
                        <Text variant="headlineMedium" style={{ fontWeight: 'bold', marginBottom: 24 }}>Quiz Complete!</Text>

                        <View style={styles.scoreCircle}>
                            <Text variant="displayLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                                {Math.round((score / MOCK_QUIZ.length) * 100)}%
                            </Text>
                        </View>

                        <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                            You scored {score} out of {MOCK_QUIZ.length}
                        </Text>
                        <Text variant="bodyMedium" style={{ color: '#6B7280', textAlign: 'center', marginBottom: 32 }}>
                            {score === MOCK_QUIZ.length ? "Perfect score! You're a wizard! 🧙‍♂️" : "Good job! Keep practicing to improve."}
                        </Text>

                        <Button mode="contained" onPress={handleStart} style={styles.restartButton}>
                            Try Again
                        </Button>
                        <Button mode="text" onPress={() => navigation.goBack()}>
                            Back to Dashboard
                        </Button>
                    </Surface>
                </View>
            </SafeAreaView>
        );
    }

    const progress = (currentQuestion + 1) / MOCK_QUIZ.length;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Top Bar */}
            <View style={styles.quizHeader}>
                <IconButton icon="close" onPress={() => navigation.goBack()} />
                <Surface style={styles.timerBadge} elevation={1}>
                    <Icon name="clock-outline" size={16} color={theme.colors.error} />
                    <Text style={{ color: theme.colors.error, fontWeight: 'bold', marginLeft: 4 }}>
                        {formatTime(timeLeft)}
                    </Text>
                </Surface>
            </View>

            {/* Progress */}
            <ProgressBar progress={progress} color={theme.colors.secondary} style={styles.progress} />

            <ScrollView contentContainerStyle={styles.quizContent}>
                <Text variant="labelLarge" style={{ color: '#6B7280', marginBottom: 8 }}>
                    Question {currentQuestion + 1} of {MOCK_QUIZ.length}
                </Text>
                <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 32 }}>
                    {MOCK_QUIZ[currentQuestion].question}
                </Text>

                {MOCK_QUIZ[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionSelect(index)}
                            activeOpacity={0.8}
                        >
                            <Surface
                                style={[
                                    styles.optionCard,
                                    isSelected && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primaryContainer + '40' }
                                ]}
                                elevation={isSelected ? 4 : 1}
                            >
                                <View style={[
                                    styles.optionRadio,
                                    isSelected && { borderColor: theme.colors.primary }
                                ]}>
                                    {isSelected && <View style={[styles.optionRadioFill, { backgroundColor: theme.colors.primary }]} />}
                                </View>
                                <Text variant="bodyLarge" style={[styles.optionText, isSelected && { color: theme.colors.primary, fontWeight: 'bold' }]}>
                                    {option}
                                </Text>
                            </Surface>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>

            <View style={styles.quizFooter}>
                <Button
                    mode="contained"
                    onPress={handleNext}
                    disabled={selectedOption === null}
                    style={{ borderRadius: 12 }}
                    contentStyle={{ height: 50 }}
                >
                    {currentQuestion === MOCK_QUIZ.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
    },
    introContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    startButton: {
        width: '100%',
        borderRadius: 16,
    },
    quizHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
    timerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 16,
    },
    progress: {
        height: 6,
        backgroundColor: '#E5E7EB',
    },
    quizContent: {
        padding: 24,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    optionRadio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionRadioFill: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    optionText: {
        flex: 1,
    },
    quizFooter: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    resultCard: {
        padding: 32,
        borderRadius: 32,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    scoreCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 8,
        borderColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    restartButton: {
        width: '100%',
        marginBottom: 12,
        borderRadius: 12,
    },
});
