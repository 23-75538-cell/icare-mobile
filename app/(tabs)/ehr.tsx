import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Card, Badge, Avatar } from '@/components/ui';
import { mockPatients } from '@/lib/api';

export default function EHRScreen() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable':
        return '#16a34a';
      case 'Guarded':
        return '#d97706';
      case 'Critical':
        return '#dc2626';
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
        <Text style={styles.title}>Patient Records</Text>
        <Text style={styles.subtitle}>Simulated Electronic Health Records</Text>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockPatients.length}</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: Colors.light.primary }]}>2</Text>
          <Text style={styles.statLabel}>Critical</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#d97706' }]}>1</Text>
          <Text style={styles.statLabel}>Guarded</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Patient List</Text>

      {mockPatients.map((patient) => (
        <TouchableOpacity
          key={patient.id}
          style={styles.patientCard}
          onPress={() => router.push(`/ehr/${patient.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.patientHeader}>
            <Avatar name={patient.name} size="md" />
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientDetails}>
                {patient.age} yrs • {patient.gender}
              </Text>
            </View>
            <Badge
              label={patient.status}
              variant={
                patient.status === 'Stable'
                  ? 'success'
                  : patient.status === 'Guarded'
                  ? 'warning'
                  : 'danger'
              }
            />
          </View>

          <View style={styles.patientDetailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Room</Text>
              <Text style={styles.detailValue}>{patient.room}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Diagnosis</Text>
              <Text style={styles.detailValue}>{patient.diagnosis}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Admitted</Text>
              <Text style={styles.detailValue}>
                {new Date(patient.admittedDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.viewRecord}>View Full Record</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      ))}
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
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#11181c',
    marginBottom: 12,
  },
  patientCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
  },
  patientDetails: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  patientDetailsSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181c',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRecord: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  arrow: {
    fontSize: 18,
    color: Colors.light.primary,
  },
});