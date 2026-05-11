interface AnimalARViewerProps {
  modelPath: string;
  alt?: string;
  height?: string;
}

export const AnimalARViewer = ({ modelPath, alt = '3D Animal Model', height = '400px' }: AnimalARViewerProps) => {
  return (
    <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <model-viewer
        src={modelPath}
        alt={alt}
        ar
        camera-controls
        autoplay
        shadow-intensity="1"
        style={{ width: '100%', height, background: 'rgba(0,0,0,0.05)' }}
      />
    </div>
  );
};
