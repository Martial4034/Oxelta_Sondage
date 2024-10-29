import { getSignedUrlForVfSheetPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUKPage() {
  const signedUrl = await getSignedUrlForVfSheetPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}