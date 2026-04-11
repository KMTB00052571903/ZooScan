interface FavoriteCardProps {
  name: string;
  type: string;
  emoji: string;
}

export const FavoriteCard = ({ name, type, emoji }: FavoriteCardProps) => {
  return (
    <div className="favorite-card">
      <div className="favorite-emoji">{emoji}</div>
      <div className="favorite-info">
        <h4 className="favorite-name">{name}</h4>
        <p className="favorite-type">{type}</p>
      </div>
    </div>
  );
};
