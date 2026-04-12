interface FavoriteCardProps {
  name: string;
  type: string;
  emoji: string;
  onClick?: () => void;
}

export const FavoriteCard = ({ name, type, emoji, onClick }: FavoriteCardProps) => {
  return (
    <div 
      className="favorite-card" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="favorite-emoji">{emoji}</div>
      <div className="favorite-info">
        <h4 className="favorite-name">{name}</h4>
        <p className="favorite-type">{type}</p>
      </div>
    </div>
  );
};
