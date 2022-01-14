import PortionService from '../../service/PortionService'

class PortionController {
  async storePortion(req, res) {
    let response;     
    try {
      response = await PortionService.store(req.params, req.body);
      return res.status(201).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro em cria uma nova parcela'});
    }
  }
  async getPortionDetailsWithValeuAll(req, res) {
    let response;      
    try {
      response = await PortionService.getPortionDetailsWithValeuAll(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca parcelas'});
    }
  }
  async getPortionDetailsId(req, res) {
    let response;      
    try {
      response = await PortionService.getId(req.params);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro na busca parcela'});
    }
  }
  async updatePortionId(req, res) {
    let response;      
    try {
      response = await PortionService.update(req.params, req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no atualizar'});
    }
  }
  async deletePortionId(req, res) {
    let response;      
    try {
      response = await PortionService.destroy(req.params);
      return res.status(204).send(response);
        
    } catch (error) {
      return res.status(400).json({error: 'Erro no excluir'});
    }
  }
}

export default new PortionController();
