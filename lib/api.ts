export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  room: string;
  diagnosis: string;
  admittedDate: string;
  status: 'Stable' | 'Guarded' | 'Critical';
}

export interface VitalSign {
  id: string;
  patientId: string;
  timestamp: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  respirationRate: number;
  oxygenSaturation: number;
  isAnomaly: boolean;
}

export interface ClinicalTask {
  id: string;
  title: string;
  description: string;
  patientId: string;
  patientName: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionsCount: number;
  completedCount: number;
  lastScore?: number;
  dueDate?: string;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EHRRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'progress' | 'nursing' | 'physician' | 'laboratory';
  content: string;
  author: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  timestamp: string;
  read: boolean;
}

export interface PerformanceLog {
  id: string;
  date: string;
  category: string;
  score: number;
  competency: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'task' | 'review';
  priority: 'high' | 'medium' | 'low';
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Juan dela Cruz',
    age: 65,
    gender: 'Male',
    room: '301-A',
    diagnosis: 'Pneumonia',
    admittedDate: '2024-01-15',
    status: 'Stable',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    age: 42,
    gender: 'Female',
    room: '302-B',
    diagnosis: 'Post-operative',
    admittedDate: '2024-01-18',
    status: 'Guarded',
  },
  {
    id: '3',
    name: 'Pedro Santos',
    age: 58,
    gender: 'Male',
    room: '303-A',
    diagnosis: 'Diabetes Complications',
    admittedDate: '2024-01-20',
    status: 'Stable',
  },
  {
    id: '4',
    name: 'Ana Reyes',
    age: 35,
    gender: 'Female',
    room: '304-B',
    diagnosis: 'Hypertension',
    admittedDate: '2024-01-22',
    status: 'Stable',
  },
  {
    id: '5',
    name: 'Luis Mendoza',
    age: 72,
    gender: 'Male',
    room: '305-A',
    diagnosis: 'Heart Failure',
    admittedDate: '2024-01-23',
    status: 'Critical',
  },
];

export const mockVitalSigns: VitalSign[] = [
  {
    id: '1',
    patientId: '1',
    timestamp: '2024-01-24T08:00:00',
    heartRate: 72,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    temperature: 36.8,
    respirationRate: 16,
    oxygenSaturation: 98,
    isAnomaly: false,
  },
  {
    id: '2',
    patientId: '1',
    timestamp: '2024-01-24T10:00:00',
    heartRate: 78,
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 82,
    temperature: 37.2,
    respirationRate: 18,
    oxygenSaturation: 97,
    isAnomaly: false,
  },
  {
    id: '3',
    patientId: '2',
    timestamp: '2024-01-24T08:30:00',
    heartRate: 95,
    bloodPressureSystolic: 140,
    bloodPressureDiastolic: 90,
    temperature: 38.1,
    respirationRate: 22,
    oxygenSaturation: 94,
    isAnomaly: true,
  },
  {
    id: '4',
    patientId: '3',
    timestamp: '2024-01-24T09:00:00',
    heartRate: 68,
    bloodPressureSystolic: 130,
    bloodPressureDiastolic: 85,
    temperature: 36.5,
    respirationRate: 14,
    oxygenSaturation: 96,
    isAnomaly: false,
  },
  {
    id: '5',
    patientId: '5',
    timestamp: '2024-01-24T10:30:00',
    heartRate: 110,
    bloodPressureSystolic: 160,
    bloodPressureDiastolic: 100,
    temperature: 37.8,
    respirationRate: 28,
    oxygenSaturation: 88,
    isAnomaly: true,
  },
];

