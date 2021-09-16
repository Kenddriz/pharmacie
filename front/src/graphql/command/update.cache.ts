
export const deleteCommandCache = (existingRef: any, readField: (id: string, eRef: any) => any, id: number) => {
  return {
    ...existingRef,
    items: existingRef.items.filter((eRef: any) => readField('id', eRef) !== id)
  }
}
