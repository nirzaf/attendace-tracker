import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, UserCheck, UserX, Calendar, AlertCircle } from 'lucide-react';
import AttendanceLog from './components/AttendanceLog';
import ClockButton from './components/ClockButton';
import PolicyInfo from './components/PolicyInfo';

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: 'On Time' | 'Late' | 'Left Early' | 'Absent';
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [attendanceLog, setAttendanceLog] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    setIsClockedIn(true);
    setClockInTime(now);
  };

  const handleClockOut = () => {
    const now = new Date();
    setIsClockedIn(false);
    if (clockInTime) {
      const totalHours = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
      const status = getAttendanceStatus(clockInTime, now);
      const newRecord: AttendanceRecord = {
        date: now.toLocaleDateString(),
        clockIn: clockInTime.toLocaleTimeString(),
        clockOut: now.toLocaleTimeString(),
        totalHours: parseFloat(totalHours.toFixed(2)),
        status,
      };
      setAttendanceLog([newRecord, ...attendanceLog]);
    }
    setClockInTime(null);
  };

  const getAttendanceStatus = (clockIn: Date, clockOut: Date): AttendanceRecord['status'] => {
    const startTime = new Date(clockIn);
    startTime.setHours(7, 0, 0, 0);
    const endTime = new Date(clockIn);
    endTime.setHours(15, 0, 0, 0);

    if (clockIn > new Date(startTime.getTime() + 15 * 60000)) {
      return 'Late';
    } else if (clockOut < endTime) {
      return 'Left Early';
    } else {
      return 'On Time';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          <Clock className="inline-block mr-2" />
          Attendance Tracker
        </h1>
        <div className="text-center mb-8">
          <p className="text-xl font-semibold">{currentTime.toLocaleTimeString()}</p>
          <p className="text-gray-600">{currentTime.toLocaleDateString()}</p>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <ClockButton
            onClick={handleClockIn}
            disabled={isClockedIn}
            icon={<LogIn />}
            text="Clock In"
            color="bg-green-500 hover:bg-green-600"
          />
          <ClockButton
            onClick={handleClockOut}
            disabled={!isClockedIn}
            icon={<LogOut />}
            text="Clock Out"
            color="bg-red-500 hover:bg-red-600"
          />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Attendance Log</h2>
          <AttendanceLog log={attendanceLog} />
        </div>
        <PolicyInfo />
      </div>
    </div>
  );
}

export default App;