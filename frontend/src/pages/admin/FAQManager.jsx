import React from 'react';
import { Plus, Search, Edit2, Trash2, FileText, ExternalLink, HelpCircle, BookOpen } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

const FAQManager = () => {
  const faqs = [
    { id: 1, question: 'How do I reset my password?', category: 'Account', lastUpdated: '2 days ago', views: 1240 },
    { id: 2, question: 'What are the subscription plans?', category: 'Billing', lastUpdated: '1 week ago', views: 850 },
    { id: 3, question: 'How to integrate with Slack?', category: 'Integration', lastUpdated: '3 days ago', views: 2100 },
    { id: 4, name: 'Configuring custom domains', category: 'General', lastUpdated: '5 days ago', views: 420 },
  ];

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

  const faqListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const faqCardStyle = {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const faqInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const iconWrapperStyle = {
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: 'var(--accent-muted)',
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const actionsStyle = {
    display: 'flex',
    gap: '8px',
  };

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    color: 'var(--text)',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>FAQ Manager</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Create and manage knowledge base articles for your customers.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => console.log('Add new article')}>Add Article</Button>
      </div>

      <div style={{ maxWidth: '400px' }}>
        <Input placeholder="Search FAQ articles..." icon={Search} onChange={(e) => console.log('Search FAQ:', e.target.value)} />
      </div>

      <div style={faqListStyle}>
        {faqs.map((faq) => (
          <div key={faq.id} className="glass-card animate-fade-in" style={faqCardStyle}>
            <div style={faqInfoStyle}>
              <div style={iconWrapperStyle}>
                <BookOpen size={20} />
              </div>
              <div>
                <h3 style={{ color: 'var(--text-bright)', fontSize: '16px', fontWeight: '600' }}>{faq.question || faq.name}</h3>
                <div style={metaStyle}>
                  <Badge variant="secondary" size="small">{faq.category}</Badge>
                  <span>Updated {faq.lastUpdated}</span>
                  <span>•</span>
                  <span>{faq.views} views</span>
                </div>
              </div>
            </div>
            <div style={actionsStyle}>
              <Button variant="ghost" size="small" icon={ExternalLink} onClick={() => console.log('View article', faq.id)}></Button>
              <Button variant="ghost" size="small" icon={Edit2} onClick={() => console.log('Edit article', faq.id)}></Button>
              <Button variant="ghost" size="small" icon={Trash2} style={{ color: 'var(--error)' }} onClick={() => console.log('Delete article', faq.id)}></Button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '32px', textAlign: 'center', border: '1px dashed var(--border)', backgroundColor: 'transparent' }}>
        <div style={{ ...iconWrapperStyle, margin: '0 auto 16px', width: '48px', height: '48px' }}>
          <HelpCircle size={24} />
        </div>
        <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Need help with content?</h3>
        <p style={{ color: 'var(--text)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px' }}>
          Our AI can help you generate FAQ articles from your resolved support tickets automatically.
        </p>
        <Button variant="outline" icon={Plus} onClick={() => console.log('Generate FAQs from tickets')}>Generate from Tickets</Button>
      </div>
    </div>
  );
};

export default FAQManager;
