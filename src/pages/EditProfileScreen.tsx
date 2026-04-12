import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export const EditProfileScreen = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Navigate back to profile on save
    navigate('/profile');
  };

  return (
    <AppLayout title="Edit Profile">
      <div className="profile-container">
        
        {/* Avatar Editable */}
        <div className="profile-avatar" style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
          U
        </div>
        <p className="auth-link" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
          Change photo
        </p>

        {/* Inputs */}
        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <SectionCard title="Personal Information">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Name</label>
                <input 
                  type="text" 
                  defaultValue="User" 
                  className="auth-input" 
                  style={{ backgroundColor: 'var(--bg-dark)' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Username</label>
                <input 
                  type="text" 
                  defaultValue="@username" 
                  className="auth-input" 
                  style={{ backgroundColor: 'var(--bg-dark)' }} 
                />
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Action Button */}
        <PrimaryButton onClick={handleSave}>
          Save changes
        </PrimaryButton>

      </div>
    </AppLayout>
  );
};
