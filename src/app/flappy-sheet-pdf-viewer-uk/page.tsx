import { getSignedUrlForFlappyUkSheetPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUKPage() {
  const signedUrl = await getSignedUrlForFlappyUkSheetPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}