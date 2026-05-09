import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { ZONES } from '../data/zones';

interface MapHotspot {
  id: string;
  top: string;
  left: string;
  color: string;
}

export const MapScreen = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  // 📍 Configuración de las Zonas del Zoológico
  const hotspots: MapHotspot[] = [
    { id: "australia", top: "40%", left: "44%", color: "#f59e0b" },
    { id: "asia", top: "32%", left: "58%", color: "#ef4444" },
    { id: "acuario", top: "48%", left: "78%", color: "#3b82f6" },
    { id: "aviario", top: "58%", left: "57%", color: "#10b981" },
    { id: "primates", top: "78%", left: "46%", color: "#8b5cf6" },
  ];

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleHotspotClick = (id: string) => {
    navigate(`/zone/${id}`);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || scale === 1) return;
    const deltaX = e.clientX - lastPosition.current.x;
    const deltaY = e.clientY - lastPosition.current.y;
    setPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <AppLayout title="Zoo Map">
      <div className="map-screen-container" style={{ position: 'relative', height: '100%', overflow: 'hidden', background: '#f0f0f0', borderRadius: '16px' }}>
        {/* Zoom Controls */}
        <div className="zoom-controls" style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          zIndex: 20
        }}>
          <button className="icon-btn" onClick={handleZoomIn}>+</button>
          <button className="icon-btn" onClick={handleZoomOut}>-</button>
          <button className="icon-btn" onClick={handleReset} style={{ fontSize: '0.8rem' }}>Reset</button>
        </div>

        {/* Map Viewport */}
        <div 
          className="map-image-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: scale > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
            touchAction: 'none'
          }}
        >
          <div style={{
            position: 'relative',
            display: 'inline-block',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging.current ? 'none' : 'transform 0.3s ease-out',
            transformOrigin: 'center'
          }}>
            <img
              src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1778358291/Captura_de_pantalla_2026-05-09_151856_jl8zvw.png"
              alt="Zoo Map"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Marcadores de Zonas */}
            {hotspots.map(spot => {
              const zoneData = ZONES.find(z => z.id === spot.id);
              return (
                <div
                  key={spot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(spot.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: spot.top,
                    left: spot.left,
                    width: '32px',
                    height: '32px',
                    background: spot.color,
                    border: '3px solid white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}
                  className="map-marker-ping"
                >
                  <span style={{ pointerEvents: 'none' }}>{zoneData?.emoji}</span>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: spot.color,
                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    position: 'absolute',
                    zIndex: -1
                  }}></div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="collection-subtitle" style={{ position: 'absolute', bottom: '1rem', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 10 }}>
          {scale > 1 ? 'Arrastra para moverte' : 'Haz zoom y toca las zonas para explorarlas'}
        </p>
      </div>
    </AppLayout>
  );
};
