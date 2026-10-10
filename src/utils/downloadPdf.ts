import { AUDIT_PDF_BASE64 } from '../data/auditPdfBase64';

/**
 * Converts the base64 encoded PDF string into a Uint8Array byte buffer.
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Creates a clean Blob URL for the audit PDF.
 */
export function getAuditPdfBlobUrl(): string {
  try {
    const bytes = base64ToUint8Array(AUDIT_PDF_BASE64);
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Failed to create PDF blob URL:', err);
    return '/DevoraCamp_Audit_Report.pdf';
  }
}

/**
 * Downloads the verified PDF report directly from in-memory binary data.
 * This completely avoids external proxy redirects, iframe sandbox issues,
 * or HTML error pages that cause "file damaged or format error" in external viewers.
 */
export function downloadAuditPdf(fileName = 'DevoraCamp_Audit_Report.pdf'): boolean {
  try {
    const bytes = base64ToUint8Array(AUDIT_PDF_BASE64);
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    }, 15000);

    return true;
  } catch (err) {
    console.error('Direct blob download error, falling back to static path:', err);
    const anchor = document.createElement('a');
    anchor.href = '/DevoraCamp_Audit_Report.pdf';
    anchor.download = fileName;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return false;
  }
}

/**
 * Directly opens the verified 10-page PDF in a new tab without downloading.
 * Uses a Blob URL with application/pdf header so the browser's built-in PDF viewer
 * displays it cleanly and smoothly.
 */
export function openAuditPdfInNewTab(): void {
  try {
    const bytes = base64ToUint8Array(AUDIT_PDF_BASE64);
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (err) {
    console.error('Failed to open PDF in new tab, falling back to static path:', err);
    window.open('/DevoraCamp_Audit_Report.pdf', '_blank');
  }
}

