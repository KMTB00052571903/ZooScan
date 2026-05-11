import { AppLayout } from '../../layout/AppLayout';
import { useNavigate } from 'react-router-dom';

export const StaffProfile = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="StaffProfile">
      <div className="profile-container">

        <div className="profile-avatar">U</div>
        <h2 className="profile-name">User</h2>
        <p className="profile-email">user@email.com</p>

        {/* Actions */}
        <div className="profile-actions">
          <div className="action-item" onClick={() => navigate('/edit-profile')}>
            <span>Edit profile</span>
            <span className="action-arrow">›</span>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};
