import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../services/supabase';

export const EditProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName]       = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error: dbError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .maybeSingle();

      if (!dbError && data) {
        setName(data.name ?? '');
      }
      setLoading(false);
    };
    void load();
  }, []);

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error: dbError } = await supabase
        .from('profiles')
        .update({ name: name.trim() })
        .eq('id', user.id);

      if (dbError) throw dbError;

      toast.success('Profile updated!');
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout title="Edit Profile">
      <div className="profile-container">

        <div className="profile-avatar" style={{ marginBottom: '0.5rem' }}>
          {name.charAt(0).toUpperCase() || 'U'}
        </div>

        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.15)',
            border: '1px solid rgba(220,38,38,0.4)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#fca5a5',
            fontSize: '14px',
            marginBottom: '12px',
            textAlign: 'center',
            width: '100%',
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading profile...</p>
        ) : (
          <div style={{ width: '100%', marginBottom: '2rem' }}>
            <SectionCard title="Personal Information">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Name</label>
                  <input
                    type="text"
                    className="auth-input"
                    style={{ backgroundColor: 'var(--bg-dark)' }}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        <PrimaryButton onClick={handleSave} disabled={saving || loading}>
          {saving ? 'Saving...' : 'Save changes'}
        </PrimaryButton>

      </div>
    </AppLayout>
  );
};
