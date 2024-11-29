import React from "react";

interface StatusMessageProps {
  status: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  return <p>Status: {status}</p>;
};

export default StatusMessage;
