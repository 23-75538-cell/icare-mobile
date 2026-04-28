import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Card, Badge, Avatar, PrimaryButton } from '@/components/ui';
import { mockPatients, getVitalSignsForPatient, detectVitalAnomaly } from '@/lib/api';

export default function VitalDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const patientId = id as string;
  
  const patient = mockPatients.find((p) => p.id === patientId);
  const vitals = getVitalSignsForPatient(patientId);

  if (!patient) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Patient not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.patientHeader}>
        <Avatar name={patient.name} size="lg" />
        <Text style={styles.patientName}>{patient.name}</Text>
        <View style={styles.patientMeta}>
          <Text style={styles.metaText}>
            {patient.age} years • {patient.gender}
          </Text>
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
      </View>

      <View style={styles.alertSection}>
        <Text style={styles.alertTitle}>⚠️ Vital Signs Anomaly Detection</Text>
        <Text style={styles.alertDesc}>
          Rule-based anomaly detection monitors for abnormal vital signs:
        </Text>
        <View style={styles.rulesList}>
          <Text style={styles.ruleItem}>• Heart Rate: 60-100 bpm</Text>
          <Text style={styles.ruleItem}>• Blood Pressure: &lt;140/90 mmHg</Text>
          <Text style={styles.ruleItem}>• Temperature: 36-38°C</Text>
          <Text style={styles.ruleItem}>• SpO2: ≥95%</Text>
          <Text style={styles.ruleItem}>• Respiration: 12-20 /min</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Vitals</Text>
        {vitals.length > 0 && (
          <Card>
            <View style={styles.vitalsGrid}>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Heart Rate</Text>
                <Text style={[styles.vitalValue, vitals[vitals.length - 1].isAnomaly && styles.vitalAlert]}>
                  {vitals[vitals.length - 1].heartRate}
                </Text>
                <Text style={styles.vitalUnit}>bpm</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Blood Pressure</Text>
                <Text style={[styles.vitalValue, vitals[vitals.length - 1].isAnomaly && styles.vitalAlert]}>
                  {vitals[vitals.length - 1].bloodPressureSystolic}/{vitals[vitals.length - 1].bloodPressureDiastolic}
                </Text>
                <Text style={styles.vitalUnit}>mmHg</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Temperature</Text>
                <Text style={[styles.vitalValue, vitals[vitals.length - 1].isAnomaly && styles.vitalAlert]}>
                  {vitals[vitals.length - 1].temperature.toFixed(1)}
                </Text>
                <Text style={styles.vitalUnit}>°C</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>SpO2</Text>
                <Text style={[styles.vitalValue, vitals[vitals.length - 1].isAnomaly && styles.vitalAlert]}>
                  {vitals[vitals.length - 1].oxygenSaturation}
                </Text>
                <Text style={styles.vitalUnit}>%</Text>
              </View>
              <View style={styles.vitalItem}>
                <Text style={styles.vitalLabel}>Respiration</Text>
                <Text style={[styles.vitalValue, vitals[vitals.length - 1].isAnomaly && styles.vitalAlert]}>
                  {vitals[vitals.length - 1].respirationRate}
                </Text>
                <Text style={styles.vitalUnit}>/min</Text>
              </View>
            </View>
            {vitals[vitals.length - 1].isAnomaly && (
              <View style={styles.anomalyAlert}>
                <Text style={styles.anomalyTitle}>⚠️ Anomaly Detected</Text>
                <Text style={styles.anomalyDesc}>
                  One or more vital signs are outside normal range and require clinical attention.
                </Text>
              </View>
            )}
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vital History</Text>
        <Card>
          {[...vitals].reverse().map((vital, index) => (
            <View
              key={vital.id}
              style={[
                styles.historyItem,
                index < vitals.length - 1 && styles.historyBorder,
              ]}
            >
              <View style={styles.historyHeader}>
                <Text style={styles.historyTime}>
                  {new Date(vital.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                {vital.isAnomaly && (
                  <Badge label="Anomaly" variant="danger" size="sm" />
                )}
              </View>
              <View style={styles.historyVitals}>
                <Text style={styles.historyVital}>HR: {vital.heartRate}</Text>
                <Text style={styles.historyVital}>BP: {vital.bloodPressureSystolic}/{vital.bloodPressureDiastolic}</Text>
                <Text style={styles.historyVital}>Temp: {vital.temperature.toFixed(1)}</Text>
                <Text style={styles.historyVital}>SpO2: {vital.oxygenSaturation}</Text>
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <PrimaryButton
          title="Record New Vitals"
          onPress={() => {}}
        />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
  },
  patientHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  patientName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
    marginTop: 12,
  },
  patientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 12,
  },
  alertSection: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 8,
  },
  alertDesc: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 12,
  },
  rulesList: {
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    padding: 12,
  },
  ruleItem: {
    fontSize: 13,
    color: '#92400e',
    marginBottom: 4,
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
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  vitalLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 20,
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
    padding: 12,
    marginTop: 8,
  },
  anomalyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 4,
  },
  anomalyDesc: {
    fontSize: 13,
    color: '#dc2626',
  },
  historyItem: {
    paddingVertical: 12,
  },
  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  historyVitals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyVital: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 12,
  },
});