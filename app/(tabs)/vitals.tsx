import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Card, Badge, Avatar } from '@/components/ui';
import { mockPatients, mockVitalSigns } from '@/lib/api';

export default function VitalsScreen() {
  const router = useRouter();

  const getLatestVitals = (patientId: string) => {
    const vitals = mockVitalSigns.filter((v) => v.patientId === patientId);
    return vitals.length > 0 ? vitals[vitals.length - 1] : null;
  };

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
        <Text style={styles.title}>Patient Vitals</Text>
        <Text style={styles.subtitle}>Real-time vital signs monitoring</Text>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#16a34a' }]} />
          <Text style={styles.legendText}>Stable</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#d97706' }]} />
          <Text style={styles.legendText}>Guarded</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
          <Text style={styles.legendText}>Critical</Text>
        </View>
      </View>

      {mockPatients.map((patient) => {
        const latestVitals = getLatestVitals(patient.id);
        const hasAnomaly = latestVitals?.isAnomaly;

        return (
          <TouchableOpacity
            key={patient.id}
            style={[styles.patientCard, hasAnomaly && styles.patientCardAlert]}
            onPress={() => router.push(`/vitals/${patient.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.patientHeader}>
              <Avatar name={patient.name} size="md" />
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientRoom}>{patient.room}</Text>
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

            {latestVitals && (
              <View style={styles.vitalsGrid}>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>HR</Text>
                  <Text style={[styles.vitalValue, hasAnomaly && styles.vitalAlert]}>
                    {latestVitals.heartRate}
                  </Text>
                  <Text style={styles.vitalUnit}>bpm</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>BP</Text>
                  <Text style={[styles.vitalValue, hasAnomaly && styles.vitalAlert]}>
                    {latestVitals.bloodPressureSystolic}/{latestVitals.bloodPressureDiastolic}
                  </Text>
                  <Text style={styles.vitalUnit}>mmHg</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>Temp</Text>
                  <Text style={[styles.vitalValue, hasAnomaly && styles.vitalAlert]}>
                    {latestVitals.temperature.toFixed(1)}
                  </Text>
                  <Text style={styles.vitalUnit}>°C</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>SpO2</Text>
                  <Text style={[styles.vitalValue, hasAnomaly && styles.vitalAlert]}>
                    {latestVitals.oxygenSaturation}
                  </Text>
                  <Text style={styles.vitalUnit}>%</Text>
                </View>
                <View style={styles.vitalItem}>
                  <Text style={styles.vitalLabel}>RR</Text>
                  <Text style={[styles.vitalValue, hasAnomaly && styles.vitalAlert]}>
                    {latestVitals.respirationRate}
                  </Text>
                  <Text style={styles.vitalUnit}>/min</Text>
                </View>
              </View>
            )}

            {hasAnomaly && (
              <View style={styles.anomalyAlert}>
                <Text style={styles.anomalyText}>⚠️ Anomaly detected - requires attention</Text>
              </View>
            )}

            <View style={styles.cardFooter}>
              <Text style={styles.timestamp}>
                Updated: {new Date(latestVitals?.timestamp || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text style={styles.viewMore}>View details →</Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
  legend: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
  patientCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  patientCardAlert: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
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
  patientRoom: {
    fontSize: 13,
    color: '#6b7280',
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  vitalItem: {
    alignItems: 'center',
  },
  vitalLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#11181c',
  },
  vitalAlert: {
    color: '#dc2626',
  },
  vitalUnit: {
    fontSize: 10,
    color: '#9ca3af',
  },
  anomalyAlert: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  anomalyText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
  },
  viewMore: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});