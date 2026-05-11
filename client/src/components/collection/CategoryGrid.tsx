import React from 'react';
import { ZONES } from '../../data/zones';

interface CategoryCardProps {
  title: string;
  count?: number;
  emoji: string;
  color: string;
  onClick?: () => void;
}

const CategoryCard = ({ title, count, emoji, color, onClick }: CategoryCardProps) => {
  return (
    <div 
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `1px solid ${color}33`,
        padding: '1.5rem',
        borderRadius: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="category-card-hover"
    >
      <div style={{
        fontSize: '3rem',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
        zIndex: 2
      }}>
        {emoji}
      </div>
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '700', 
          margin: 0, 
          color: 'var(--text-main)' 
        }}>
          {title}
        </h3>
        {count !== undefined && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)',
            fontWeight: '500'
          }}>
            {count} especies
          </span>
        )}
      </div>
      
      {/* Decorative background circle */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: color,
        opacity: 0.1,
        filter: 'blur(20px)',
        zIndex: 1
      }}></div>
    </div>
  );
};

export const CategoryGrid = () => {
  const [activeTab, setActiveTab] = React.useState<'zones' | 'species'>('zones');

  const speciesCategories = [
    { id: 'mammals', name: 'Mamíferos', emoji: '🦁', color: '#f59e0b' },
    { id: 'birds', name: 'Aves', emoji: '🦅', color: '#10b981' },
    { id: 'reptiles', name: 'Reptiles', emoji: '🦎', color: '#ef4444' },
    { id: 'fish', name: 'Peces', emoji: '🐠', color: '#3b82f6' },
    { id: 'amphibians', name: 'Anfibios', emoji: '🐸', color: '#8b5cf6' },
  ];

  return (
    <div className="category-section" style={{ padding: '1rem 0' }}>
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        background: 'rgba(0,0,0,0.03)',
        padding: '0.4rem',
        borderRadius: '16px',
        width: 'fit-content'
      }}>
        <button 
          onClick={() => setActiveTab('zones')}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'zones' ? 'white' : 'transparent',
            color: activeTab === 'zones' ? 'var(--text-main)' : 'var(--text-muted)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'zones' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
          }}
        >
          Zonas
        </button>
        <button 
          onClick={() => setActiveTab('species')}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'species' ? 'white' : 'transparent',
            color: activeTab === 'species' ? 'var(--text-main)' : 'var(--text-muted)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'species' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
          }}
        >
          Especies
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
        gap: '1rem' 
      }}>
        {activeTab === 'zones' ? (
          ZONES.map(zone => (
            <CategoryCard 
              key={zone.id}
              title={zone.name}
              emoji={zone.emoji}
              color={zone.color}
              count={zone.animals.length}
            />
          ))
        ) : (
          speciesCategories.map(cat => (
            <CategoryCard 
              key={cat.id}
              title={cat.name}
              emoji={cat.emoji}
              color={cat.color}
            />
          ))
        )}
      </div>

      <style>{`
        .category-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          border-color: currentColor;
        }
        .category-card-hover:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};
