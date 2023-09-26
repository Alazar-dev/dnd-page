import { FormEventHandler, SetStateAction, useRef, useState } from 'react';
import { create } from 'zustand';
import {Button} from './ui/button.tsx'

import { ElementTypes } from '../config/Constants';
import { useDrop } from 'react-dnd';
import Container from './Container';
import FormContainer from './FormContainer';

const useItemStore = create((set) => ({
  items: [],
  updateItem: (id, top, left, position) => set((state) => ({
    items: state.items.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          top: top,
          left: left,
          position: position,
        };
      }
      return item;
    }),
  })),
  updateItems: (newItems) => set(() => ({
    items: newItems,
  })),
}));

const Canvas = () => {
  const dropbox = useRef(null);
  const [selectedId, onSelected] = useState(null);
  const { items, updateItem, updateItems } = useItemStore();

  const [, drop] = useDrop(() => ({
    accept: [ElementTypes.TEXT, ElementTypes.IMAGE],
    drop: (item: { id: number }, monitor) => {
      const initial = monitor.getInitialSourceClientOffset();
      const final = monitor.getSourceClientOffset();
      const boundRect = (dropbox.current as HTMLDivElement | null)?.getBoundingClientRect();
      if (final === null || initial === null || boundRect == null) {
        updateItem(
          item.id,
          'auto',
          'auto',
          'absolute',
          // monitor.getItemType() as string,
        );
        return;
      }
      const yPos =
        final.y > initial.y
          ? initial.y + (final.y - initial.y) - boundRect?.y
          : initial.y - (initial.y - final.y) - boundRect?.y;
      const xPos =
        final.x > initial.x
          ? initial.x + (final.x - initial.x) - boundRect.x
          : initial.x - (initial.x - final.x) - boundRect.x;
      updateItem(
        item.id,
        Math.round(yPos),
        Math.round(xPos),
        'absolute',
        // monitor.getItemType() as string,
      );
    },
  }));

  const selectedItem = selectedId ? items.find(({ id }) => id === selectedId) : null;
  const configJSON = JSON.stringify(items);
  const handleFileUpload: FormEventHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = (e.target as HTMLFormElement).configJson.files[0];
    reader.readAsText(file);
    reader.onload = () => {
      const items = JSON.parse(reader.result as string);
      updateItems([...items] as never[]);
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
  };
  const handleSelect: (id: null | number) => void = (id) => {
    onSelected(id as SetStateAction<null>);
  };

  return (
    <div ref={dropbox} className='relative flex flex-row'>
      <div
        id='canvas'
        ref={drop}
        className='w-8/12 flex flex-row content-center justify-center p-3 gap-3 flex-wrap min-h-screen border-[2px]'
      >
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(configJSON)}`}
          download='config-json.json'
          className='block h-10 px-4 py-2 text-gray-200 bg-gray-800'
        >
          Download JSON
        </a>
        <form
          className='border-[1px] border-blue-300 block h-10'
          method='post'
          onSubmit={handleFileUpload}
        >
          <input type='file' name='configJson' accept='.json' />
          <Button type="submit" className="bg-gray-700">
            Save
          </Button>
        </form>
        {items.map((item) => (
          <Container
            onChange={updateItem}
            onSelected={handleSelect}
            selectedId={selectedId}
            key={(item as { id: number }).id}
            {...(item as object)}
          />
        ))}
      </div>
      <aside id='form-editor' className='flex flex-col w-4/12 gap-2 p-2'>
        <FormContainer onChange={updateItem} selectedItem={selectedItem} />
      </aside>
    </div>
  );
};

export default Canvas;
