/**
 * Build up our errorState based on given form fields
 */
module.exports = function (err, formFields) {
  let errors = (err) ? err.response.body.errors : null
  let errorsState = {}

  if (errors && err.response.body.code !== 'api.error.validation') {
    throw new Error(`Unhandled error code [${err.response.body.code}]`)
  }

  // Build up the error state
  formFields.map(field => {
    // we have an error
    if (errors && errors[field]) {
      errorsState[field] = {
        type: 'error',  // '', 'success', 'warning', 'error' or 'validating'
        message: errors[field][0]
      }
      if (errors[field].length > 1) {
        // console.error('TODO - handle errors when we have more than one')
      }
    } else {
      // no error
      errorsState[field] = {
        type: '',  // '', 'success', 'warning', 'error' or 'validating'
        message: ''
      }
    }
    // err[]
  })

  return errorsState
}