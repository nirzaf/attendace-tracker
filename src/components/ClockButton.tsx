import React from 'react';

interface ClockButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  text: string;
  color: string;
}

const ClockButton: React.FC<ClockButtonProps> = ({ onClick, disabled, icon, text, color }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${color} text-white font-bold py-2 px-4 rounded-full flex items-center ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
};

export default ClockButton;