import * as React from 'react';

interface EmailTemplateProps {
  email: string;
}

export const EmailTemplateFr: React.FC<Readonly<EmailTemplateProps>> = ({ email }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#25A6D5', color: '#ffffff', textAlign: 'center', padding: '20px' }}>
        <img src="https://i.imgur.com/2oXap3g.png" alt="Logo" style={{ maxWidth: '150px', marginBottom: '10px' }} />
      </div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', color: '#333333' }}>Merci de répondre à notre sondage!</h1>
        <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.5 }}>Nous apprécions sincèrement votre participation et vos précieux commentaires. Votre opinion est très importante pour nous et nous aide à améliorer notre projet.</p>
        <img src="https://i.imgur.com/T7Kl3lC.png" alt="Oxelta" style={{ maxWidth: '100px' }} />
        <p style={{ fontSize: '16px', color: '#555555' }}>Email: {email}</p>
      </div>
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
        <a href="https://drive.google.com/file/d/1QRQ3wGeuKL0HvPcTx-uXW-dfUK-SbiuB/view" style={{ display: 'inline-block', padding: '10px 20px', color: '#ffffff', backgroundColor: '#25A6D5', borderRadius: '4px', textDecoration: 'none', fontSize: '16px' }}>Voir la documentation</a>
      </div>
    </div>
  </div>
);
