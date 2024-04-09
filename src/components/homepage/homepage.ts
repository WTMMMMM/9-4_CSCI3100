
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
export const HomeMUI = styled.div
const HomeContainer = styled(Container)(({ theme }: any) => ({
  maxWidth: 400,
  margin: '50px auto',
  padding: theme.spacing(2.5),
  border: '1px solid #ddd',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

const HomeTitle = styled(Typography)({
  textAlign: 'center',
  color: '#333',
  marginBottom: 30,
});

const HomeParagraph = styled(Typography)({
  textAlign: 'center',
  color: '#666',
  marginBottom: 15,
});

const HomeButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  '& button': {
    width: '100%',
    padding: 10,
    border: 'none',
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));


