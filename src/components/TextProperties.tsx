import { ChangeEventHandler } from 'react';

type Props = {
  selectedItem: {
    fontSize: number;
    color: string;
    id: number
  };
  onChange?: (item: {
    id: number;
    text?: string;
    type?: string;
    top?: number | string;
    left?: number | string;
    position?: string;
  }) => void;
};

const TextProperties = ({ selectedItem, onChange }: Props) => {
  const { fontSize, color, id } = selectedItem;

  const handleChange: ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e) => {
    onChange &&
      onChange({
        id,
        [e.target.name]: e.target.name === 'fontSize' ? +e.target.value : e.target.value,
      });
  };
  return (
    <form className="flex flex-col">
      <input
        className="border-[2px] border-blue-500 p-2 my-2"
        name="fontSize"
        type="number"
        value={fontSize}
        onChange={handleChange}
      />

      <select
        name="color"
        className="border-[2px] border-blue-500 p-2 my-2"
        value={color}
        onChange={handleChange}
      >
        <option value="blue">Blue</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>
    </form>
  );
};

export default TextProperties;
