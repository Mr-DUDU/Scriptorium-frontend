import { sum } from 'lodash';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';

// types
import { CartProductStateProps } from 'src/types/cart';

// project import
import { useGetCart } from 'src/api/bookstore/cart';

// assets
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

export default function FloatingCart() {
  const theme = useTheme();

  const { cart } = useGetCart();

  let totalQuantity: number = 0;
  if (cart && cart.products && cart.products.length > 0) {
    totalQuantity = sum(cart.products.map((item: CartProductStateProps) => item.quantity));
  }

  return (
    <Fab
      component={Link}
      to="/checkout"
      size="large"
      sx={{
        top: '75%',
        position: 'fixed',
        right: 0,
        zIndex: theme.zIndex.speedDial,
        boxShadow: theme.customShadows.primary,
        bgcolor: 'primary.lighter',
        color: 'primary.main',
        borderRadius: '25%',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        '&:hover': {
          bgcolor: 'primary.100',
          boxShadow: theme.customShadows.primary
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.dark}`,
          outlineOffset: 2
        }
      }}
    >
      <Badge showZero badgeContent={totalQuantity} color="error">
        <ShoppingCartOutlined style={{ color: theme.palette.primary.main, fontSize: '1.5rem' }} />
      </Badge>
    </Fab>
  );
}
