interface BadgeProps {
    text: string;
    color: string;
  }
  
  export const Badge: React.FC<BadgeProps> = ({ text, color }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {text}
    </span>
  );