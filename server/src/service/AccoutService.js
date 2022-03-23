import Account from "../app/models/Account";
import Portion from "../app/models/Portion";
import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {
    let result = {}
    try {
      const createAccounts = await Account.create(req)

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: createAccounts}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result
    }
  }, 
  async index() {
    let result = {}
    try {
      const account = await Account.findAll({
        order: [['date_expired', 'ASC']],
        include: [
          {
            model: Portion,
            as: 'portion',
            order: [['number_portion', 'ASC']],
            separate: true,
            attributes: [ 'id', 'account_id', 'price', 'number_portion', 
                          'date_expired', 'paid' ],
          },
        ],
      });

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: account}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result
    }
  },
  async getId(req, res) {
    let result = {}
    try {
      let account = await Account.findByPk(req.id, {
        include: [
          {
            model: Portion,
            as: 'portion',
            order: [['number_portion', 'ASC']],
            separate: true,
            attributes: [ 'id', 'account_id', 'price', 'number_portion', 
                          'date_expired', 'paid' ],
          },
        ],
      });

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: account}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result
    }
  },
  async update(req, res){
    let result = {}
    try {
      const accountUp = await Account.findByPk(req.id)
      const accounts = await Account.findAll({ 
        where: { id: req.id}, 
        include: {
            model: Portion,
            as: 'portion',
            order: [['number_portion', 'ASC']],
            separate: true,
          },
      });
      const soma = accounts.map((result) => {
        const res = result.dataValues.portion
          const valor = res.map((resultValor) => {
            const prices = parseInt(resultValor.dataValues.price);
            return prices
          })
          const total = valor.reduce((acumulado, x) => {
            return acumulado + x;
          });
        return total
      })
      const { name, status, date_expired } = res
      const total_cost = (soma - 0)
      const account = { name, status, date_expired, total_cost }
      
      await accountUp.update(account);

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: accountUp}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result
    }
  },
  async destroy(req, res) {
    let result = {}
    try {
      const account = await Account.destroy({
        where: {
          id: req.id,
        },
      });

      if (!account) {
        return res.status(400).json({ message: 'Account not found' });
      }

      result = {httpStatus: httpStatus.OK, status: "successful", responseData: account}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", responseData: error}      
      return result
    }
  },
}