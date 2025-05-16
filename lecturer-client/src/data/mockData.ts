
export interface Device {
  id: string;
  name: string;
  type: 'light' | 'temperature' | 'motion' | 'air-quality';
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  value: number | boolean;
  unit?: string;
  lastUpdate: string;
  batteryLevel?: number;
}

export interface HistoricalData {
  timestamp: string;
  value: number;
}

export const devices: Device[] = [
  {
    id: 'light-001',
    name: 'Library Lighting',
    type: 'light',
    location: 'Library',
    status: 'online',
    value: true,
    lastUpdate: '2025-05-15T10:30:00Z',
    batteryLevel: 85
  },
  {
    id: 'temp-001',
    name: 'Library Temperature',
    type: 'temperature',
    location: 'Library',
    status: 'online',
    value: 24.5,
    unit: '°C',
    lastUpdate: '2025-05-15T10:31:00Z',
    batteryLevel: 92
  },
  {
    id: 'motion-001',
    name: 'Library Entrance',
    type: 'motion',
    location: 'Library',
    status: 'online',
    value: false,
    lastUpdate: '2025-05-15T10:29:00Z',
    batteryLevel: 78
  },
  {
    id: 'light-002',
    name: 'Dorm A Lighting',
    type: 'light',
    location: 'Dorm A',
    status: 'online',
    value: false,
    lastUpdate: '2025-05-15T10:28:00Z',
    batteryLevel: 64
  },
  {
    id: 'temp-002',
    name: 'Dorm A Temperature',
    type: 'temperature',
    location: 'Dorm A',
    status: 'online',
    value: 22.3,
    unit: '°C',
    lastUpdate: '2025-05-15T10:30:00Z',
    batteryLevel: 75
  },
  {
    id: 'motion-002',
    name: 'Dorm A Hallway',
    type: 'motion',
    location: 'Dorm A',
    status: 'maintenance',
    value: false,
    lastUpdate: '2025-05-15T09:15:00Z',
    batteryLevel: 12
  },
  {
    id: 'light-003',
    name: 'Cafeteria Lighting',
    type: 'light',
    location: 'Cafeteria',
    status: 'online',
    value: true,
    lastUpdate: '2025-05-15T10:32:00Z',
    batteryLevel: 89
  },
  {
    id: 'air-001',
    name: 'Cafeteria Air Quality',
    type: 'air-quality',
    location: 'Cafeteria',
    status: 'online',
    value: 87,
    unit: 'AQI',
    lastUpdate: '2025-05-15T10:33:00Z',
    batteryLevel: 95
  },
];

export const temperatureData: HistoricalData[] = [
  { timestamp: '08:00', value: 21.2 },
  { timestamp: '09:00', value: 22.1 },
  { timestamp: '10:00', value: 23.5 },
  { timestamp: '11:00', value: 24.2 },
  { timestamp: '12:00', value: 24.8 },
  { timestamp: '13:00', value: 25.1 },
  { timestamp: '14:00', value: 24.7 },
  { timestamp: '15:00', value: 24.5 },
  { timestamp: '16:00', value: 24.0 },
];

export const energyUsageData = [
  { name: 'Mon', library: 120, dormA: 90, cafeteria: 60 },
  { name: 'Tue', library: 132, dormA: 89, cafeteria: 70 },
  { name: 'Wed', library: 125, dormA: 98, cafeteria: 85 },
  { name: 'Thu', library: 130, dormA: 96, cafeteria: 81 },
  { name: 'Fri', library: 142, dormA: 105, cafeteria: 88 },
  { name: 'Sat', library: 90, dormA: 110, cafeteria: 62 },
  { name: 'Sun', library: 85, dormA: 95, cafeteria: 55 },
];

export const lectureContent = [
  {
    id: 'iot-basics',
    title: 'IoT Fundamentals for Smart Campus',
    description: 'Introduction to IoT concepts and applications in campus environments',
    duration: '45 minutes',
    slides: 24,
    lastUpdated: '2025-04-23',
    topics: ['IoT Architecture', 'Sensor Networks', 'Data Flow', 'Edge Computing'],
    image: 'placeholder.svg',
  },
  {
    id: 'device-management',
    title: 'Managing Campus IoT Devices',
    description: 'Learn how to configure, monitor, and troubleshoot campus IoT devices',
    duration: '60 minutes',
    slides: 32,
    lastUpdated: '2025-05-01',
    topics: ['Device Provisioning', 'Monitoring', 'Firmware Updates', 'Battery Management'],
    image: 'placeholder.svg',
  },
  {
    id: 'data-analytics',
    title: 'IoT Data Analytics',
    description: 'Analyzing and visualizing data from campus IoT devices',
    duration: '50 minutes',
    slides: 28,
    lastUpdated: '2025-05-10',
    topics: ['Data Collection', 'Processing Pipelines', 'Visualization', 'Insights'],
    image: 'placeholder.svg',
  }
];

export const troubleshootingGuides = [
  {
    id: 'offline-device',
    title: 'Device Offline Troubleshooting',
    steps: [
      'Check device power supply and battery level',
      'Verify network connectivity in the area',
      'Restart the device using the power button',
      'Check for physical damage to the device',
      'Reset the device to factory settings if necessary'
    ]
  },
  {
    id: 'sensor-errors',
    title: 'Sensor Reading Errors',
    steps: [
      'Clean the sensor surface if applicable',
      'Calibrate the sensor using the calibration tool',
      'Check for interference from nearby devices',
      'Verify sensor firmware is up to date',
      'Replace sensor if persistent errors occur'
    ]
  },
  {
    id: 'connection-issues',
    title: 'Network Connection Issues',
    steps: [
      'Check Wi-Fi or cellular signal strength',
      'Verify gateway device is online and functioning',
      'Reset the network connection on the device',
      'Update network credentials if changed',
      'Move device closer to access point if possible'
    ]
  }
];
