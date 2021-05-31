
export type SelectOption = {
  label: string;
  value: string;
}

export const makeOptions = (data: unknown[]):SelectOption[] => {
  const options: SelectOption[] = [];
  data.forEach((d: any) => {
    options.push({
      label: d.label,
      value: d.id
    })
  });
  return options;
}
