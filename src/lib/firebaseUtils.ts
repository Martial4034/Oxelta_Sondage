// lib/firebaseUtils.ts
import { SurveyData, SurveyDataField } from '@/types/survey';

export const countDocumentsWithField = (data: SurveyData[], field: SurveyDataField): number => {
  return data.filter(doc => doc[field] !== undefined && doc[field] !== null).length;
};
