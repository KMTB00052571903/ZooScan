import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';

const SECTION_STYLE: React.CSSProperties = {
  marginBottom: '1.5rem',
};
const HEADING_STYLE: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 700,
  color: 'var(--accent-primary)',
  marginBottom: '0.5rem',
};
const TEXT_STYLE: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  lineHeight: 1.7,
};

export const PrivacyScreen = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="Privacy Policy">
      <div style={{ paddingBottom: '2rem' }}>
        <p style={{ ...TEXT_STYLE, marginBottom: '1.5rem' }}>
          Last updated: May 2026. Your privacy matters to us. This policy explains what data
          ZooScan collects and how we use it.
        </p>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>1. Data We Collect</h3>
          <p style={TEXT_STYLE}>
            When you register, we collect your <strong>email address</strong> and chosen{' '}
            <strong>display name</strong>. While using the app, we record which QR codes you have
            scanned, which animals you have marked as favorites, and your gamification progress
            (XP, level, badges). We do not collect location data, contacts, or any data unrelated
            to your zoo visit.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>2. How We Use Your Data</h3>
          <p style={TEXT_STYLE}>
            Your data is used exclusively to provide ZooScan features: personalized animal
            collections, favorites, progress tracking, and the staff dashboard analytics (aggregated
            scan counts per exhibit). We may send app-related notifications if you grant permission.
            We never use your data for advertising.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>3. Data Storage — Supabase</h3>
          <p style={TEXT_STYLE}>
            All user data is stored on <strong>Supabase</strong>, a secure cloud database platform
            with row-level security (RLS). This means each user can only access their own data.
            Supabase is hosted on AWS infrastructure with industry-standard encryption at rest and
            in transit (TLS 1.2+). Data is stored in the us-east region.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>4. Data Sharing</h3>
          <p style={TEXT_STYLE}>
            We do not sell, rent, or share your personal data with third parties. Aggregated,
            anonymized analytics (e.g., "exhibit X was scanned 200 times today") may be shared
            internally with zoo staff for operational purposes. Your name and email are never
            shared externally.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>5. Your Rights</h3>
          <p style={TEXT_STYLE}>
            You have the right to access, correct, or delete your personal data at any time.
            To delete your account and all associated data, contact us at support@zooscan.co.
            You may also update your display name at any time from the Edit Profile screen.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>6. Contact</h3>
          <p style={TEXT_STYLE}>
            For privacy questions or data requests, contact our data officer at
            privacy@zooscan.co or visit the Cali Zoo Foundation information desk. Response
            time is within 5 business days.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '14px',
            background: 'var(--accent-gradient)',
            color: '#fff', border: 'none',
            cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
            marginTop: '0.5rem',
          }}
        >
          ← Back
        </button>
      </div>
    </AppLayout>
  );
};
