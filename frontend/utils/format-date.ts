// Formata uma string "yyyy-mm-dd" em "dd/mm/yyyy"
export function formatHyphenStringDate(date: string) {
  if(date == '') return ''

  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

// Formata uma string ISO em "dd/mm/yyyy"
export function formatISOStringDate(strDate: string) {
  const date = new Date(strDate)

  const formatFormula = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC'
  })

  return formatFormula.format(date)
}