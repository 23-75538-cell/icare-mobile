import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card, Badge, Avatar } from '@/components/ui';
import { mockPatients, getEHRForPatient } from '@/lib/api';

export default function EHRDetailScreen() {
  const { id } = useLocalSearchParams();
  const patientId = id as string;

  const patient = mockPatients.find((p) => p.id === patientId);
  const ehrRecords = getEHRForPatient(patientId);

  if (!patient) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Patient not found</Text>
      </View>
    );
  }

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'nursing': return '#1B6B7B';
      case 'physician': return '#7c3aed';
      case 'laboratory': return '#0891b2';
      case 'progress': return '#d97706';
      default: return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.patientHeader}>
        <Avatar name={patient.name} size="lg" />
        <Text style={styles.patientName}>{patient.name}</Text>
        <View style={styles.patientMeta}>
          <Text style={styles.metaText}>{patient.age} years • {patient.gender}</Text>
        </View>
        <Badge
          label={patient.status}
          variant={patient.status === 'Stable' ? 'success' : patient.status === 'Guarded' ? 'warning' : 'danger'}
        />
      </View>

      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Room</Text>
          <Text style={styles.infoValue}>{patient.room}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Diagnosis</Text>
          <Text style={styles.infoValue}>{patient.diagnosis}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Admitted</Text>
          <Text style={styles.infoValue}>{new Date(patient.admittedDate).toLocaleDateString()}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Health Records</Text>

      {ehrRecords.length > 0 ? (
        ehrRecords.map((record, index) => (
          <Card key={record.id} style={styles.recordCard}>
            <View style={styles.recordHeader}>
              <View style={[styles.recordType, { backgroundColor: `${getRecordTypeColor(record.type)}20` }]}>
                <Text style={[styles.recordTypeText, { color: getRecordTypeColor(record.type) }]}>
                  {record.type.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.recordDate}>
                {new Date(record.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.recordContent}>{record.content}</Text>
            <Text style={styles.recordAuthor}>Author: {record.author}</Text>
          </Card>
        ))
      ) : (
        <Card>
          <Text style={styles.emptyText}>No records available</Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, paddingBottom: 32 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#6b7280' },
  patientHeader: { alignItems: 'center', marginBottom: 24 },
  patientName: { fontSize: 24, fontWeight: '700', color: '#11181c', marginTop: 12 },
  patientMeta: { flexDirection: 'row', marginTop: 8, marginBottom: 12 },
  metaText: { fontSize: 14, color: '#6b7280' },
  infoCard: { marginBottom: 24 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  infoLabel: { fontSize: 14, color: '#6b7280' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#11181c' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#11181c', marginBottom: 12 },
  recordCard: { marginBottom: 12 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  recordType: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  recordTypeText: { fontSize: 10, fontWeight: '700' },
  recordDate: { fontSize: 12, color: '#9ca3af' },
  recordContent: { fontSize: 14, color: '#11181c', lineHeight: 22, marginBottom: 12 },
  recordAuthor: { fontSize: 12, color: '#6b7280', fontStyle: 'italic' },
  emptyText: { fontSize: 14, color: '#9ca3af', textAlign: 'center', padding: 16 },
});