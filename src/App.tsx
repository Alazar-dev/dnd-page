import { useRef, useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import './App.css';
import Canvas from './components/Canvas';
import Image from './components/Image';
import Text from './components/Text';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useItemStore from './hooks/useItemStore';
import { ElementTypes } from './config/Constants';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex flex-row gap-8'>
        <Sidebar />
        <div className='w-10/12 px-2'>
          <Canvas />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
