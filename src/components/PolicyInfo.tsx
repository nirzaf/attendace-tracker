import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const PolicyInfo: React.FC = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Attendance Policies</h2>
      <ul className="space-y-4">
        <li className="flex items-start">
          <Clock className="mr-2 text-blue-500 flex-shrink-0" />
          <span>Working hours: 7:00 AM to 3:00 PM (8 hours)</span>
        </li>
        <li className="flex items-start">
          <AlertCircle className="mr-2 text-blue-500 flex-shrink-0" />
          <span>15-minute grace period for late arrivals</span>
        </li>
        <li className="flex items-start">
          <Calendar className="mr-2 text-blue-500 flex-shrink-0" />
          <span>Up to 7 hours of personal leave per month (with approval)</span>
        </li>
        <li className="flex items-start">
          <AlertCircle className="mr-2 text-blue-500 flex-shrink-0" />
          <span>Three manual adjustments allowed for forgotten clock-ins/outs</span>
        </li>
      </ul>
    </div>
  );
};

export default PolicyInfo;