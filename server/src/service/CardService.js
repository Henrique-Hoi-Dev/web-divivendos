import Account from "../app/models/Account";
import Portion from "../app/models/Portion";
import httpStatus from 'http-status-codes';

export default {
  // busca total valores das contas CARD
  async getCardTotalDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();
      const valid = accounts.filter(function (result) {
        return result.dataValues;
      });
      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);
        return valor;
      });
      const totalContas = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });
      
      result = {httpStatus: httpStatus.OK, status: "successful", totalContas: totalContas}      
      return result
    } catch (error) {
      return res.status(404).json(error)
    }
  },
  // busca total valores pagas CARD
  async getCardPaidDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();
      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == true) {
          return result.dataValues;
        }
      });
      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);
        return valor;
      });
      const totalPagas = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });
  
      result = {httpStatus: httpStatus.OK, status: "successful", totalPagas: totalPagas}      
      return result;
    } catch (error) {
      return res.status(404).json(error)
    }
  },
  // busca total valores pendente CARD
  async getCardOwingDetails(req, res) {
    let result = {}
    try {
      const accounts = await Portion.findAll();
      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == false) {
          return result.dataValues;
        }
      });
      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);
        return valor;
      });
      const totalPendente = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      result = {httpStatus: httpStatus.OK, status: "successful", totalPendente: totalPendente}      
      return result
    } catch (error) {
      return res.status(404).json(error);
    }
  },
  // busca total valores vencido CARD
  async getCardOverdueDetails(req, res) {
    let result = {}
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: Portion,
            as: 'parcela',
            attributes: [ 'accounts_id', 'valor' ]
          },
        ],
      });
      const dataAtual = new Date();
    
      const valid = accounts.filter(function (result) {
        const vencido = new Date(result.dataValues.data_vencimento)
        if (vencido <= dataAtual) {
          if (result.dataValues.status === 'pendente')
          return result.dataValues;
        }
      });
      const contasVencidas = valid.map(function (par) {
        const parcelas = par.dataValues.parcela;
          const result = parcelas.map(function (valores) {
            const res = parseInt(valores.dataValues.valor);
            return res
          }) 
            const totalVencidas = result.reduce((acumulado, x) => {    
              return acumulado + x;
            });
            
            return totalVencidas
      });
     
      result = {httpStatus: httpStatus.OK, status: "successful", contasVencidas: contasVencidas}    
      return result
    } catch (error) {
      return res.status(404).json(error)
    }
  },
}