import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

// Cle de traduction interne (contenu par defaut cote code, ex: "service.electricite.titre")
// vs texte reel venant de la base de donnees (ex: "Electricite"). On distingue les deux
// avec une heuristique simple : une cle n'a jamais d'espace.
const RESSEMBLE_A_UNE_CLE = /^[a-z0-9]+(\.[a-zA-Z0-9]+)+$/;

// Usage : {{ item.titre | bilingual:item.titre_en }}
// - Si "titre" est une cle de traduction interne -> traduit via le dictionnaire i18n.
// - Sinon (texte reel venant de l'API Django) -> renvoie la version anglaise si
//   disponible et que EN est selectionne, sinon la version francaise par defaut.
@Pipe({ name: 'bilingual', standalone: true, pure: false })
export class BilingualPipe implements PipeTransform {
  private lang = inject(LanguageService);

  transform(valeurFr: string | null | undefined, valeurEn?: string | null): string {
    if (!valeurFr) return '';

    if (RESSEMBLE_A_UNE_CLE.test(valeurFr)) {
      return this.lang.translate(valeurFr);
    }

    if (this.lang.lang() === 'en' && valeurEn) {
      return valeurEn;
    }

    return valeurFr;
  }
}
