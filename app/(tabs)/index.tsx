import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Card, Badge, StatCard, Avatar } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { mockNotifications, mockTasks, mockPerformanceLogs, mockQuizzes } from '@/lib/api';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const pendingTasks = mockTasks.filter((t) => t.status !== 'completed').length;
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;
  const avgScore = Math.round(
    mockPerformanceLogs.reduce((a, b) => a + b.score, 0) / mockPerformanceLogs.length
  );
  const quizzesAvailable = mockQuizzes.filter((q) => q.completedCount < q.questionsCount).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.primary]} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.name || 'Student'}</Text>
        </View>
        <Avatar name={user?.name || 'Student'} size="lg" />
      </View>

      {unreadNotifications > 0 && (
        <TouchableOpacity
          style={styles.alertBanner}
          onPress={() => router.push('/notifications')}
        >
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertText}>
            {unreadNotifications} new notifications
          </Text>
          <Text style={styles.alertArrow}>→</Text>
        </TouchableOpacity>
      )}

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <StatCard
              title="Pending Tasks"
              value={pendingTasks}
              icon="📋"
              color={pendingTasks > 3 ? '#dc2626' : Colors.light.primary}
              onPress={() => router.push('/tasks')}
            />
          </View>
          <View style={styles.statItem}>
            <StatCard
              title="Avg Score"
              value={`${avgScore}%`}
              icon="📊"
              color="#16a34a"
              trend={avgScore >= 70 ? 'up' : 'down'}
              trendValue={avgScore >= 70 ? 'Good' : 'Needs work'}
              onPress={() => router.push('/progress')}
            />
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <StatCard
              title="Quizzes"
              value={quizzesAvailable}
              subtitle="available"
              icon="📝"
              color="#7c3aed"
              onPress={() => router.push('/tasks/quizzes')}
            />
          </View>
          <View style={styles.statItem}>
            <StatCard
              title="Patients"
              value={5}
              subtitle="assigned"
              icon="🏥"
              color="#0891b2"
              onPress={() => router.push('/ehr')}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/vitals')}>
            <View style={styles.quickActionIcon}>
              <Text>❤️</Text>
            </View>
            <Text style={styles.quickActionText}>Record Vitals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/tasks')}>
            <View style={styles.quickActionIcon}>
              <Text>📋</Text>
            </View>
            <Text style={styles.quickActionText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/tasks/quizzes')}>
            <View style={styles.quickActionIcon}>
              <Text>📝</Text>
            </View>
            <Text style={styles.quickActionText}>Quizzes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/recommendations')}>
            <View style={styles.quickActionIcon}>
              <Text>🤖</Text>
            </View>
            <Text style={styles.quickActionText}>AI Tips</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Notifications</Text>
        <Card>
          {mockNotifications.slice(0, 3).map((notification, index) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                index < 2 && styles.notificationItemBorder,
              ]}
              onPress={() => router.push('/notifications')}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <Badge label="New" variant="info" size="sm" />}
                </View>
                <Text style={styles.notificationMessage} numberOfLines={2}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <Card>
          {mockTasks.slice(0, 3).map((task, index) => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskItem,
                index < 2 && styles.taskItemBorder,
              ]}
              onPress={() => router.push(`/tasks/${task.id}`)}
            >
              <View style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Badge
                    label={task.status === 'completed' ? 'Done' : task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    variant={task.status === 'completed' ? 'success' : task.status === 'in_progress' ? 'warning' : 'default'}
                    size="sm"
                  />
                </View>
                <Text style={styles.taskPatient}>{task.patientName}</Text>
                <Text style={styles.taskDue}>
                  Due: {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  alertIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  alertArrow: {
    fontSize: 18,
    color: '#92400e',
  },
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    marginHorizontal: 6,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    width: '23%',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  notificationItem: {
    paddingVertical: 12,
  },
  notificationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  notificationContent: {},
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginRight: 8,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  taskItem: {
    paddingVertical: 12,
  },
  taskItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  taskContent: {},
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  taskPatient: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  taskDue: {
    fontSize: 12,
    color: '#9ca3af',
  },
});