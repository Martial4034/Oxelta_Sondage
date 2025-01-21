import { getSignedUrlForPubFlappyVF } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForPubFlappyVF();

  return <PDFLoader signedUrl={signedUrl} />;
}
