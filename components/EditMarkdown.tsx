// components/EditMarkdown.tsx
import React from 'react';

type Props = { initial?: string };

export default function EditMarkdown({ initial = '' }: Props) {
  const [value, setValue] = React.useState(initial);

  return (
    <div style={{marginTop:12}}>
      <label style={{display:'block',fontWeight:600,marginBottom:6}}>Edit (Markdown)</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={8}
        style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #e6eef0'}}
      />
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button className="btn" onClick={() => alert('Save handler - POST to API')}>
          Save
        </button>
        <button className="btn" onClick={() => { setValue(''); }}>
          Reset
        </button>
      </div>
    </div>
  );
}
