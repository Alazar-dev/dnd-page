import { ElementTypes } from '../config/Constants';
import TextProperties from './TextProperties';

type Props = {
  selectedItem?: {
    fontSize: number;
    color: string;
    type: string;
    id: number;
  } | null;
  onChange?: (item: {
    id: number;
    type?: string;
    top?: number | string;
    left?: number | string;
    position?: string;
  }) => void;
};

const FormContainer = (props: Props) => {
  const { selectedItem, onChange } = props;

  if (selectedItem !== undefined && selectedItem !== null) {
    switch (selectedItem.type) {
      case ElementTypes.TEXT:
        return <TextProperties onChange={onChange} selectedItem={selectedItem} />;
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default FormContainer;
