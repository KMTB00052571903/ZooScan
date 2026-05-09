import { useState, useRef } from 'react';
import { AppLayout } from '../layout/AppLayout';

export const MapScreen = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
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
          zIndex: 10
        }}>
          <button className="icon-btn" onClick={handleZoomIn}>+</button>
          <button className="icon-btn" onClick={handleZoomOut}>-</button>
          <button className="icon-btn" onClick={handleReset} style={{ fontSize: '0.8rem' }}>Reset</button>
        </div>

        {/* Map Image Container */}
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
            cursor: scale > 1 ? 'grab' : 'default',
            touchAction: 'none'
          }}
        >
          <img
            src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1778358291/Captura_de_pantalla_2026-05-09_151856_jl8zvw.png" // Placeholder or user image path
            alt="Zoo Map"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging.current ? 'none' : 'transform 0.3s ease-out',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          />
        </div>

        <p className="collection-subtitle" style={{ position: 'absolute', bottom: '1rem', width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
          {scale > 1 ? 'Drag to move around' : 'Zoom in to see details'}
        </p>
      </div>
    </AppLayout>
  );
};
