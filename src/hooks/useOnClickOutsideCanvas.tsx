import { RefObject } from 'react';

import { useEventListener } from 'usehooks-ts';

type Handler = (event: MouseEvent) => void;

function useOnClickOutsideCanvas<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  canvas: string,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, (e) => {
    const el = ref?.current;
    const isInsideCanvas = !!(e.target as HTMLElement).closest(`#${canvas}`);
    if (isInsideCanvas && (!el || !el.contains(e.target as Node))) {
      handler(e);
    } else {
      return;
    }
  });
}

export default useOnClickOutsideCanvas;
