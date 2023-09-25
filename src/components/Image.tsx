import placeholderImage from '../assets/Placeholder.svg';
import { ConnectDragPreview, ConnectDragSource, useDrag } from 'react-dnd';
import { ElementTypes } from '../config/Constants';

type Props = {
  id?: number | null;
  src?: string;
  alt?: string;
  position?: 'static' | 'absolute';
  left?: number | string;
  top?: number | string;
  isSelected?: boolean;
};

const Image = ({
  id = null,
  src,
  alt = 'placeholder image',
  left = 'auto',
  top = 'auto',
  position = 'static',
}: Props) => {
  src = src ? src : placeholderImage;
  alt = alt ? alt : 'Placeholder';
  const [{ isDragging }, drag]: [{ isDragging: boolean }, ConnectDragSource, ConnectDragPreview] =
    useDrag(() => ({
      type: ElementTypes.IMAGE,
      item: { src, alt, left, top, position, id, type: ElementTypes.IMAGE },
    }));
  return (
    <div>
      <img
        ref={drag}
        src={src}
        alt={alt}
        style={{
          width: '100px',
          height: 'auto',
          position: position,
          opacity: isDragging ? 0.5 : 1,
          left: left,
          top: top,
        }}
      />
    </div>
  );
};

export default Image;
