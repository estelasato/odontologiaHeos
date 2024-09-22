
export function handleSearch(text: any) { // normaliza texto de bussca

  return text?.toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function FilterList(list: any[], item: string, fields: string[] = ['nome']){
  if (list.length > 0 && item) {
    const result = list?.filter((data) => {
      return fields?.some((field) => handleSearch(data[field])?.includes(handleSearch(item)));
      // return handleSearch(field ? data[`${field}`] : data.nome).includes(handleSearch(item));
    });
    console.log(result)
    return result
  }
}
