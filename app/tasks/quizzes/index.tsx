import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Badge, PrimaryButton, StatCard } from '@/components/ui';
import { mockQuizzes } from '@/lib/api';

export default function QuizzesScreen() {
  const router = useRouter();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#16a34a';
      case 'intermediate': return '#d97706';
      case 'advanced': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Adaptive Quizzes</Text>
        <Text style={styles.subtitle}>Personalized questions based on your knowledge gaps</Text>
      </View>

      {mockQuizzes.filter(q => q.completedCount < q.questionsCount).length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Quizzes</Text>
          {mockQuizzes.filter(q => q.completedCount < q.questionsCount).map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.quizCard}
              onPress={() => router.push(`/tasks/quizzes/${quiz.id}`)}
            >
              <View style={styles.quizHeader}>
                <View style={[styles.quizIcon, { backgroundColor: `${getDifficultyColor(quiz.difficulty)}20` }]}>
                  <Text style={[styles.quizIconText, { color: getDifficultyColor(quiz.difficulty) }]}>📝</Text>
                </View>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizDesc} numberOfLines={1}>{quiz.description}</Text>
                </View>
              </View>
              <View style={styles.quizMeta}>
                <Badge label={quiz.category} variant="default" size="sm" />
                <Badge
                  label={quiz.difficulty}
                  variant={quiz.difficulty === 'beginner' ? 'success' : quiz.difficulty === 'intermediate' ? 'warning' : 'danger'}
                  size="sm"
                />
              </View>
              <View style={styles.quizProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(quiz.completedCount / quiz.questionsCount) * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>
                  {quiz.completedCount}/{quiz.questionsCount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptySection}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyTitle}>All Quizzes Completed!</Text>
          <Text style={styles.emptyText}>Check back later for new quizzes.</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Quizzes</Text>
        {mockQuizzes.filter(q => q.completedCount >= q.questionsCount).map((quiz) => (
          <TouchableOpacity key={quiz.id} style={[styles.quizCard, styles.quizCardCompleted]}>
            <View style={styles.quizHeader}>
              <View style={[styles.quizIcon, { backgroundColor: '#16a34a20' }]}>
                <Text style={styles.quizIconText}>✓</Text>
              </View>
              <View style={styles.quizInfo}>
                <Text style={[styles.quizTitle, styles.quizTitleCompleted]}>{quiz.title}</Text>
                <Text style={styles.quizDesc} numberOfLines={1}>{quiz.description}</Text>
              </View>
            </View>
            <View style={styles.quizMeta}>
              <Badge label={`Score: ${quiz.lastScore}%`} variant="success" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#11181c' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#11181c', marginBottom: 12 },
  quizCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  quizCardCompleted: { opacity: 0.7, backgroundColor: '#f9fafb', borderColor: '#e5e7eb' },
  quizHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  quizIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quizIconText: { fontSize: 20 },
  quizInfo: { flex: 1, marginLeft: 12 },
  quizTitle: { fontSize: 16, fontWeight: '600', color: '#11181c' },
  quizTitleCompleted: { textDecorationLine: 'line-through', color: '#9ca3af' },
  quizDesc: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  quizMeta: { flexDirection: 'row', marginBottom: 12 },
  quizProgress: { flexDirection: 'row', alignItems: 'center' },
  progressBar: { flex: 1, height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, marginRight: 12 },
  progressFill: { height: '100%', backgroundColor: '#1B6B7B', borderRadius: 3 },
  progressText: { fontSize: 12, color: '#6b7280', width: 35 },
  emptySection: { alignItems: 'center', padding: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#11181c', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
});