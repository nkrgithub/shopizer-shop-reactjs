import React from 'react';

export const QrFormErrors = ({qrFormErrors}) =>
  <div className='qrFormErrors'>
    {Object.keys(qrFormErrors).map((fieldName, i) => {
      if(qrFormErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {qrFormErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
