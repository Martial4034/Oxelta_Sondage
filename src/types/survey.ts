export interface SurveyData {
    userId: string;
    responseDate: Date;
    mobileGaming: boolean;
    blockchainFamiliarity: 'Oui' | 'Un petit peu' | 'Non';
    interestInEarningTokens: number;
    interestInDigitalAssets: number;
    interestInClashOfClans: number;
    email?: string;
    country?: string;
  }
  