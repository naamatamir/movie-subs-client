import { Button as MuiButton } from '@mui/material';
import Typography from '@mui/material/Typography';

const Button = ({
  type,
  children,
  color,
  bgColor,
  hoverColor,
  textColor,
  size,
  onClick,
  fullWidth,
  fontWeight,
  startIcon,
  paddingVertical,
 
}) => {
  const allowedSizes = ['small', 'medium', 'large'];
  const sizeClass = allowedSizes.includes(size) ? size : 'medium';

  //*!check */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  
  return (
    <MuiButton
      type={type}
      variant='contained'
      // color={color}
      size={sizeClass}
   
      sx={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '10px',
        textTransform: 'none',
        width: fullWidth ? '100%' : 'auto',
        paddingTop: paddingVertical ? '15px' : undefined,
        paddingBottom: paddingVertical ? '15px' : undefined,
        backgroundColor: bgColor,
        '&:hover': {
          backgroundColor: hoverColor
        },
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      startIcon={startIcon}>
      <Typography
         color= {textColor}
        sx={{
         color:'white',
          letterSpacing: '1px',
          fontWeight: { fontWeight },
        }}
        >
        {children}
      </Typography>
    </MuiButton>
  );
};

export default Button;
