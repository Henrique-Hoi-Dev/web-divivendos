import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createAccountRequest,
  getByIdAccountRequest,
  resetFormulario,
  UpdateAccountRequest } from '~/store/modules/account/actions';

export default function RegistrationAccounts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { form } = useSelector((state) => state.account);
  
  useEffect(() => {
    if (id) {
      dispatch(getByIdAccountRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      if (id) {
        dispatch(UpdateAccountRequest({ account_id: id , values: body}));
      } else {
        dispatch(createAccountRequest(values));
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  const  renderButton = { 
     display: id ? 'line-through' : 'none' 
  }

  return (
    <Container>
      <Header title="Registro/Editar Dívidendos"/>
      <div className="header-main">
        <Formik onSubmit={handleSubmit} enableReinitialize={true} initialValues={form}>
            <Form className="form-input">
              <div id="container-input" className="header-title">

                <div className="campo1">
                  <label htmlFor="name">Conta</label>
                  <Field 
                    name="name" 
                    placeholder="nome conta" />

                  <label htmlFor="data_vencimento">Data vencimento</label>
                  <Field 
                    name="data_vencimento" 
                    type="date" 
                    placeholder="data vencimento"
                    />
                    
                  
                </div>
                <div className="campo2">
                  <label htmlFor="status">Status</label>
                  <Field component="select" id="location" name="status">
                    <option value="pendente">Pendente</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="pago">Pago</option>
                  </Field>
                  <div className="buttons-container">
                    <button>
                      <Link style={renderButton} to={`/registrePortion/${id}`}>
                        Criar parcelas
                      </Link>
                    </button>
                    <button type="submit">Salvar</button>
                  </div>
                </div> 

                <footer className="footer">
                    <p>
                      <FcHighPriority />
                      Importante! <br />
                      Preencha todos os dados
                    </p>
                </footer>
              </div>
            </Form>
        </Formik>
      </div>
    </Container>
  );
}
