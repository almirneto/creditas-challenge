export const checkFormValidity = formElement => formElement.checkValidity();

/**
 * Gets the form values.
 *
 * @param      {DOMObject}   formElement  The form element
 * @return     {Object}  The form values.
 */
const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

/**
 * Converts to string the form values gotten by object
 *
 * @param      {<type>}   values  The values
 * @return     {Promise}  Description about the calculator
 */
const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const IOF = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const TIME = values.find(match('parcelas')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value

  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`.concat(
      `\nTotal ${(IOF + INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT}`
    )
}

/**
 * Sends form.
 *
 * @param      {Object}   values  The values to send
 * @return     {Promise}  Promise containing the values converted
 */
const send = (values) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Default function (submit) to export to other files.
 *
 * @param      {DOMObject}  formElement  The form element
 */
export const submit = (formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}