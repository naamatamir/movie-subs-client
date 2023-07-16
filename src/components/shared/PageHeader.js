import Typography from '@mui/material/Typography';

const PageHeader = ({ title }) => (
  <div
    className='page-header-wrapper'
  >
    <Typography
      sx={{
        color: '#845adf',
        fontSize: {
          xs: '1.7rem',
          sm: '2.1rem',
        },
        fontWeight: '600',
        padding: '1.3rem 0 1rem 0',
        textAlign: 'center',
        backgroundColor: '#f3f1f8',
      }}>
      {title}
    </Typography>
  </div>
);

export default PageHeader;
