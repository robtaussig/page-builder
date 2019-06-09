import React from 'react';
import X from 'react-feather/dist/icons/x';

export const DeleteButton = React.memo(({ onClick }) => {

  return (
    <button onClick={onClick} style={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: 20,
      width: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}>
      <X
        size={12}
        color={'white'}
      />
    </button>
  );
});

export default DeleteButton;