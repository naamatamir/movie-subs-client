import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';

const Card = ({
  className,
  minHeight,
  contentClassName,
  contentSx,
  children,
  minWidth
}) => {
  return (
    <>
      <MuiCard
        className={className}
        sx={{
          minWidth: 330,
          maxWidth: 330,
          minHeight: minHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '10px',
          ...contentSx,
        }}>
        {' '}
        <CardContent
          className={contentClassName}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', 
            textAlign: 'center',
            padding: '28px', 
          }}>
          {children}
        </CardContent>
      </MuiCard>
    </>
  );
};

export default Card;
