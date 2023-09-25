export const ElementTypes = {
  TEXT: 'text',
  IMAGE: 'image'
}

export const DefaultItemProps = {
  [ElementTypes.TEXT]: {
    fontSize: 20,
    color: 'red',
    position: 'absolute'
  },
  [ElementTypes.IMAGE]: {
    alt: "Some Image"
  }
}