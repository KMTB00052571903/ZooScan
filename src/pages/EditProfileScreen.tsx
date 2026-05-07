import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const EditProfileScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSave = () => {
    navigate('/profile');
  };

  return (
    <AppLayout title="Edit Profile">
      <div className="profile-container">
        <div className="profile-avatar" style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
          U
        </div>
        <p className="auth-link" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
          {t('editProfile.changePhoto')}
        </p>
        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <SectionCard title={t('editProfile.personalInfo')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('editProfile.name')}</label>
                <input
                  type="text"
                  defaultValue="User"
                  className="auth-input"
                  style={{ backgroundColor: 'var(--bg-dark)' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('editProfile.username')}</label>
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
        <PrimaryButton onClick={handleSave}>
          {t('editProfile.saveChanges')}
        </PrimaryButton>
      </div>
    </AppLayout>
  );
};
