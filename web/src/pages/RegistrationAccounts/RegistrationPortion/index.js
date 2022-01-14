import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createPortionRequest,
  getByIdPortionRequest,
  resetFormulario,
  UpdatePortionRequest } from '~/store/modules/portion/actions';

export default function RegistrationPortion() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const  { form }  = useSelector((state) => state.portion);
  console.log(form)
  
  useEffect(() => {
    if (id) {
      dispatch(getByIdPortionRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      if (form.responseData.number_portion) {
        dispatch(UpdatePortionRequest({ id: id , values: body}));
      } else {
        dispatch(createPortionRequest(values, id));
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  return (
    <Container>
      <Header title="Registro/Editar Parcelas"/>
      <div className="header-main">
        <Formik onSubmit={handleSubmit} enableReinitialize={true} initialValues={form.responseData} >
            <Form className="form-input">
              <div id="container-input" className="header-title">

                <div className="campo1">
                  <label htmlFor="price">Valor Parcela</label>
                  <Field 
                    name="price" 
                    placeholder="valor" />
                  <label htmlFor="number_portion">Número Parcela</label>
                  <Field 
                    name="number_portion" 
                    placeholder="numero" />
                </div>

                <div className="campo2">
                  <label htmlFor="date_expired">Data vencimento</label>
                  <Field 
                    name="date_expired" 
                    type="date" /> 
                  <label htmlFor="paid">Status</label>
                  <Field component="select" id="location" name="paid">
                    <option value="false">Devendo</option>
                    <option value="true">Pago</option>
                  </Field>
                </div>              
                <footer className="buttons-container">
                    <p>
                      <FcHighPriority />
                      Importante! <br />
                      Preencha todos os dados
                    </p>
                  <button type="submit">Salvar</button>
                </footer>
              </div>
            </Form>
        </Formik>
      </div>
    </Container>
  );
}
