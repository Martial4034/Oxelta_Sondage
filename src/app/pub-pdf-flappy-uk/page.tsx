import { getSignedUrlForPubFlappyUk } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForPubFlappyUk();

  return <PDFLoader signedUrl={signedUrl} />;
}
