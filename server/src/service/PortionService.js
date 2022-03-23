import * as Yup from 'yup';
import Account from "../app/models/Account";
import Portion from "../app/models/Portion";
import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {
    let result = {}
    let { price, number_portion, date_expired, paid } = res;
    let account_id = req.account_id

    try {
      const schema = Yup.object().shape({
        price: Yup.number().required(),
        number_portion: Yup.number().required(),
      });

      if (!(await schema.isValid(res))) { 
        return res.status(400).json({ error: 'Complete todos os campos' });
      }

      const account = await Account.findByPk(account_id);
     
      if (!account) {
        return res.status(400).json({ error: 'Account not found' });
      }

      const NumeroParcelaExists = await Account.findByPk(account_id, {
        include: [
          {
            model: Portion,
            as: 'portion',
            where: { number_portion: number_portion },
          },
        ],
      });

      if (NumeroParcelaExists) {
        return res
          .status(400)
          .json({ error: 'This installment number already exists.' });
      }

      const portion = await Portion.create({
        price,
        number_portion,
        date_expired,
        paid,
        account_id,
      });
      
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: portion}      
      return result;
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result;
    }
  },
  async getPortionDetailsWithValeuAll(req, res) {
    let result = {}
    try {
      const portion = await Portion.findAndCountAll({
        where: { account_id: req.account_id },
        order: [['number_portion', 'ASC']],
      });

      const accounts = await Portion.findAll({ where: { account_id: req.account_id } });

      const valid = accounts.filter(function (result) {
        return result.dataValues;
      });

      const resultValue = valid.map(function (result) {
        const valor = parseInt(result.dataValues.price);
        return valor;
      });

      const total = resultValue.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {httpStatus: httpStatus.OK, status: "successful", portion, total}      
      return result;
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result;
    }
  },
  async getId(req, res) {
    let result = {}
    try {
      let portion = await Portion.findByPk(req.id);

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: portion}      
      return result;
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result;
    }
  },
  async update(req, res) {
    let result = {}
    try {
      const schema = Yup.object().shape({
        price: Yup.number().required(),
      });

      if (!(await schema.isValid(res))) {
        return res.status(400).json({ error: 'Validation failed' });
      }
      const portion = await Portion.findByPk(req.id);

      await portion.update(res);

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: portion}      
      return result;
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result;
    }
  },
  async destroy(req, res) {
    let result = {}
    try { 
      const portion = await Portion.destroy({
        where: {
          id: req.id,
        },
      });

      if (!portion) {
        return res.status(400).json({ message: 'Account not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: portion}      
      return result;
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result
    }
  }
}