import { getSignedUrlForFlappyUk } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForFlappyUk();

  return <PDFLoader signedUrl={signedUrl} />;
}
