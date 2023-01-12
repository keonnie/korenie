/**
 * Parse all the template literals variable
 * in a string to their equivalent provided
 * @param {String} str
 * @param {{*}} obj
 * @returns {String}
 */
export function parseLiterals(str, obj = {}) {
  let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/)
  let args = str.match(/[^{}]+(?=})/g) || []
  let parameters = args.map((argument) => obj[argument] ?? '')
  return String.raw({ raw: parts }, ...parameters)
}
