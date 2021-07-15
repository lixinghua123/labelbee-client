import React, { useState, useRef } from 'react';
import { EIpcEvent } from '../../constant/event';
import { AnnotationContext } from '../../store';
const electron = window.require && window.require('electron');

interface IProps {
  // path: string;
  onChange?: (value: any) => void;
}

const SelectFolder: React.FC<IProps> = ({ onChange }) => {
  const [path, setPath] = useState('');
  const pathRef = useRef<HTMLInputElement>(null);
  const { dispatch } = React.useContext(AnnotationContext);

  const openDir = () => {
    const ipcRenderer = electron && electron.ipcRenderer;
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SelectDirectory);
      ipcRenderer.once(EIpcEvent.SelectedDirectory, function (event: any, paths: any) {
        setPath(paths[0]);

        if (pathRef.current !== null) {
          pathRef.current.value = paths[0];
        }

        if (onChange) {
          onChange(paths[0]);
        }
      });
    }
    // 具体的图片
  };

  return (
    <div>
      <button onClick={openDir}>选择文件夹</button>
      {path}
      <input style={{ visibility: 'hidden' }} ref={pathRef} />
    </div>
  );
};

export default SelectFolder;
