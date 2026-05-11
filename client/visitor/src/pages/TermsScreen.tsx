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

export const TermsScreen = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="Terms & Conditions">
      <div style={{ paddingBottom: '2rem' }}>
        <p style={{ ...TEXT_STYLE, marginBottom: '1.5rem' }}>
          Last updated: May 2026. By using ZooScan, you agree to the following terms.
        </p>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>1. Acceptance of Terms</h3>
          <p style={TEXT_STYLE}>
            By downloading, installing, or using the ZooScan application, you agree to be bound
            by these Terms of Service. If you do not agree to these terms, do not use the application.
            ZooScan is operated by the Cali Zoo Foundation for educational and visitor engagement purposes.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>2. Use of the Application</h3>
          <p style={TEXT_STYLE}>
            ZooScan is intended for use by zoo visitors to enhance their experience through QR code
            scanning, animal information, and gamification features. You agree to use the app only
            for lawful purposes and in a manner that does not infringe the rights of others. You must
            be at least 13 years old to create an account.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>3. Data Collection and Privacy</h3>
          <p style={TEXT_STYLE}>
            We collect information you provide when creating an account (email, name) and data
            generated through app use (QR scans, favorites, session data). This data is stored
            securely using Supabase infrastructure. We do not sell your personal data to third parties.
            For full details, see our Privacy Policy.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>4. QR Code Scanning</h3>
          <p style={TEXT_STYLE}>
            The QR scanning feature uses your device camera solely for reading exhibit QR codes
            within the zoo. Camera access is requested only when you activate the scanner and is
            not used for any other purpose. Scan data is associated with your account to track
            your collection progress.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>5. Intellectual Property</h3>
          <p style={TEXT_STYLE}>
            All content within ZooScan — including animal information, 3D models, images, text,
            and design — is the property of the Cali Zoo Foundation or its licensors. You may not
            reproduce, distribute, or create derivative works without explicit written permission.
            The gamification system (XP, badges, levels) is proprietary to ZooScan.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h3 style={HEADING_STYLE}>6. Contact</h3>
          <p style={TEXT_STYLE}>
            For questions about these terms, contact us at support@zooscan.co or visit the
            information desk at the Cali Zoo Foundation. We aim to respond within 5 business days.
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
