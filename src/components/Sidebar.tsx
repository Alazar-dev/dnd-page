import { FormEventHandler, SetStateAction, useRef, useState } from 'react';
import { ElementTypes } from '../config/Constants';
import { useDrop } from 'react-dnd';
import Container from './Container';
import useSidebarStore from '../hooks/useSidebarStore';

const Sidebar = () => {
  const dropbox = useRef(null);
  const [selectedId, onSelected] = useState(null);
  const { items, updateItem, updateItems } = useSidebarStore();

  const [drag, drop] = useDrop(() => ({
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
    <aside ref={dropbox} className='relative flex flex-row w-2/12'>
      <div
        id='canvas'
        ref={drop}
        className='w-[1000px]'
      >
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
    </aside>
  );
};

export default Sidebar;
