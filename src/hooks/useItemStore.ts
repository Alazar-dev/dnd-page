import { create } from 'zustand';

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

export default useItemStore;
