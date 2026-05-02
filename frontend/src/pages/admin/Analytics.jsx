import React from 'react';
import { Download, Calendar, Filter, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const Analytics = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const analyticsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '24px',
  };

  const cardStyle = {
    padding: '24px',
  };

  const bigChartContainerStyle = {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '20px',
  };

  const pieContainerStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'conic-gradient(var(--accent) 0% 45%, #3b82f6 45% 75%, #f59e0b 75% 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const pieInnerStyle = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    backgroundColor: 'var(--surface)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const legendStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginLeft: '40px',
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: 'var(--text)',
  };

  const dotStyle = (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
  });

  const subGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const smallStatCardStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const statValStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--text-bright)',
  };

  const trendStyle = (positive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: positive ? 'var(--success)' : 'var(--error)',
    fontWeight: '500',
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>Analytics & Reports</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>In-depth analysis of your support performance metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" icon={Calendar} onClick={() => console.log('Change date range')}>Last 30 Days</Button>
          <Button variant="primary" icon={Download} onClick={() => console.log('Export analytics report')}>Export Report</Button>
        </div>
      </div>

      <div style={analyticsGridStyle}>
        <div className="glass-card" style={cardStyle}>
          <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>Ticket Distribution</h3>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Distribution of tickets across different categories.</p>
          
          <div style={bigChartContainerStyle}>
            <div style={pieContainerStyle}>
              <div style={pieInnerStyle}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-bright)' }}>1,284</span>
                <span style={{ fontSize: '11px', color: 'var(--text)', textTransform: 'uppercase', fontWeight: '600' }}>Total Tickets</span>
              </div>
            </div>
            <div style={legendStyle}>
              <div style={legendItemStyle}>
                <div style={dotStyle('var(--accent)')}></div>
                <span style={{ fontWeight: '500' }}>Technical Support (45%)</span>
              </div>
              <div style={legendItemStyle}>
                <div style={dotStyle('#3b82f6')}></div>
                <span style={{ fontWeight: '500' }}>Billing Issues (30%)</span>
              </div>
              <div style={legendItemStyle}>
                <div style={dotStyle('#f59e0b')}></div>
                <span style={{ fontWeight: '500' }}>General Inquiry (25%)</span>
              </div>
            </div>
          </div>
        </div>

        <div style={subGridStyle}>
          <div className="glass-card" style={smallStatCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text)', fontSize: '14px', fontWeight: '600' }}>Avg. Response Time</span>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
                <Clock size={18} />
              </div>
            </div>
            <div style={statValStyle}>18m 24s</div>
            <div style={trendStyle(true)}>
              <TrendingDown size={14} />
              <span>12.5% faster than last month</span>
            </div>
          </div>

          <div className="glass-card" style={smallStatCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text)', fontSize: '14px', fontWeight: '600' }}>Resolution Rate</span>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--accent-muted)', color: 'var(--accent)' }}>
                <CheckCircle size={18} />
              </div>
            </div>
            <div style={statValStyle}>94.2%</div>
            <div style={trendStyle(true)}>
              <TrendingUp size={14} />
              <span>2.1% increase this week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Monthly Resolution Trends</h3>
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '0 20px' }}>
          {[30, 45, 35, 60, 55, 80, 70, 90, 85, 95, 88, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <div style={{ width: '100%', height: `${h}%`, backgroundColor: 'var(--accent-muted)', border: '1px solid var(--border)', borderRadius: '4px', opacity: 0.6 + (h/200) }}></div>
              <span style={{ fontSize: '10px', color: 'var(--text)', fontWeight: '600' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
