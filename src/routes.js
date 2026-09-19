import health from './controller/healthController.js';     
import welcome from './controller/welcomeController.js';   
import calculus from './controller/calculusController.js'; 
import conta from './controller/contaController.js';
import receita from './controller/receitaController.js';
import despesa from './controller/despesaController.js';

export function addRoutes(api) {
  api.use(health);
  api.use(welcome);
  api.use(calculus);
  api.use(conta);
  api.use(receita);
  api.use(despesa);
}