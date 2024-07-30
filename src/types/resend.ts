// types/resend.ts
export interface ResendEmailResponse {
    object: string;
    id: string;
    to: string[];
    from: string;
    created_at: string;
    subject: string;
    html: string;
    text: string | null;
    bcc: string[] | null;
    cc: string[] | null;
    reply_to: string[] | null;
    last_event: string;
  }
  