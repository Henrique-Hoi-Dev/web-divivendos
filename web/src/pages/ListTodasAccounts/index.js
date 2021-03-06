import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import * as moment from 'moment';

import { connect, useDispatch } from 'react-redux';
import {
  findAllAccountRequest,
  deleteAccountRequest,
  deletePortionRequest
} from '../../store/modules/account/actions';

import { Container } from './styles';
import Header from '../../components/HeaderListAndRegister';
import Card from '~/components/Card';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

const ListTodasAccounts = ({ accountList, handlerRemoveAccount, handlerRemovePortion }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    function onLoad() {
      dispatch(findAllAccountRequest());
    }
    onLoad();
  }, [dispatch]);

  //formatção do preço do produto
  function currencyFormat(num) {
    if (num) {
      return (
        'R$' +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const wrapper = React.createRef();
    const classes = useRowStyles();
  
    return (
      <React.Fragment >
        <TableRow className={classes.root} ref={wrapper}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{row.name}</TableCell>
          <TableCell align="right">{moment(row.date_expired).format('DD/MM/YYYY')}</TableCell>
          <TableCell align="right" 
                    style={{ color: (row.status === 'pending' && 'red') || 
                    (row.status === 'paid' && 'green') || 
                    (row.status === 'cencelled' && 'black')}}
        >
            {(row.status === 'pending' && 'Pendente') || 
             (row.status === 'paid' && 'Pago') || 
             (row.status === 'cencelled' && 'Cancelado')}
            </TableCell>
          <TableCell component="th" scope="row">{currencyFormat(row.total_cost)}</TableCell>
          <TableCell align="right">
            <button>
              <Link to={`/account/${row.id}`}>
                <BiEdit />
              </Link>
            </button>
          </TableCell>
          <TableCell align="right">
            <button
              onClick={(e) => handlerRemoveAccount(e, row.id)}>
              <FcEmptyTrash />
            </button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Parcelas
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Valor</TableCell>
                      <TableCell>N Parcela</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Data Vencimento</TableCell>
                      <TableCell align="center">Editar</TableCell>
                      <TableCell align="center" color="#fff">Excluir</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {[].concat(row.portion).map((portions, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{currencyFormat(portions.price)}</TableCell>
                      <TableCell>{portions.number_portion}</TableCell>
                      <TableCell  align="right" style={{ color: 
                      (portions.paid === true && 'green') || 
                      (portions.paid === false && 'red') }} >
                      {(portions.paid === true && 'Pago') || 
                       (portions.paid === false && 'Devendo')}
                      </TableCell>
                      <TableCell align="right">{moment(portions.date_expired).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align="right">
                        <button>
                          <Link to={`/portion/${portions.id}`}>
                            <BiEdit />
                          </Link>
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        <button
                          onClick={(e) => handlerRemovePortion(e, portions.id)}>
                          <FcEmptyTrash />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Header title="Lista Dívidendos"/>
      <Card />

      <div className="header-main">
        <form className="form-table">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Data Registro</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Valor total</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {[].concat(accountList).map((contas, i) => (
                    <Row key={i} row={contas} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>        
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    accountList: state.account.accountList.responseData ? state.account.accountList.responseData : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerRemoveAccount: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja remover esse conta?'
      );
      if (confirm) {
        dispatch(deleteAccountRequest(id));
      }
    },
    handlerRemovePortion: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja remover esse parcela?'
      );
      if (confirm) {
        dispatch(deletePortionRequest(id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTodasAccounts);