export const mockTasks: ClinicalTask[] = [
  {
    id: '1',
    title: 'Vital Signs Monitoring',
    description: 'Record vital signs for patient in room 301-A',
    patientId: '1',
    patientName: 'Juan dela Cruz',
    dueDate: '2024-01-24T12:00:00',
    status: 'pending',
    priority: 'high',
    category: 'Monitoring',
  },
  {
    id: '2',
    title: 'Medication Administration',
    description: 'Administer morning medications',
    patientId: '2',
    patientName: 'Maria Garcia',
    dueDate: '2024-01-24T08:00:00',
    status: 'completed',
    priority: 'high',
    category: 'Medication',
  },
  {
    id: '3',
    title: 'Wound Care',
    description: 'Dressing change for post-operative patient',
    patientId: '2',
    patientName: 'Maria Garcia',
    dueDate: '2024-01-24T14:00:00',
    status: 'in_progress',
    priority: 'medium',
    category: 'Wound Care',
  },
  {
    id: '4',
    title: 'Patient Education',
    description: 'Diabetes self-management education',
    patientId: '3',
    patientName: 'Pedro Santos',
    dueDate: '2024-01-24T16:00:00',
    status: 'pending',
    priority: 'low',
    category: 'Education',
  },
  {
    id: '5',
    title: 'Falls Risk Assessment',
    description: 'Complete falls risk assessment tool',
    patientId: '5',
    patientName: 'Luis Mendoza',
    dueDate: '2024-01-24T11:00:00',
    status: 'pending',
    priority: 'high',
    category: 'Assessment',
  },
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Vital Signs Interpretation',
    description: 'Assessment of normal and abnormal vital sign values',
    category: 'Clinical Skills',
    difficulty: 'beginner',
    questionsCount: 10,
    completedCount: 3,
  },
  {
    id: '2',
    title: 'Medication Calculations',
    description: 'Practice dosage calculations and conversions',
    category: 'Pharmacology',
    difficulty: 'intermediate',
    questionsCount: 15,
    completedCount: 0,
    dueDate: '2024-01-25',
  },
  {
    id: '3',
    title: 'Emergency Response',
    description: 'Basic emergency response and CPR protocols',
    category: 'Emergency',
    difficulty: 'advanced',
    questionsCount: 20,
    completedCount: 5,
    lastScore: 85,
  },
  {
    id: '4',
    title: 'Patient Communication',
    description: 'Therapeutic communication techniques',
    category: 'Soft Skills',
    difficulty: 'beginner',
    questionsCount: 8,
    completedCount: 8,
    lastScore: 92,
  },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    quizId: '1',
    text: 'What is the normal range for adult resting heart rate?',
    options: ['60-100 bpm', '40-60 bpm', '100-120 bpm', '80-120 bpm'],
    correctIndex: 0,
    explanation: 'Normal adult resting heart rate ranges from 60-100 beats per minute.',
  },
  {
    id: '2',
    quizId: '1',
    text: 'A blood pressure reading of 150/95 mmHg indicates:',
    options: ['Normal', 'Pre-hypertension', 'Stage 1 Hypertension', 'Stage 2 Hypertension'],
    correctIndex: 2,
    explanation: 'Stage 1 hypertension is defined as systolic 130-139 or diastolic 80-89.',
  },
  {
    id: '3',
    quizId: '1',
    text: 'Normal body temperature in Celsius is:',
    options: ['35.5-37.5°C', '36.5-37.5°C', '37.5-38.5°C', '38.5-39.5°C'],
    correctIndex: 1,
    explanation: 'Normal body temperature ranges from 36.5°C to 37.5°C.',
  },
  {
    id: '4',
    quizId: '1',
    text: 'Normal respiration rate for adults is:',
    options: ['8-12 breaths/min', '12-20 breaths/min', '20-28 breaths/min', '28-35 breaths/min'],
    correctIndex: 1,
    explanation: 'Normal adult respiration rate is 12-20 breaths per minute.',
  },
  {
    id: '5',
    quizId: '1',
    text: 'Normal oxygen saturation (SpO2) level is:',
    options: ['90-94%', '94-98%', '98-100%', '85-90%'],
    correctIndex: 1,
    explanation: 'Normal SpO2 level is 94-98% in healthy individuals.',
  },
];

