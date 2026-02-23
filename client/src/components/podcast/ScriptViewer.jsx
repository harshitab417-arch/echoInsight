const ScriptViewer = ({ script }) => {
  if (!script) return null;

  const lines = script.split('\n').filter(line => line.trim());
  
  const parseScript = () => {
    const parsed = [];
    lines.forEach(line => {
      if (line.startsWith('Speaker A:')) {
        parsed.push({ speaker: 'A', text: line.replace('Speaker A:', '').trim() });
      } else if (line.startsWith('Speaker B:')) {
        parsed.push({ speaker: 'B', text: line.replace('Speaker B:', '').trim() });
      } else if (parsed.length > 0) {
        parsed[parsed.length - 1].text += ' ' + line.trim();
      }
    });
    return parsed;
  };

  const scriptLines = parseScript();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Podcast Script</h3>
      {scriptLines.map((line, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: line.speaker === 'A' ? 'flex-start' : 'flex-end',
            marginBottom: '20px',
            animation: `fadeIn 0.5s ease-in ${index * 0.2}s both`
          }}
        >
          <div
            style={{
              maxWidth: '70%',
              padding: '15px 20px',
              borderRadius: '15px',
              background: line.speaker === 'A' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              position: 'relative'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', opacity: 0.9 }}>
              Speaker {line.speaker}
            </div>
            <div style={{ lineHeight: '1.6' }}>{line.text}</div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ScriptViewer;
