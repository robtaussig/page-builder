import React from 'react';
import { Modal } from '@material-ui/core';
import ElementBuilder from './element-builder';

export const ElementBuilderModal = React.memo(({ open = true, onClose, onSetContent }) => {

  return (
    <Modal
      onClose={onClose}            
      open={open} 
      label={'Element-builder'}
    >
      <ElementBuilder
        onClose={onClose}
        onSubmit={onSetContent}
      />
    </Modal>
  );
});

export default ElementBuilderModal;