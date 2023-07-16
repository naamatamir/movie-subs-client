import { Container as MuiContainer } from '@mui/material';

const Container = ({ height, children, className }) => {
  return (
    <MuiContainer
    className={className}
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: height
          || 'auto'
        ,
        bgcolor: 'background.default',
        '& > :not(style)': { m: 1.2, width: '23ch', height: 52 },
        '@media (max-width: 599px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}>
      {children}
    </MuiContainer>
  );
};

export default Container;
