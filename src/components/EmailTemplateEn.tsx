import * as React from 'react';

interface EmailTemplateProps {
  email: string;
}

export const EmailTemplateEn: React.FC<Readonly<EmailTemplateProps>> = ({ email }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#25A6D5', color: '#ffffff', textAlign: 'center', padding: '20px' }}>
        <img src="https://i.imgur.com/2oXap3g.png" alt="Logo" style={{ maxWidth: '150px', marginBottom: '10px' }} />
      </div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', color: '#333333' }}>Thank you for responding to our survey!</h1>
        <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5 }}>We sincerely appreciate your participation and valuable feedback. Your opinion is very important to us and helps us improve our project.</p>
        <img src="https://i.imgur.com/T7Kl3lC.png" alt="Oxelta" style={{ maxWidth: '100px' }} />
        <p style={{ fontSize: '16px', color: '#555555' }}>Email: {email}</p>
      </div>
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
        <a href="https://drive.google.com/file/d/1QRQ3wGeuKL0HvPcTx-uXW-dfUK-SbiuB/view" style={{ display: 'inline-block', padding: '10px 20px', color: '#ffffff', backgroundColor: '#25A6D5', borderRadius: '4px', textDecoration: 'none', fontSize: '16px' }}>View the documentation</a>
      </div>
    </div>
  </div>
);