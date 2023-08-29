export class Task {
  titre!: string;
  description!: string;
  date!: Date;
  etat!: EtatTache;
}

export enum EtatTache {
  A_FAIRE = 'A_FAIRE',
  EN_COURS = 'EN_COURS',
  TERMINEE = 'TERMINEE',
}
