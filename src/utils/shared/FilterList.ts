
export function handleSearch(text: any) { // normaliza texto de bussca

  return text?.toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function FilterList(list: any[], item: string, fields: string[] = ['nome']){
  console.log(list, item, fields)
  if (list.length > 0 && item) {
    const result = list?.filter((data) => {
      return fields?.some((field) => handleSearch(data[field])?.includes(handleSearch(item)));
      // return handleSearch(field ? data[`${field}`] : data.nome).includes(handleSearch(item));
    });
    return result
  }
}

export function handleExist (list: any[], value: string, field: string = 'nome') {
  // const result = FilterList(list, value, [field]);
  if (list.length > 0 && value) {
    const result = list?.filter((d) => {
      return handleSearch(d[field]) === handleSearch(value);
    })
    if (result && result.length > 0) {
     return true
    }
  } return false
}
