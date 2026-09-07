// Environnement de production (utilise par "ng build" / "npm run build").
// Remplace cette URL par celle de ton backend Django deploye.
export const environment = {
  production: true,
  apiUrl: 'https://api.scane-tech.com/api',
  // Doit correspondre exactement a SCANE_TECH_API_TOKEN dans backend/.env
  // en production. Ne mets jamais un vrai secret sensible ici si ce depot
  // est public : ce fichier sera visible dans le bundle JS final (voir
  // la note "Limites" dans le README).
  apiToken: 'REMPLACE_PAR_LE_MEME_TOKEN_QUE_LE_BACKEND',
};
