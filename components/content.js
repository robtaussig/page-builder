import React from 'react';

export const Content = React.memo(({ content = {}, onClick }) => {

  const text = content.text || '';

  return (
    <div style={{ height: '100%', width: '100%' }} onClick={onClick}>
      {text}
    </div>
  );
});

export default Content;