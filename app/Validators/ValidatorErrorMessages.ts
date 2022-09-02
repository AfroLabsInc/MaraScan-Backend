const messages = {
  required: '{{field}} is required',
  requiredIfNotExists: '{{field}} is required',
  email: 'Please enter a valid {{field}} address',
  array: '{{field}} must be an array',
  exists: '{{field}} does not exist',
  unique: 'User with such {{field}} already exists',
  mobile: 'Please enter a valid {{field}}',
  minLength: 'The {{field}} field must have a minimum of {{options.minLength}} items',
  enum: 'The value of {{field}} must be one of {{ options.choices }}',
  size: 'The file size must be under {{options.size}}',
  extnames: 'The file must have one of {{ options.extnames }} extension names',
  confirmed: 'Confirm password must be same as password',
}

export default messages
