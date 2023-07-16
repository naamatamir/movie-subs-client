import { TextField as MuiTextField } from '@mui/material'

const TextField = ({ label, name, type, value, onChange, required, fullWidth = true }) => {
  const id = `${name}-field`
  return (
    <MuiTextField
      id={id}
      type={type}
      variant='outlined'
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth={fullWidth}
      aria-describedby={`${id}-helper-text`}
    />
  )
}

export default TextField
