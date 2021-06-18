
export const defaultUnit = {
  label: '',
  description: '',
  multiplicity: 1,
  parentId: 0
}

export const UNIT = `
    id
    ${Object.keys(defaultUnit).join(',')}
`;
