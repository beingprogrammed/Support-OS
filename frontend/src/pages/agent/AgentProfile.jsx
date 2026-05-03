import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, Settings, LogOut, Award, Calendar, CheckCircle, Star, Palette } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import ThemeSelector from '../../components/common/ThemeSelector';

const AgentProfile = () => {
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const profileGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
    gap: '24px',
  };

  const cardStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const avatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    boxShadow: '0 8px 24px rgba(192, 132, 252, 0.4)',
    border: '4px solid rgba(255, 255, 255, 0.1)',
  };

  const nameStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--text-bright)',
    marginBottom: '4px',
  };

  const roleStyle = {
    color: 'var(--accent)',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '24px',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    width: '100%',
    paddingTop: '24px',
    borderTop: '1px solid var(--border)',
  };

  const statItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const statValueStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--text-bright)',
  };

  const statLabelStyle = {
    fontSize: '12px',
    color: 'var(--text)',
    textTransform: 'uppercase',
  };

  const sectionStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-bright)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  };

  const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '24px',
  };

  const infoItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  };

  const iconContainerStyle = {
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'var(--accent-muted)',
    color: 'var(--accent)',
  };

  const labelStyle = {
    fontSize: '12px',
    color: 'var(--text)',
    marginBottom: '4px',
  };

  const valueStyle = {
    fontSize: '15px',
    color: 'var(--text-bright)',
    fontWeight: '500',
  };

  const achievementCardStyle = {
    padding: '16px',
    backgroundColor: 'var(--surface)',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: 'var(--shadow-sm)'
  };

  return (
    <div style={containerStyle}>
      <div style={profileGridStyle}>
        {/* Profile Sidebar */}
        <div className="glass-card" style={cardStyle}>
          <div style={avatarStyle}>
            {user?.name?.split(' ').map(n => n[0]).join('') || 'JS'}
          </div>
          <h2 style={nameStyle}>{user?.name || 'Jane Smith'}</h2>
          <p style={roleStyle}>Support Agent • Lvl 2</p>
          
          <div style={statsGridStyle}>
            <div style={statItemStyle}>
              <span style={statValueStyle}>156</span>
              <span style={statLabelStyle}>Resolved</span>
            </div>
            <div style={statItemStyle}>
              <span style={statValueStyle}>4.8</span>
              <span style={statLabelStyle}>Rating</span>
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button variant="outline" fullWidth icon={Settings} onClick={() => console.log('Open profile settings')}>Settings</Button>
            <Button variant="error" fullWidth icon={LogOut} onClick={logout}>Logout</Button>
          </div>
        </div>

        {/* Profile Main Content */}
        <div className="glass-card" style={sectionStyle}>
          <div>
            <h3 style={sectionTitleStyle}><User size={20} /> Personal Information</h3>
            <div style={infoGridStyle}>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><Mail size={20} /></div>
                <div>
                  <div style={labelStyle}>Email Address</div>
                  <div style={valueStyle}>{user?.email || 'jane@supportos.com'}</div>
                </div>
              </div>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><Phone size={20} /></div>
                <div>
                  <div style={labelStyle}>Phone Number</div>
                  <div style={valueStyle}>+1 (555) 000-1234</div>
                </div>
              </div>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><Shield size={20} /></div>
                <div>
                  <div style={labelStyle}>Access Level</div>
                  <div style={valueStyle}>Agent (Tier 2)</div>
                </div>
              </div>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><Calendar size={20} /></div>
                <div>
                  <div style={labelStyle}>Joined Date</div>
                  <div style={valueStyle}>January 12, 2024</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={sectionTitleStyle}><Award size={20} /> Recent Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div style={achievementCardStyle}>
                <div style={{ ...iconContainerStyle, backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div style={{ ...valueStyle, fontSize: '14px' }}>Fast Responder</div>
                  <div style={{ ...labelStyle, fontSize: '11px' }}>Average response under 5m</div>
                </div>
              </div>
              <div style={achievementCardStyle}>
                <div style={{ ...iconContainerStyle, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                  <Star size={20} />
                </div>
                <div>
                  <div style={{ ...valueStyle, fontSize: '14px' }}>Customer Favorite</div>
                  <div style={{ ...labelStyle, fontSize: '11px' }}>10+ 5-star ratings this week</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={sectionTitleStyle}><Palette size={20} /> Appearance</h3>
            <div style={{ marginTop: '12px' }}>
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
