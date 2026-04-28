import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Card, Avatar, PrimaryButton, Badge } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { mockPerformanceLogs, mockAIRecommendations } from '@/lib/api';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  const avgScore = Math.round(
    mockPerformanceLogs.reduce((a, b) => a + b.score, 0) / mockPerformanceLogs.length
  );

  const competencies = Object.entries(
    mockPerformanceLogs.reduce((acc, log) => {
      if (!acc[log.competency]) acc[log.competency] = [];
      acc[log.competency].push(log.score);
      return acc;
    }, {} as Record<string, number[]>)
  ).map(([competency, scores]) => ({
    competency,
    avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Avatar name={user?.name || 'Student'} size="lg" />
        <Text style={styles.name}>{user?.name || 'Student'}</Text>
        <Text style={styles.email}>{user?.email || 'student@icare.edu'}</Text>
        <View style={styles.badges}>
          <Badge label={user?.cohort || 'BSN-2027'} variant="info" />
          <Badge label={`ID: ${user?.studentId || 'NS-2024-001'}`} variant="default" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <Card>
          <View style={styles.perfStats}>
            <View style={styles.perfStat}>
              <Text style={styles.perfValue}>{avgScore}%</Text>
              <Text style={styles.perfLabel}>Avg Score</Text>
            </View>
            <View style={styles.perfDivider} />
            <View style={styles.perfStat}>
              <Text style={styles.perfValue}>{mockPerformanceLogs.length}</Text>
              <Text style={styles.perfLabel}>Activities</Text>
            </View>
            <View style={styles.perfDivider} />
            <View style={styles.perfStat}>
              <Text style={styles.perfValue}>{competencies.length}</Text>
              <Text style={styles.perfLabel}>Competencies</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Competencies</Text>
        <Card>
          {competencies.map((comp, index) => (
            <View
              key={comp.competency}
              style={[styles.compItem, index < competencies.length - 1 && styles.compBorder]}
            >
              <Text style={styles.compName}>{comp.competency}</Text>
              <View style={styles.compScore}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${comp.avgScore}%`,
                        backgroundColor:
                          comp.avgScore >= 70
                            ? '#16a34a'
                            : comp.avgScore >= 50
                            ? '#d97706'
                            : '#dc2626',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.compValue}>{comp.avgScore}%</Text>
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Recommendations</Text>
        <Card>
          {mockAIRecommendations.slice(0, 2).map((rec, index) => (
            <TouchableOpacity
              key={rec.id}
              style={[styles.recItem, index < 1 && styles.recBorder]}
            >
              <View style={styles.recHeader}>
                <Text style={styles.recIcon}>
                  {rec.type === 'quiz' ? '📝' : rec.type === 'task' ? '📋' : '📖'}
                </Text>
                <Badge
                  label={rec.priority}
                  variant={rec.priority === 'high' ? 'danger' : 'warning'}
                  size="sm"
                />
              </View>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recDesc} numberOfLines={2}>
                {rec.description}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <Card>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => router.push('/progress')}
          >
            <Text style={styles.linkIcon}>📊</Text>
            <Text style={styles.linkText}>Performance Analytics</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => router.push('/notifications')}
          >
            <Text style={styles.linkIcon}>🔔</Text>
            <Text style={styles.linkText}>Notifications</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkIcon}>📖</Text>
            <Text style={styles.linkText}>Clinical Guidelines</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkIcon}>❓</Text>
            <Text style={styles.linkText}>Help & Support</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.section}>
        <PrimaryButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>

      <Text style={styles.footer}>
        iCARE++ v1.0 • Protected by Philippine Data Privacy Act of 2012
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
    marginTop: 16,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  badges: {
    flexDirection: 'row',
    marginTop: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#11181c',
    marginBottom: 12,
  },
  perfStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  perfStat: {
    alignItems: 'center',
  },
  perfDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  perfValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  perfLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  compItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  compBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  compName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    flex: 1,
  },
  compScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 80,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  compValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 35,
    textAlign: 'right',
  },
  recItem: {
    paddingVertical: 12,
  },
  recBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 4,
  },
  recDesc: {
    fontSize: 13,
    color: '#6b7280',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  linkIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#11181c',
  },
  linkArrow: {
    fontSize: 18,
    color: '#9ca3af',
  },
  logoutButton: {
    borderColor: '#dc2626',
  },
  footer: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },
});