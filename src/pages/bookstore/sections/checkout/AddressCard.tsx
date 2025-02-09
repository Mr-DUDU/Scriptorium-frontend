// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '@components/organisms/bookstore/MainCard';

// types
import { Address } from 'src/types/e-commerce';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';

// ==============================|| CHECKOUT - ADDRESS CARD ||============================== //

interface AddressCardProps {
  address: Address | null;
  change?: boolean;
  handleClickOpen?: (billingAddress: Address) => void;
  billingAddressHandler?: (billingAddress: Address) => void;
}

export default function AddressCard({ address, change, handleClickOpen, billingAddressHandler }: AddressCardProps) {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        '&:hover': {
          boxShadow: theme.customShadows.primary
        },
        cursor: 'pointer'
      }}
      onClick={() => {
        if (billingAddressHandler && address) {
          billingAddressHandler(address);
        }
      }}
    >
      {address && (
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1">{address.line1}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  ({address.label})
                </Typography>
                {address.defaultAddress && (
                  <Chip sx={{ color: 'primary.main', bgcolor: 'primary.lighter', borderRadius: '10px' }} label="Default" size="small" />
                )}
              </Stack>
              {change && (
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<EditOutlined />}
                  onClick={() => {
                    if (handleClickOpen) {
                      handleClickOpen(address);
                    }
                  }}
                >
                  Change
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                {`${address.line2}, ${address.line1}, ${address.city}, ${address.state}, ${address.country} - ${address.zipCode}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {address.phoneNumber}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
}