export const mockEHRRecords: EHRRecord[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-01-24T08:00:00',
    type: 'nursing',
    content: 'Patient reported feeling better this morning. Vital signs taken and recorded. No complaints of pain.',
    author: 'Maria Santos, RN',
  },
  {
    id: '2',
    patientId: '1',
    date: '2024-01-23T20:00:00',
    type: 'physician',
    content: 'Rounding notes: Patient showing improvement. Continue current treatment plan. Consider discharge if stable tomorrow.',
    author: 'Dr. Rodriguez',
  },
  {
    id: '3',
    patientId: '2',
    date: '2024-01-24T07:30:00',
    type: 'nursing',
    content: 'Post-operative patient. Vital signs stable. Incision site clean, dry, intact. Pain management ongoing.',
    author: 'Maria Santos, RN',
  },
  {
    id: '4',
    patientId: '2',
    date: '2024-01-23T14:00:00',
    type: 'laboratory',
    content: 'Lab results: WBC 12.5, Hgb 11.2, Hct 34. No signs of infection.',
    author: 'Lab Dept.',
  },
  {
    id: '5',
    patientId: '3',
    date: '2024-01-24T09:00:00',
    type: 'progress',
    content: 'Patient血糖控制良好.继续当前糖尿病管理计划.',
    author: 'Maria Santos, RN',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Task Assigned',
    message: 'You have been assigned a new clinical task: Vital Signs Monitoring',
    type: 'info',
    timestamp: '2024-01-24T07:00:00',
    read: false,
  },
  {
    id: '2',
    title: 'Quiz Due Tomorrow',
    message: 'Medication Calculations quiz is due tomorrow',
    type: 'warning',
    timestamp: '2024-01-24T06:00:00',
    read: false,
  },
  {
    id: '3',
    title: 'Patient Alert',
    message: 'Patient Luis Mendoza requires immediate attention - vital signs abnormal',
    type: 'alert',
    timestamp: '2024-01-24T10:30:00',
    read: false,
  },
  {
    id: '4',
    title: 'Task Completed',
    message: 'Medication Administration task marked as completed',
    type: 'success',
    timestamp: '2024-01-24T08:15:00',
    read: true,
  },
];

export const mockPerformanceLogs: PerformanceLog[] = [
  { id: '1', date: '2024-01-24', category: 'Clinical Skills', score: 85, competency: 'Vital Signs' },
  { id: '2', date: '2024-01-23', category: 'Clinical Skills', score: 78, competency: 'Medication Admin' },
  { id: '3', date: '2024-01-22', category: 'Patient Care', score: 92, competency: 'Communication' },
  { id: '4', date: '2024-01-21', category: 'Clinical Skills', score: 65, competency: 'Wound Care' },
  { id: '5', date: '2024-01-20', category: 'Patient Care', score: 88, competency: 'Documentation' },
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'Review Wound Care',
    description: 'Based on your recent performance, we recommend reviewing wound care protocols',
    type: 'review',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Complete Medication Quiz',
    description: 'Finish the Medication Calculations quiz to improve your pharmacology knowledge',
    type: 'quiz',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Practice Vitals Monitoring',
    description: 'Practice more vital signs scenarios to improve your speed and accuracy',
    type: 'task',
    priority: 'medium',
  },
];

export function getVitalSignsForPatient(patientId: string): VitalSign[] {
  return mockVitalSigns.filter((v) => v.patientId === patientId);
}

export function getPatientById(id: string): Patient | undefined {
  return mockPatients.find((p) => p.id === id);
}

export function getEHRForPatient(patientId: string): EHRRecord[] {
  return mockEHRRecords.filter((e) => e.patientId === patientId);
}

export function getTasksByStatus(status: ClinicalTask['status']): ClinicalTask[] {
  return mockTasks.filter((t) => t.status === status);
}

export function getPerformanceByCategory(): { category: string; avgScore: number }[] {
  const categories: Record<string, number[]> = {};
  mockPerformanceLogs.forEach((log) => {
    if (!categories[log.category]) {
      categories[log.category] = [];
    }
    categories[log.category].push(log.score);
  });
  return Object.entries(categories).map(([category, scores]) => ({
    category,
    avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));
}

export function detectVitalAnomaly(vital: VitalSign): boolean {
  const { heartRate, bloodPressureSystolic, bloodPressureDiastolic, temperature, respirationRate, oxygenSaturation } = vital;
  
  if (heartRate < 60 || heartRate > 100) return true;
  if (bloodPressureSystolic > 140 || bloodPressureDiastolic > 90) return true;
  if (temperature > 38 || temperature < 36) return true;
  if (respirationRate < 12 || respirationRate > 20) return true;
  if (oxygenSaturation < 95) return true;
  
  return false;
}