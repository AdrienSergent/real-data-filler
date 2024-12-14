import React from "react";

interface StatusMessageProps {
  status: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  return <p className="status">Status: {status}</p>;
};

export default StatusMessage;
