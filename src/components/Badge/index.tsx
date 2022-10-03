import React from "react";

interface BadgeProps {
  type?: string;
  content: string;
}

const Badge: React.FC<BadgeProps> = ({ type, content }) => {
  return <span className={`badge badge-${type}`}>{content}</span>;
};

export default Badge;
