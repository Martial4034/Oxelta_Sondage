// types/survey.ts
export interface SurveyData {
  idEmail: string;
  mobileGaming: boolean;
  blockchainFamiliarity: string;
  interestInClashOfClans: number;
  interestInDigitalAssets: number;
  interestInEarningTokens: number;
  userId: string;
  responseDate: Date;
  country: string;
  email?: string;
}

export type SurveyDataField = keyof SurveyData;
