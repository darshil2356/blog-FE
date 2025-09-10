// components/EditMarkdown.lazy.tsx
import dynamic from 'next/dynamic';

// This dynamically loads a lightweight markdown editor or a textarea editor.
// For demo we can load a simple client-only component.

export default dynamic(() => import('./EditMarkdown'), {
  ssr: false,
  loading: () => <div style={{padding:12}}>Loading editor…</div>,
});
