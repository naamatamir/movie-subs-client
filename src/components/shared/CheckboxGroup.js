import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const CheckboxGroup = ({ userPermissions, onCheckChange }) => {
  const [checkedPermissions, setCheckedPermissions] = useState(userPermissions);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const permissions = [
    {
      category: 'Subscriptions',
      actions: [
        'viewSubscriptions',
        'createSubscription',
        'updateSubscription',
        'deleteSubscription',
      ],
    },
    {
      category: 'Movies',
      actions: ['viewMovies', 'createMovie', 'updateMovie', 'deleteMovie'],
    },
  ];

  const actionMapping = {
    view: 'View',
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
  };

  const getActionLabel = (action) => {
    return actionMapping[action.split(/(?=[A-Z])/)[0]] || action;
  };

  const handleCheckChange = (e) => {
    const permission = e.target.value;
    let newCheckedPermissions = [];
    if (e.target.checked) {
      newCheckedPermissions = [...checkedPermissions, permission];
    } else {
      newCheckedPermissions = checkedPermissions.filter((perm) => perm !== permission);
    }
    setCheckedPermissions(newCheckedPermissions);
    onCheckChange(newCheckedPermissions); 
  };

  useEffect(() => {
    setCheckedPermissions(userPermissions);
  }, [userPermissions]);

  return (
    <Grid
      className='permissions-grid-container'
      container
      direction='column'
      spacing={1}
      sx={{ justifyContent: 'center', height: matches ? 'auto' : '35vh' }}>
      {permissions.map(({ category, actions }) => (
        <Grid
          className='permissions-grid-item'
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
              margin: '0 auto',
            },
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={category}>
          <Typography
            variant='p'
            gutterBottom
            sx={{
              width: { xs: '100%', sm: '150px' },
              textAlign: 'center',
              color: '#989696',
            }}>
            {category}
          </Typography>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: '10px',
              flex: 1,
            }}>
            {actions.map((action) => {
              const isChecked = checkedPermissions.includes(action);
              const displayLabel = getActionLabel(action);
              return (
                <FormControlLabel
                  key={action}
                  sx={{ color: '#989696' }}
                  control={
                    <Checkbox
                      value={action}
                      checked={isChecked}
                      onChange={handleCheckChange}
                    />
                  }
                  label={displayLabel}
                />
              );
            })}
          </FormGroup>
        </Grid>
      ))}
    </Grid>
  );
};

export default CheckboxGroup;
