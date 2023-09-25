import { FormEventHandler, SetStateAction, useRef, useState } from 'react';

import { DefaultItemProps, ElementTypes } from '../config/Constants';
import { useDrop } from 'react-dnd';
import Container from './Container';
import FormContainer from './FormContainer';

const Canvas = () => {
  const dropbox = useRef(null);
  const incrementor = useRef(1);
  const [selectedId, onSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [, drop] = useDrop(() => ({
    accept: [ElementTypes.TEXT, ElementTypes.IMAGE],
    drop: (item: { id: number }, monitor) => {
      const initial = monitor.getInitialSourceClientOffset();
      const final = monitor.getSourceClientOffset();
      const boundRect = (dropbox.current as HTMLDivElement | null)?.getBoundingClientRect();
      if (final === null || initial === null || boundRect == null) {
        updateItems({
          id: item.id,
          top: 'auto',
          left: 'auto',
          position: 'absolute',
          type: monitor.getItemType() as string,
        });
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
      updateItems({
        id: item.id,
        top: Math.round(yPos),
        left: Math.round(xPos),
        position: 'absolute',
        type: monitor.getItemType() as string,
      });
    },
  }));
  const selectedItem = selectedId ? items.find(({ id }) => id === selectedId) : null;
  const updateItems: (item: {
    id: number;
    text?: string;
    type?: string;
    top?: number | string;
    left?: number | string;
    position?: string;
  }) => void = (item) => {
    setItems((items) => {
      const list = [...items];
      if (item.id === null) {
        const newItem = {
          ...item,
          id: incrementor.current++,
          ...DefaultItemProps[item.type as string],
        };
        list.push(newItem as never);
      } else {
        const index: number = list.findIndex(({ id }) => id === item.id);
        const newItem = {
          ...(list[index] as object),
          ...item,
        };
        list[index] = newItem as never;
      }
      return list;
    });
  };

  const configJSON = JSON.stringify(items);
  const handleFileUpload: FormEventHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = (e.target as HTMLFormElement).configJson.files[0];
    reader.readAsText(file);
    reader.onload = () => {
      const items = JSON.parse(reader.result as string);
      setItems([...items] as never[]);
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
  };
  const handleSelect: (id: null | number) => void = (id) => {
    onSelected(id as SetStateAction<null>);
  };

  return (
    <div ref={dropbox} className="relative flex flex-row">
      <div
        id="canvas"
        ref={drop}
        className="w-8/12 flex flex-row content-start p-3 gap-3 flex-wrap min-h-screen border-[2px]"
      >
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(configJSON)}`}
          download="config-json.json"
          className="block h-10 px-4 py-2 text-gray-200 bg-blue-500"
        >
          Download JSON
        </a>
        <form
          className="border-[1px] border-blue-300 block h-10"
          method="post"
          onSubmit={handleFileUpload}
        >
          <input type="file" name="configJson" accept=".json" />
          <button className="px-4 py-2 text-gray-200 bg-blue-600" type="submit">
            Save
          </button>
        </form>
        {items.map((item) => (
          <Container
            onChange={updateItems}
            onSelected={handleSelect}
            selectedId={selectedId}
            key={(item as { id: number }).id}
            {...(item as object)}
          />
        ))}
      </div>
      <aside id="form-editor" className="flex flex-col w-4/12 gap-2 p-2">
        <FormContainer onChange={updateItems} selectedItem={selectedItem} />
      </aside>
    </div>
  );
};

export default Canvas;
