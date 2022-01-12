import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { actionUploadFile } from '../../store/types/playerTypes';

export const Dropzone = () => {
  const dispatch = useDispatch();
  const onDrop = useCallback(acceptedFiles => {
    dispatch(actionUploadFile(acceptedFiles[0]));
    console.log(acceptedFiles);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag drop some files here, or click to select files</p>
      }
    </div>
  );
};
