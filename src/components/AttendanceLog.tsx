import React from 'react';
import { UserCheck, UserX, AlertCircle } from 'lucide-react';

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: 'On Time' | 'Late' | 'Left Early' | 'Absent';
}

interface AttendanceLogProps {
  log: AttendanceRecord[];
}

const AttendanceLog: React.FC<AttendanceLogProps> = ({ log }) => {
  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'On Time':
        return <UserCheck className="text-green-500" />;
      case 'Late':
        return <AlertCircle className="text-yellow-500" />;
      case 'Left Early':
        return <AlertCircle className="text-orange-500" />;
      case 'Absent':
        return <UserX className="text-red-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Clock In</th>
            <th className="py-3 px-6 text-left">Clock Out</th>
            <th className="py-3 px-6 text-left">Total Hours</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {log.map((record, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{record.date}</td>
              <td className="py-3 px-6 text-left">{record.clockIn}</td>
              <td className="py-3 px-6 text-left">{record.clockOut}</td>
              <td className="py-3 px-6 text-left">{record.totalHours}</td>
              <td className="py-3 px-6 text-left flex items-center">
                {getStatusIcon(record.status)}
                <span className="ml-2">{record.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceLog;