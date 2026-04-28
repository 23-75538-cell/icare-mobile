import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { Card, Badge } from '@/components/ui';
import { mockNotifications } from '@/lib/api';

export default function NotificationsScreen() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return '#dc2626';
      case 'warning': return '#d97706';
      case 'success': return '#16a34a';
      case 'info': return '#1B6B7B';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return '🚨';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>{mockNotifications.filter(n => !n.read).length} unread</Text>
      </View>

      {mockNotifications.map((notification, index) => (
        <TouchableOpacity
          key={notification.id}
          style={[styles.notificationCard, !notification.read && styles.notificationUnread]}
        >
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationIcon}>{getTypeIcon(notification.type)}</Text>
            <View style={styles.notificationMeta}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Badge
                label={notification.type}
                variant={notification.type === 'alert' ? 'danger' : notification.type === 'warning' ? 'warning' : notification.type === 'success' ? 'success' : 'info'}
                size="sm"
              />
            </View>
          </View>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <Text style={styles.notificationTime}>
            {new Date(notification.timestamp).toLocaleString()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#11181c' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  notificationCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  notificationUnread: { borderLeftWidth: 4, borderLeftColor: '#1B6B7B' },
  notificationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  notificationIcon: { fontSize: 24, marginRight: 12 },
  notificationMeta: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notificationTitle: { fontSize: 16, fontWeight: '600', color: '#11181c' },
  notificationMessage: { fontSize: 14, color: '#6b7280', lineHeight: 22, marginBottom: 8 },
  notificationTime: { fontSize: 12, color: '#9ca3af' },
});