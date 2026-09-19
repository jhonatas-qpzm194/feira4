import health from './controller/healthController.js';     
import welcome from './controller/welcomeController.js';   
import calculus from './controller/calculusController.js'; 
import conta from './controller/contaController.js';

export function addRoutes(api) {
  api.use(health);
  api.use(welcome);
  api.use(calculus);
  api.use(conta);
}