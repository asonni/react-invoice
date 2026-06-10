import {
  type CSSProperties,
  type ChangeEvent,
  useEffect,
  useState
} from 'react';
import { createRoot } from 'react-dom/client';
const bundledInvoiceUrl = '/invoice.pdf';

function App() {
  const [customPdfUrl, setCustomPdfUrl] = useState<string | null>(null);
  const [customPdfName, setCustomPdfName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (customPdfUrl) {
        URL.revokeObjectURL(customPdfUrl);
      }
    };
  }, [customPdfUrl]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      window.alert('Please choose a PDF file.');
      event.currentTarget.value = '';
      return;
    }

    setCustomPdfUrl(existingUrl => {
      if (existingUrl) {
        URL.revokeObjectURL(existingUrl);
      }
      return URL.createObjectURL(selectedFile);
    });
    setCustomPdfName(selectedFile.name);
  };

  const useBundledPdf = () => {
    setCustomPdfUrl(existingUrl => {
      if (existingUrl) {
        URL.revokeObjectURL(existingUrl);
      }
      return null;
    });
    setCustomPdfName(null);
  };

  const activePdfUrl = customPdfUrl ?? bundledInvoiceUrl;

  return (
    <main style={page}>
      <section style={panel}>
        <h1 style={title}>Invoice PDF Viewer</h1>
        <p style={subtitle}>
          Preview the generated invoice directly in your browser, or load any
          local PDF file for a quick review.
        </p>

        <div style={controls}>
          <label style={filePickerLabel}>
            <span style={buttonText}>Open Local PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              style={hiddenInput}
            />
          </label>

          <button type="button" onClick={useBundledPdf} style={softButton}>
            Use Bundled invoice.pdf
          </button>

          <a
            href={activePdfUrl}
            target="_blank"
            rel="noreferrer"
            style={linkButton}
          >
            Open in New Tab
          </a>
        </div>

        <p style={statusText}>
          Showing: <strong>{customPdfName ?? 'invoice.pdf (bundled)'}</strong>
        </p>
      </section>

      <section style={viewerShell}>
        <iframe
          title="Invoice PDF preview"
          src={activePdfUrl}
          style={viewerFrame}
        />
      </section>
    </main>
  );
}

const page: CSSProperties = {
  minHeight: '100vh',
  margin: 0,
  padding: '28px',
  boxSizing: 'border-box',
  background:
    'radial-gradient(circle at 85% 15%, rgba(255,184,108,0.22), transparent 35%), radial-gradient(circle at 10% 90%, rgba(125,211,252,0.22), transparent 40%), linear-gradient(160deg, #0b0f16 0%, #141b26 50%, #0d1117 100%)',
  color: '#e7ecf3',
  fontFamily: '"Geist Mono", "Space Mono", "Menlo", monospace',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: '18px'
};

const panel: CSSProperties = {
  borderRadius: '16px',
  border: '1px solid rgba(179, 199, 224, 0.25)',
  background: 'rgba(10, 15, 22, 0.78)',
  backdropFilter: 'blur(8px)',
  padding: '18px 20px 16px'
};

const title: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '1.2rem',
  color: '#f6fbff',
  letterSpacing: '0.02em'
};

const subtitle: CSSProperties = {
  margin: '0 0 14px',
  color: '#bdd0e8',
  maxWidth: '60ch',
  lineHeight: 1.5
};

const controls: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  alignItems: 'center'
};

const filePickerLabel: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  padding: '0 14px',
  borderRadius: '10px',
  cursor: 'pointer',
  color: '#08131e',
  background: 'linear-gradient(135deg, #d9f99d, #93c5fd)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
};

const buttonText: CSSProperties = {
  fontWeight: 700,
  fontSize: '0.82rem'
};

const hiddenInput: CSSProperties = {
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: 0,
  height: 0
};

const softButton: CSSProperties = {
  minHeight: '40px',
  padding: '0 14px',
  borderRadius: '10px',
  border: '1px solid rgba(186, 203, 224, 0.35)',
  background: 'rgba(150, 176, 209, 0.14)',
  color: '#d9e6f8',
  fontFamily: 'inherit',
  fontWeight: 600,
  cursor: 'pointer'
};

const linkButton: CSSProperties = {
  minHeight: '40px',
  padding: '0 14px',
  borderRadius: '10px',
  border: '1px solid rgba(125, 211, 252, 0.45)',
  color: '#d5f1ff',
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontWeight: 600,
  background: 'rgba(56, 189, 248, 0.12)'
};

const statusText: CSSProperties = {
  margin: '12px 0 0',
  color: '#c8d8eb',
  fontSize: '0.88rem'
};

const viewerShell: CSSProperties = {
  minHeight: '68vh',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid rgba(179, 199, 224, 0.28)',
  background: 'rgba(7, 10, 16, 0.82)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)'
};

const viewerFrame: CSSProperties = {
  display: 'block',
  width: '100%',
  height: '100%',
  minHeight: '68vh',
  border: 'none',
  backgroundColor: '#0d1117'
};

createRoot(document.getElementById('root')!).render(<App />);
