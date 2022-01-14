import CardService from '../../service/CardService'

class CardController {
  async getCardTotalDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardTotalDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(404).json({error: 'Erro na busca'});
    }
  }
  async getCardOverdueDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardOverdueDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(404).json({error: 'Erro na busca'});
    }
  }
  async getCardPaidDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardPaidDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(404).json({error: 'Erro na busca'});
    }
  }
  async getCardOwingDetails(req, res) {
    let response;      
    try {
      response = await CardService.getCardOwingDetails();
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(404).json({error: 'Erro na busca'});
    }
  }
}

export default new CardController()