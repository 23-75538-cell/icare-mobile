import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Card, Badge } from '@/components/ui';
import { mockTasks, mockQuizzes } from '@/lib/api';

export default function TasksScreen() {
  const router = useRouter();

  const pendingTasks = mockTasks.filter((t) => t.status === 'pending');
  const inProgressTasks = mockTasks.filter((t) => t.status === 'in_progress');
  const completedTasks = mockTasks.filter((t) => t.status === 'completed');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#dc2626';
      case 'medium':
        return '#d97706';
      case 'low':
        return '#16a34a';
      default:
        return '#6b7280';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Clinical Tasks</Text>
        <Text style={styles.subtitle}>Complete your assigned activities</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/tasks/quizzes')}>
          <Text style={styles.tabIcon}>📝</Text>
          <Text style={styles.tabText}>Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/recommendations')}>
          <Text style={styles.tabIcon}>🤖</Text>
          <Text style={styles.tabText}>AI Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/notifications')}>
          <Text style={styles.tabIcon}>🔔</Text>
          <Text style={styles.tabText}>Alerts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In Progress</Text>
          <Badge label={`${inProgressTasks.length}`} variant="warning" />
        </View>
        {inProgressTasks.length > 0 ? (
          inProgressTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => router.push(`/tasks/${task.id}`)}
            >
              <View style={styles.taskHeader}>
                <View>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskPatient}>{task.patientName}</Text>
                </View>
                <Badge label="In Progress" variant="warning" />
              </View>
              <Text style={styles.taskDescription} numberOfLines={2}>
                {task.description}
              </Text>
              <View style={styles.taskFooter}>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
                <Text style={styles.priorityText}>{task.priority} priority</Text>
                <Text style={styles.taskDue}>
                  Due: {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Card>
            <Text style={styles.emptyText}>No tasks in progress</Text>
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending</Text>
          <Badge label={`${pendingTasks.length}`} variant="default" />
        </View>
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => router.push(`/tasks/${task.id}`)}
            >
              <View style={styles.taskHeader}>
                <View>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskPatient}>{task.patientName}</Text>
                </View>
                <Badge label="Pending" variant="default" />
              </View>
              <Text style={styles.taskDescription} numberOfLines={2}>
                {task.description}
              </Text>
              <View style={styles.taskFooter}>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
                <Text style={styles.priorityText}>{task.priority} priority</Text>
                <Text style={styles.taskDue}>
                  Due: {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Card>
            <Text style={styles.emptyText}>All tasks completed!</Text>
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Completed</Text>
          <Badge label={`${completedTasks.length}`} variant="success" />
        </View>
        {completedTasks.length > 0 ? (
          completedTasks.slice(0, 2).map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, styles.taskCardCompleted]}
              onPress={() => router.push(`/tasks/${task.id}`)}
            >
              <View style={styles.taskHeader}>
                <View>
                  <Text style={[styles.taskTitle, styles.taskTitleCompleted]}>{task.title}</Text>
                  <Text style={styles.taskPatient}>{task.patientName}</Text>
                </View>
                <Badge label="Done" variant="success" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Card>
            <Text style={styles.emptyText}>No completed tasks yet</Text>
          </Card>
        )}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#11181c',
    marginRight: 8,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  taskCardCompleted: {
    backgroundColor: '#f9fafb',
    opacity: 0.7,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  taskPatient: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
    flex: 1,
  },
  taskDue: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    padding: 16,
  },
});