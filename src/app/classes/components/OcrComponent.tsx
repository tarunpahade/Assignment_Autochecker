import React from 'react';

interface OCRComponentProps {
    handleImageUpload: any,
    isLoading: any,
    text: string
} 


const OCRComponent = ({handleImageUpload}:OCRComponentProps ) => {
  
  return (
    <div>
      <input
        type="file"
        placeholder='Uplaoad Image'
        accept="image/*"
        onChange={handleImageUpload}
        id="fileInput"
        
      />
    </div>
  );
};

export default OCRComponent;
