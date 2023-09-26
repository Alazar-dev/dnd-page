import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  items: [  {
    "id": 1,
    "text": "Test",
    "type": "text",
    "top": 20,
    "left": 10,
    "position": "absolute"
  },
    {
      "id": 5,
      "src": "",
      "type": "image",
      "top": 80,
      "left": 10,
      "position": "absolute"
    },],
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

export default useSidebarStore;
