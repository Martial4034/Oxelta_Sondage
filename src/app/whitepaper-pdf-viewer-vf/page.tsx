import { getSignedUrlForVfWhitePaperPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForVfWhitePaperPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}
