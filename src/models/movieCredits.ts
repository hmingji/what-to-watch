export type Person = {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
};

type CreditCast = Person & {
  cast_id: number;
  character: string;
  order: number;
};

type CreditCrew = Person & {
  department: string;
  job: string;
};

export type MovieCreditResponse = {
  id: number;
  cast: CreditCast[];
  crew: CreditCrew[];
};
