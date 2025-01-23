import { getSignedUrlForUkSheetPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUKPage() {
  const signedUrl = await getSignedUrlForUkSheetPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}