import AccoutService from '../../service/AccoutService'

class AccountController {
  async storeAccount(req, res) {
    let response;     
    try {
      response = await AccoutService.store(req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria uma nova conta'});
    }
  }
  async getAccountDetails(req, res) {
    let response;      
    try {
      response = await AccoutService.index();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca todas as dividas'});
    }
  }
  async getAccountDetailsId(req, res) {
    let response;      
    try {
      response = await AccoutService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca de uma divida'});
    }
  }
  async updateAccountId(req, res) {
    let response;      
    try {
      response = await AccoutService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no atualizar'});
    }
  }
  async deleteAccountId(req, res) {
    let response;      
    try {
      response = await AccoutService.destroy(req.params);
      return res.status(204).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir'});
    }
  }
}
export default new AccountController();
