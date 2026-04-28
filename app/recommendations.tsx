import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Badge } from '@/components/ui';
import { mockAIRecommendations } from '@/lib/api';

export default function RecommendationsScreen() {
  const router = useRouter();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '📝';
      case 'task': return '📋';
      case 'review': return '📖';
      default: return '🤖';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Recommendations</Text>
        <Text style={styles.subtitle}>Personalized learning suggestions based on your performance</Text>
      </View>

      <View style={styles.aiHeader}>
        <Text style={styles.aiIcon}>🤖</Text>
        <View style={styles.aiInfo}>
          <Text style={styles.aiTitle}>iCARE AI Assistant</Text>
          <Text style={styles.aiDesc}>Machine learning-driven recommendations</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recommended for You</Text>

      {mockAIRecommendations.map((rec, index) => (
        <TouchableOpacity
          key={rec.id}
          style={styles.recommendationCard}
          onPress={() => {
            if (rec.type === 'quiz') router.push('/tasks/quizzes');
            else if (rec.type === 'task') router.push('/tasks');
          }}
        >
          <View style={styles.recHeader}>
            <Text style={styles.recIcon}>{getTypeIcon(rec.type)}</Text>
            <Badge
              label={rec.priority}
              variant={rec.priority === 'high' ? 'danger' : 'warning'}
            />
          </View>
          <Text style={styles.recTitle}>{rec.title}</Text>
          <Text style={styles.recDesc}>{rec.description}</Text>
          <View style={styles.recFooter}>
            <Text style={styles.recAction}>
              {rec.type === 'quiz' ? 'Start Quiz →' : rec.type === 'task' ? 'View Task →' : 'Learn More →'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>How Recommendations Work</Text>
        <Text style={styles.infoText}>
          iCARE++ uses machine learning algorithms (Random Forest and Logistic Regression) to analyze your performance data and provide personalized recommendations to help you improve in areas where you need the most practice.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#11181c' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B6B7B', borderRadius: 16, padding: 16, marginBottom: 24 },
  aiIcon: { fontSize: 40, marginRight: 12 },
  aiInfo: { flex: 1 },
  aiTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  aiDesc: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#11181c', marginBottom: 12 },
  recommendationCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  recHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  recIcon: { fontSize: 24 },
  recTitle: { fontSize: 16, fontWeight: '600', color: '#11181c', marginBottom: 8 },
  recDesc: { fontSize: 14, color: '#6b7280', lineHeight: 22 },
  recFooter: { marginTop: 12 },
  recAction: { fontSize: 14, fontWeight: '600', color: '#1B6B7B' },
  infoCard: { backgroundColor: '#f0f9ff', borderColor: '#bae6fd', marginTop: 12 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: '#0369a1', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#0369a1', lineHeight: 22 },
});