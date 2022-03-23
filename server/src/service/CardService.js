import Account from "../app/models/Account";
import Portion from "../app/models/Portion";
import httpStatus from 'http-status-codes';

export default {
  async getCardTotalDetails(req, res) {
    let result = {}
    try {
      const accounts = await Account.findAll();
      const valid = accounts.filter(function (result) {
        return result.dataValues;
      });
      const resultMap = valid.map(function (result) {
        const price = parseInt(result.dataValues.total_cost);
        return price;
      });
      const allAccounts = resultMap.reduce((acumulado, x) => {
        return acumulado + x;
      });
      
      result = {httpStatus: httpStatus.OK, status: "successful", allAccounts: allAccounts}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", allAccounts: error}      
      return result
    }
  },
  async getCardPaidDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();
      const valid = accounts.filter(function (result) {
        if (result.dataValues.paid == true) {
          return result.dataValues;
        }
      });
      const resultMap = valid.map(function (result) {
        const price = parseInt(result.dataValues.price);
        return price;
      });
      const allpaids = resultMap.reduce((acumulado, x) => {
        return acumulado + x;
      });
  
      result = {httpStatus: httpStatus.OK, status: "successful", allpaids: allpaids}      
      return result;
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", allpaids: error}      
      return result;
    }
  },
  async getCardOwingDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();
      const valid = accounts.filter(function (result) {
        if (result.dataValues.paid == false) {
          return result.dataValues;
        }
      });
      const resultMap = valid.map(function (result) {
        const price = parseInt(result.dataValues.price);
        return price;
      });
      const allPending = resultMap.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {httpStatus: httpStatus.OK, status: "successful", allPending: allPending}      
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", allPending: error}      
      return result
    }
  },
  async getCardOverdueDetails(req, res) {
    let result = {}
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'portion',
            attributes: [ 'account_id', 'price' ]
          },
        ],
      });
      const dataAtual = new Date();
    
      const valid = accounts.filter(function (result) {
        const overdue = new Date(result.dataValues.date_expired)
        if (dataAtual >= overdue) {
          if (result.dataValues.status === 'pending')
          return result.dataValues;
        }
      });
      const overdueAccounts = valid.map(function (par) {
        const portions = par.dataValues.portion;
          const result = portions.map(function (value) {
            const price = parseInt(value.dataValues.price);
            return price
          }); 
          var allValue = result.reduce(acumulado, 0)
            function acumulado(allValue, itens) {
              return allValue + itens
            }     
            return allValue
      });
      const allOverdue = overdueAccounts.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {httpStatus: httpStatus.OK, status: "successful", allOverdue: allOverdue}    
      return result
    } catch (error) {
      result = {httpStatus: httpStatus.OK, status: "successful", allOverdue: error}    
      return result
    }
  },
}