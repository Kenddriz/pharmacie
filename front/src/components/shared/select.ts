
export type SelectOption = {
  label: string;
  value: number;
}

export const makeOptions = (data: unknown[]):SelectOption[] => {
  const options: SelectOption[] = [];
  data.forEach((d: any) => {
    options.push({
      label: d.label||d.designation,
      value: d.id
    })
  });
  return options;
}
