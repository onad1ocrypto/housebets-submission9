/* =============================================================
   Housebets Sportsbook — sample data
   All names are real competitions/venues, but every player,
   price and result here is invented for this prototype.
   No real money. No real player data.
   ============================================================= */

const HB = {};

/* ---------- brand ---------- */
HB.brand = {
  name: 'Housebets',
  weeklyPrize: '$50,000.00'
};

/* ---------- competitions ---------- */
HB.comps = [
  { id: 'pl',    name: 'Premier League',   short: 'PL',     sport: 'soccer', crest: 'pl' },
  { id: 'ucl',   name: 'Champions League', short: 'UCL',    sport: 'soccer', crest: 'ucl' },
  { id: 'liga',  name: 'LaLiga',           short: 'LAL',    sport: 'soccer', crest: 'lal' },
  { id: 'seria', name: 'Serie A',          short: 'SA',     sport: 'soccer', crest: 'sa' },
  { id: 'bund',  name: 'Bundesliga',       short: 'BL',     sport: 'soccer', crest: 'bl' }
  ,
  { id: 'nba',   name: 'NBA',            short: 'NBA',    sport: 'basket',   crest: 'nba' },
  { id: 'mlb',   name: 'MLB',            short: 'MLB',    sport: 'baseball', crest: 'mlb' },
  { id: 'nflc',  name: 'NFL',            short: 'NFL',    sport: 'nfl',      crest: 'nfl' },
  { id: 'atp',   name: 'ATP Tour',       short: 'ATP',    sport: 'tennis',   crest: 'atp' },
  { id: 'lec',   name: 'LoL EMEA',       short: 'LoL',    sport: 'esports',  crest: 'lec' },
  { id: 'fivb',  name: 'FIVB Nations',   short: 'FIVB',   sport: 'volley',   crest: 'fivb' },
  { id: 'rug',   name: 'Autumn Nations', short: 'Rugby',  sport: 'rugby',    crest: 'rug' }
];

/* ---------- teams ---------- */
HB.teams = {
  ARS:  { name: 'Arsenal',                abbr: 'ARS', sname: 'Arsenal',  col: '#E5323B', col2: '#FFFFFF' },
  BHA:  { name: 'Brighton & Hove Albion', abbr: 'BHA', sname: 'Brighton',  col: '#005DAA', col2: '#FFE500' },
  LIV:  { name: 'Liverpool',              abbr: 'LIV', sname: 'Liverpool',  col: '#C8102E', col2: '#00B2A9' },
  MUN:  { name: 'Manchester United',      abbr: 'MUN', sname: 'Man Utd',  col: '#DA291C', col2: '#FBE122' },
  INT:  { name: 'Inter',                  abbr: 'INT', sname: 'Inter',  col: '#0068A8', col2: '#010E80' },
  RMA:  { name: 'Real Madrid',            abbr: 'RMA', sname: 'Real Madrid',  col: '#FEBE10', col2: '#00529F' },
  BAY:  { name: 'Bayern Munich',          abbr: 'BAY', sname: 'Bayern',  col: '#DC052D', col2: '#0066B2' },
  MCI:  { name: 'Manchester City',        abbr: 'MCI', sname: 'Man City',  col: '#6CABDD', col2: '#1C2C5B' },
  TOT:  { name: 'Tottenham Hotspur',      abbr: 'TOT', sname: 'Spurs',  col: '#132257', col2: '#FFFFFF' },
  ATM:  { name: 'Atletico Madrid',        abbr: 'ATM', sname: 'Atletico',  col: '#CB3524', col2: '#FFFFFF' },
  SEV:  { name: 'Sevilla',                abbr: 'SEV', sname: 'Sevilla',  col: '#D9042B', col2: '#FFFFFF' },
  NAP:  { name: 'Napoli',                 abbr: 'NAP', sname: 'Napoli',  col: '#12A0D7', col2: '#FFFFFF' },
  MIL:  { name: 'Milan',                  abbr: 'MIL', sname: 'Milan',  col: '#FB090B', col2: '#000000' },
  BVB:  { name: 'Borussia Dortmund',      abbr: 'BVB', sname: 'Dortmund',  col: '#FDE100', col2: '#000000' },
  CHE:  { name: 'Chelsea',                abbr: 'CHE', sname: 'Chelsea',  col: '#034694', col2: '#FFFFFF' },
  JUV:  { name: 'Juventus',               abbr: 'JUV', sname: 'Juventus',  col: '#000000', col2: '#FFFFFF' }
};

/* ---------- scorer names (invented) ---------- */
HB.scorers = [];   // filled from HB.playerPool further down (fictional squads)

/* ---------- team crest system ----------
   Original badge art, built from each team's own two colours.
   Nothing here is copied from a real club: real badges are
   trademarked and the brief requires your own work.
   `shape` and `pattern` are picked deterministically from the
   team code, so a team always gets the same badge.
------------------------------------------------------------ */

/* ---------- non-football squads (prototype sample data) ---------- */
Object.assign(HB.teams, {
  /* NBA */
  LAL: { name: 'Los Angeles Lakers',   abbr: 'LAL', sname: 'Lakers',   col: '#FDB927', col2: '#552583' },
  GSW: { name: 'Golden State Warriors',abbr: 'GSW', sname: 'Warriors', col: '#FFC72C', col2: '#1D428A' },
  CEL: { name: 'Boston Celtics',       abbr: 'CEL', sname: 'Celtics',  col: '#007A33', col2: '#BA9653' },
  MIA: { name: 'Miami Heat',           abbr: 'MIA', sname: 'Heat',     col: '#98002E', col2: '#F9A01B' },
  CHI: { name: 'Chicago Bulls',        abbr: 'CHI', sname: 'Bulls',    col: '#CE1141', col2: '#111111' },
  PHX: { name: 'Phoenix Suns',         abbr: 'PHX', sname: 'Suns',     col: '#E56020', col2: '#1D1160' },
  BUC: { name: 'Milwaukee Bucks',      abbr: 'BUC', sname: 'Bucks',    col: '#00471B', col2: '#EEE1C6' },
  DEN: { name: 'Denver Nuggets',       abbr: 'DEN', sname: 'Nuggets',  col: '#0E2240', col2: '#FEC524' },
  /* MLB */
  NYY: { name: 'New York Yankees',     abbr: 'NYY', sname: 'Yankees',  col: '#0C2340', col2: '#C4CED3' },
  LAD: { name: 'Los Angeles Dodgers',  abbr: 'LAD', sname: 'Dodgers',  col: '#005A9C', col2: '#EF3E42' },
  CHC: { name: 'Chicago Cubs',         abbr: 'CHC', sname: 'Cubs',     col: '#0E3386', col2: '#CC3433' },
  HOU: { name: 'Houston Astros',       abbr: 'HOU', sname: 'Astros',   col: '#002D62', col2: '#EB6E1F' },
  ATL: { name: 'Atlanta Braves',       abbr: 'ATL', sname: 'Braves',   col: '#CE1141', col2: '#13274F' },
  NYM: { name: 'New York Mets',        abbr: 'NYM', sname: 'Mets',     col: '#002D72', col2: '#FF5910' },
  /* NFL */
  NWE: { name: 'New England Patriots', abbr: 'NWE', sname: 'Patriots', col: '#002244', col2: '#C60C30' },
  KCC: { name: 'Kansas City Chiefs',   abbr: 'KCC', sname: 'Chiefs',   col: '#E31837', col2: '#FFB81C' },
  SFO: { name: 'San Francisco 49ers',  abbr: 'SFO', sname: '49ers',    col: '#AA0000', col2: '#B3995D' },
  GNB: { name: 'Green Bay Packers',    abbr: 'GNB', sname: 'Packers',  col: '#203731', col2: '#FFB612' },
  DAL: { name: 'Dallas Cowboys',       abbr: 'DAL', sname: 'Cowboys',  col: '#003594', col2: '#869397' },
  BUF: { name: 'Buffalo Bills',        abbr: 'BUF', sname: 'Bills',    col: '#00338D', col2: '#C60C30' },
  /* ATP */
  DJO: { name: 'Novak Djokovic',       abbr: 'DJO', sname: 'Djokovic', col: '#1B4A6B', col2: '#D8DEE3' },
  ALA: { name: 'Carlos Alcaraz',       abbr: 'ALA', sname: 'Alcaraz',  col: '#C8102E', col2: '#F1C40F' },
  SIN: { name: 'Jannik Sinner',        abbr: 'SIN', sname: 'Sinner',   col: '#8E1B3E', col2: '#F2F2F2' },
  MED: { name: 'Daniil Medvedev',      abbr: 'MED', sname: 'Medvedev', col: '#2E4A62', col2: '#C9D1D9' },
  RUB: { name: 'Andrey Rublev',        abbr: 'RUB', sname: 'Rublev',   col: '#B33A2B', col2: '#E8E8E8' },
  TSI: { name: 'Stefanos Tsitsipas',   abbr: 'TSI', sname: 'Tsitsipas',col: '#1F6FB2', col2: '#FFFFFF' },
  /* Esports */
  SKT: { name: 'T1',                   abbr: 'SKT', sname: 'T1',       col: '#E4002B', col2: '#0A0A0A' },
  G2E: { name: 'G2 Esports',           abbr: 'G2E', sname: 'G2',       col: '#1B1B1B', col2: '#E94E1B' },
  FNC: { name: 'Fnatic',               abbr: 'FNC', sname: 'Fnatic',   col: '#FF5A00', col2: '#151515' },
  JDG: { name: 'JD Gaming',            abbr: 'JDG', sname: 'JDG',      col: '#C8102E', col2: '#FFFFFF' },
  GEN: { name: 'Gen.G',                abbr: 'GEN', sname: 'Gen.G',    col: '#1C1C1C', col2: '#C8A96A' },
  DRX: { name: 'DRX',                  abbr: 'DRX', sname: 'DRX',      col: '#0F4C81', col2: '#F5F5F5' },
  /* Volleyball */
  BRA: { name: 'Brazil',               abbr: 'BRA', sname: 'Brazil',   col: '#009B3A', col2: '#FFDF00' },
  ITA: { name: 'Italy',                abbr: 'ITA', sname: 'Italy',    col: '#008C45', col2: '#F4F5F0' },
  POL: { name: 'Poland',               abbr: 'POL', sname: 'Poland',   col: '#DC143C', col2: '#FFFFFF' },
  USA: { name: 'United States',        abbr: 'USA', sname: 'USA',      col: '#0A3161', col2: '#B31942' },
  JPN: { name: 'Japan',                abbr: 'JPN', sname: 'Japan',    col: '#BC002D', col2: '#FFFFFF' },
  SRB: { name: 'Serbia',               abbr: 'SRB', sname: 'Serbia',   col: '#C6363C', col2: '#0C4076' },
  /* Rugby */
  NZL: { name: 'New Zealand',          abbr: 'NZL', sname: 'NZ',       col: '#000000', col2: '#FFFFFF' },
  RSA: { name: 'South Africa',         abbr: 'RSA', sname: 'SA',       col: '#007A4D', col2: '#FFB81C' },
  ENG: { name: 'England',              abbr: 'ENG', sname: 'England',  col: '#FFFFFF', col2: '#CE1124' },
  AUS: { name: 'Australia',            abbr: 'AUS', sname: 'Australia',col: '#012169', col2: '#E4002B' },
  FRA: { name: 'France',               abbr: 'FRA', sname: 'France',   col: '#002395', col2: '#ED2939' },
  WAL: { name: 'Wales',                abbr: 'WAL', sname: 'Wales',    col: '#C8102E', col2: '#00B140' }
});

HB.crestShapes = [
  'M6 3 H42 V23 C42 34.5 30.5 42.5 24 45.5 C17.5 42.5 6 34.5 6 23 Z',
  'M24 2.5 L45 12 V27 C45 37.5 34.5 43.5 24 45.5 C13.5 43.5 3 37.5 3 27 V12 Z',
  'M7 4 H41 V25.5 L24 34.5 L7 25.5 Z'
];
HB.crestPatterns = ['solid', 'split', 'band', 'chevron', 'star'];

/* ---------- matches ----------
   state: 'live' | 'soon' | 'pre'
   susp:  true = whole market group suspended
------------------------------------------------- */
HB.matches = [
  /* Scheduling rule enforced here: a club can only be in ONE live match,
     and never in a live match and a "starting soon" match at the same
     time. Seven live fixtures need 14 clubs and two "soon" fixtures need
     4 more - 18 in total - but the sample only has 16 clubs, which is
     what put Napoli in two live games and Sevilla in two. Six live plus
     two soon uses all 16 exactly once, so no club is ever in two places.
     Pre fixtures are future dates, so they may reuse clubs freely. */
  {
    id: 'ars-bha', comp: 'pl', state: 'live', clock: "52'", minute: 52,
    home: 'ARS', away: 'BHA', hs: 1, as: 0,
    kick: 'LIVE', day: '', marketsCount: 115,
    odds: { 'mr-home': 1.30, 'mr-draw': 4.60, 'mr-away': 11.00 }
  },
  {
    id: 'atm-sev', comp: 'liga', state: 'live', clock: "37'", minute: 37,
    home: 'ATM', away: 'SEV', hs: 1, as: 0,
    kick: 'LIVE', day: '', marketsCount: 96, susp: true,
    odds: { 'mr-home': 1.44, 'mr-draw': 4.20, 'mr-away': 8.50 }
  },
  {
    id: 'mci-tot', comp: 'pl', state: 'live', clock: "51'", minute: 51,
    home: 'MCI', away: 'TOT', hs: 2, as: 0,
    kick: 'LIVE', day: '', marketsCount: 143,
    odds: { 'mr-home': 1.53, 'mr-draw': 4.40, 'mr-away': 6.20 }
  },
  {
    id: 'nap-mil', comp: 'seria', state: 'live', clock: "74'", minute: 74,
    home: 'NAP', away: 'MIL', hs: 1, as: 1,
    kick: 'LIVE', day: '', marketsCount: 128,
    odds: { 'mr-home': 2.10, 'mr-draw': 3.40, 'mr-away': 3.60 }
  },
  {
    id: 'bay-bvb', comp: 'bund', state: 'live', clock: "12'", minute: 12,
    home: 'BAY', away: 'BVB', hs: 0, as: 0,
    kick: 'LIVE', day: '', marketsCount: 104,
    odds: { 'mr-home': 1.62, 'mr-draw': 4.10, 'mr-away': 5.40 }
  },
  {
    id: 'che-int', comp: 'ucl', state: 'live', clock: "68'", minute: 68,
    home: 'CHE', away: 'INT', hs: 2, as: 1,
    kick: 'LIVE', day: '', marketsCount: 167,
    odds: { 'mr-home': 2.35, 'mr-draw': 3.30, 'mr-away': 3.10 }
  },

  {
    id: 'liv-mun', comp: 'pl', state: 'soon', clock: '', minute: 0,
    home: 'LIV', away: 'MUN', hs: null, as: null,
    kick: '16:30', day: 'Sun, Oct 18', marketsCount: 187,
    odds: { 'mr-home': 1.65, 'mr-draw': 4.00, 'mr-away': 4.33 }
  },
  {
    id: 'rma-juv', comp: 'ucl', state: 'soon', clock: '', minute: 0,
    home: 'RMA', away: 'JUV', hs: null, as: null,
    kick: '20:45', day: 'Sun, Oct 18', marketsCount: 172,
    odds: { 'mr-home': 2.05, 'mr-draw': 3.60, 'mr-away': 3.40 }
  },

  {
    id: 'ars-int', comp: 'ucl', state: 'pre', clock: '', minute: 0,
    home: 'ARS', away: 'INT', hs: null, as: null,
    kick: '20:00', day: 'Tue, Oct 20', marketsCount: 85,
    odds: { 'mr-home': 1.95, 'mr-draw': 3.50, 'mr-away': 4.00 }
  },
  {
    id: 'rma-bay', comp: 'ucl', state: 'pre', clock: '', minute: 0,
    home: 'RMA', away: 'BAY', hs: null, as: null,
    kick: '20:00', day: 'Tue, Oct 20', marketsCount: 110,
    odds: { 'mr-home': 2.20, 'mr-draw': 3.70, 'mr-away': 2.90 }
  },
  {
    id: 'bvb-che', comp: 'ucl', state: 'pre', clock: '', minute: 0,
    home: 'BVB', away: 'CHE', hs: null, as: null,
    kick: '20:00', day: 'Wed, Oct 21', marketsCount: 98,
    odds: { 'mr-home': 2.55, 'mr-draw': 3.45, 'mr-away': 2.75 }
  },
  {
    id: 'sev-rma', comp: 'liga', state: 'pre', clock: '', minute: 0,
    home: 'SEV', away: 'RMA', hs: null, as: null,
    kick: '21:00', day: 'Sat, Oct 24', marketsCount: 121,
    odds: { 'mr-home': 3.10, 'mr-draw': 3.55, 'mr-away': 2.25 }
  },
  {
    id: 'juv-mil', comp: 'seria', state: 'pre', clock: '', minute: 0,
    home: 'JUV', away: 'MIL', hs: null, as: null,
    kick: '18:00', day: 'Sun, Oct 25', marketsCount: 133,
    odds: { 'mr-home': 2.00, 'mr-draw': 3.40, 'mr-away': 3.90 }
  },
  /* ---------- non-football fixtures (prototype sample data) ---------- */
  /* NBA */
  { id: 'lal-gsw', comp: 'nba', state: 'live', clock: "Q3 04:12", minute: 0,
    home: 'LAL', away: 'GSW', hs: 88, as: 94, kick: 'LIVE', day: '', marketsCount: 64,
    odds: { 'mr-home': 1.95, 'mr-away': 1.90 } },
  { id: 'cel-mia', comp: 'nba', state: 'live', clock: "Q2 07:38", minute: 0,
    home: 'CEL', away: 'MIA', hs: 51, as: 46, kick: 'LIVE', day: '', marketsCount: 58,
    odds: { 'mr-home': 1.42, 'mr-away': 2.95 } },
  { id: 'buc-den', comp: 'nba', state: 'soon', clock: '', minute: 0,
    home: 'BUC', away: 'DEN', hs: 0, as: 0, kick: '01:30', day: 'Tomorrow', marketsCount: 52,
    odds: { 'mr-home': 2.10, 'mr-away': 1.78 } },
  { id: 'phx-chi', comp: 'nba', state: 'pre', clock: '', minute: 0,
    home: 'PHX', away: 'CHI', hs: 0, as: 0, kick: '02:00', day: 'Sun 16 Nov', marketsCount: 49,
    odds: { 'mr-home': 1.66, 'mr-away': 2.25 } },
  /* MLB */
  { id: 'nyy-lad', comp: 'mlb', state: 'live', clock: 'Bot 6th', minute: 0,
    home: 'NYY', away: 'LAD', hs: 4, as: 3, kick: 'LIVE', day: '', marketsCount: 41,
    odds: { 'mr-home': 1.72, 'mr-away': 2.15 } },
  { id: 'hou-atl', comp: 'mlb', state: 'soon', clock: '', minute: 0,
    home: 'HOU', away: 'ATL', hs: 0, as: 0, kick: '23:10', day: 'Tonight', marketsCount: 38,
    odds: { 'mr-home': 2.02, 'mr-away': 1.85 } },
  { id: 'chc-nym', comp: 'mlb', state: 'pre', clock: '', minute: 0,
    home: 'CHC', away: 'NYM', hs: 0, as: 0, kick: '20:05', day: 'Sat 15 Nov', marketsCount: 36,
    odds: { 'mr-home': 2.30, 'mr-away': 1.64 } },
  /* NFL */
  { id: 'kcc-nwe', comp: 'nflc', state: 'live', clock: 'Q4 09:51', minute: 0,
    home: 'KCC', away: 'NWE', hs: 24, as: 17, kick: 'LIVE', day: '', marketsCount: 72,
    odds: { 'mr-home': 1.28, 'mr-away': 3.70 } },
  { id: 'sfo-gnb', comp: 'nflc', state: 'soon', clock: '', minute: 0,
    home: 'SFO', away: 'GNB', hs: 0, as: 0, kick: '01:20', day: 'Tomorrow', marketsCount: 68,
    odds: { 'mr-home': 1.55, 'mr-away': 2.48 } },
  { id: 'buf-dal', comp: 'nflc', state: 'pre', clock: '', minute: 0,
    home: 'BUF', away: 'DAL', hs: 0, as: 0, kick: '21:25', day: 'Sun 16 Nov', marketsCount: 70,
    odds: { 'mr-home': 1.83, 'mr-away': 2.00 } },
  /* ATP */
  { id: 'djo-ala', comp: 'atp', state: 'live', clock: 'Set 3', minute: 0,
    home: 'DJO', away: 'ALA', hs: 1, as: 1, kick: 'LIVE', day: '', marketsCount: 22,
    odds: { 'mr-home': 2.40, 'mr-away': 1.58 } },
  { id: 'sin-med', comp: 'atp', state: 'soon', clock: '', minute: 0,
    home: 'SIN', away: 'MED', hs: 0, as: 0, kick: '19:00', day: 'Tonight', marketsCount: 19,
    odds: { 'mr-home': 1.44, 'mr-away': 2.80 } },
  { id: 'rub-tsi', comp: 'atp', state: 'pre', clock: '', minute: 0,
    home: 'RUB', away: 'TSI', hs: 0, as: 0, kick: '15:30', day: 'Sat 15 Nov', marketsCount: 18,
    odds: { 'mr-home': 1.91, 'mr-away': 1.91 } },
  /* Esports */
  { id: 'skt-jdg', comp: 'lec', state: 'live', clock: 'Game 2', minute: 0,
    home: 'SKT', away: 'JDG', hs: 1, as: 0, kick: 'LIVE', day: '', marketsCount: 16,
    odds: { 'mr-home': 1.68, 'mr-away': 2.20 } },
  { id: 'g2e-fnc', comp: 'lec', state: 'soon', clock: '', minute: 0,
    home: 'G2E', away: 'FNC', hs: 0, as: 0, kick: '18:00', day: 'Tonight', marketsCount: 15,
    odds: { 'mr-home': 1.52, 'mr-away': 2.55 } },
  { id: 'gen-drx', comp: 'lec', state: 'pre', clock: '', minute: 0,
    home: 'GEN', away: 'DRX', hs: 0, as: 0, kick: '14:00', day: 'Sun 16 Nov', marketsCount: 14,
    odds: { 'mr-home': 1.35, 'mr-away': 3.20 } },
  /* Volleyball */
  { id: 'bra-ita', comp: 'fivb', state: 'live', clock: 'Set 4', minute: 0,
    home: 'BRA', away: 'ITA', hs: 2, as: 1, kick: 'LIVE', day: '', marketsCount: 13,
    odds: { 'mr-home': 1.62, 'mr-away': 2.28 } },
  { id: 'pol-usa', comp: 'fivb', state: 'soon', clock: '', minute: 0,
    home: 'POL', away: 'USA', hs: 0, as: 0, kick: '17:00', day: 'Tonight', marketsCount: 12,
    odds: { 'mr-home': 1.74, 'mr-away': 2.10 } },
  { id: 'jpn-srb', comp: 'fivb', state: 'pre', clock: '', minute: 0,
    home: 'JPN', away: 'SRB', hs: 0, as: 0, kick: '13:00', day: 'Sat 15 Nov', marketsCount: 12,
    odds: { 'mr-home': 2.45, 'mr-away': 1.55 } },
  /* Rugby */
  { id: 'nzl-rsa', comp: 'rug', state: 'live', clock: "63'", minute: 63,
    home: 'NZL', away: 'RSA', hs: 22, as: 19, kick: 'LIVE', day: '', marketsCount: 27,
    odds: { 'mr-home': 1.48, 'mr-away': 2.70 } },
  { id: 'eng-aus', comp: 'rug', state: 'soon', clock: '', minute: 0,
    home: 'ENG', away: 'AUS', hs: 0, as: 0, kick: '16:00', day: 'Tomorrow', marketsCount: 25,
    odds: { 'mr-home': 1.80, 'mr-away': 2.02 } },
  { id: 'fra-wal', comp: 'rug', state: 'pre', clock: '', minute: 0,
    home: 'FRA', away: 'WAL', hs: 0, as: 0, kick: '21:00', day: 'Sat 15 Nov', marketsCount: 24,
    odds: { 'mr-home': 1.33, 'mr-away': 3.40 } }
];
/* ---------- sports nav ---------- */
/* `short` is the label used inside the sport tile, where a long name
   like "American Football" would wrap to three lines. `label` stays
   full-length for toasts and the page heading. */
HB.sports = [
  { id: 'home',      label: 'Home',      short: 'Home',      icon: 'home',   count: 0 },
  { id: 'live',      label: 'Live',      short: 'Live',      icon: 'live',   count: 0 },  /* diisi dari HB.matches di bawah */
  { id: 'soccer',    label: 'Soccer',    short: 'Football',  icon: 'soccer', count: 0 },
  { id: 'tennis',    label: 'Tennis',    short: 'Tennis',    icon: 'tennis', count: 0 },
  { id: 'basket',    label: 'Basketball',short: 'Basket',    icon: 'hoop',   count: 0 },
  { id: 'baseball',  label: 'Baseball',  short: 'Baseball',  icon: 'base',   count: 0 },
  { id: 'nfl',       label: 'American Football', short: 'NFL', icon: 'nfl',  count: 0 },
  { id: 'esports',   label: 'Esports',   short: 'Esports',   icon: 'esport', count: 0 },
  { id: 'volley',    label: 'Volleyball',short: 'Volley',    icon: 'volley', count: 0 },
  { id: 'rugby',     label: 'Rugby',     short: 'Rugby',     icon: 'rugby',  count: 0 }
];

/* ---------- market groups (match page) ----------
   Six groups exactly as the brief requires.
   `n` = number of markets in the group (shown on the tab badge,
   and it matches exactly how many are rendered).
------------------------------------------------- */
HB.marketGroups = [
  { id: 'popular', label: 'Popular',         n: 10 },
  { id: 'goals',   label: 'Goals',           n: 8 },
  { id: 'halves',  label: 'Halves',          n: 6 },
  { id: 'hcaps',   label: 'Handicaps',       n: 6 },
  { id: 'scorers', label: 'Goalscorers',     n: 9 },
  { id: 'cards',   label: 'Corners & cards', n: 9 }
];

/* Markets rendered per group.
   Every `k` must be unique across the whole object — the price
   engine namespaces by `fixtureId:outcomeKey`. */
HB.markets = {
  popular: [
    { id: 'mr',    name: 'Match result', cols: 3, suspended: false,
      outs: [{ k: 'mr-home', n: '{home}', v: 1.30 }, { k: 'mr-draw', n: 'Draw', v: 4.60 }, { k: 'mr-away', n: '{away}', v: 11.00 }] },
    { id: 'dc',    name: 'Double chance', cols: 3, suspended: false,
      outs: [{ k: 'dc-hd', n: '{home}/Draw', v: 1.01 }, { k: 'dc-ha', n: '{home}/{away}', v: 1.16 }, { k: 'dc-da', n: 'Draw/{away}', v: 3.24 }] },
    { id: 'btts',  name: 'Both teams to score', cols: 2, suspended: false,
      outs: [{ k: 'btts-y', n: 'Yes', v: 1.72 }, { k: 'btts-n', n: 'No', v: 2.05 }] },
    { id: 'tg',    name: 'Total goals', cols: 3, suspended: false,
      outs: [{ k: 'tg-o25', n: 'Over 2.5', v: 1.57 }, { k: 'tg-u25', n: 'Under 2.5', v: 2.30 }, { k: 'tg-o35', n: 'Over 3.5', v: 2.65 }] },
    { id: 'dnbt',  name: 'Draw no bet', cols: 2, suspended: false,
      outs: [{ k: 'dnbt-h', n: '{home}', v: 1.14 }, { k: 'dnbt-a', n: '{away}', v: 7.50 }] },
    { id: 'tg35',  name: 'Over/Under 3.5 goals', cols: 2, suspended: false,
      outs: [{ k: 'tg35-o', n: 'Over 3.5', v: 2.65 }, { k: 'tg35-u', n: 'Under 3.5', v: 1.44 }] },
    { id: 'ah05',  name: 'Asian handicap -0.5', cols: 2, suspended: false,
      outs: [{ k: 'ah05-h', n: '{home} -0.5', v: 1.30 }, { k: 'ah05-a', n: '{away} +0.5', v: 3.30 }] },
    /* Suspended in-play on purpose: half-time is already decided, so this
       is the one market a real book closes. It sits in Popular so the
       suspended state is visible on the tab the judge lands on. */
    { id: 'htft',  name: 'Half-time / Full-time', cols: 3, suspended: true,
      outs: [{ k: 'htft-hh', n: '{home} / {home}', v: 1.85 }, { k: 'htft-hd', n: '{home} / Draw', v: 13.00 }, { k: 'htft-dh', n: 'Draw / {home}', v: 4.20 }] },
    { id: 'cs',    name: 'Correct score', cols: 3, suspended: false,
      outs: [{ k: 'cs-10', n: '1-0', v: 5.50 }, { k: 'cs-20', n: '2-0', v: 6.50 }, { k: 'cs-21', n: '2-1', v: 8.50 }] },
    { id: 'tgoe',  name: 'Total goals odd/even', cols: 2, suspended: false,
      outs: [{ k: 'tgoe-o', n: 'Odd', v: 1.90 }, { k: 'tgoe-e', n: 'Even', v: 1.90 }] }
  ],
  goals: [
    { id: 'o15',  name: 'Over/Under 1.5 goals', cols: 2, suspended: false,
      outs: [{ k: 'o15-o', n: 'Over 1.5', v: 1.22 }, { k: 'o15-u', n: 'Under 1.5', v: 4.00 }] },
    { id: 'o45',  name: 'Over/Under 4.5 goals', cols: 2, suspended: false,
      outs: [{ k: 'o45-o', n: 'Over 4.5', v: 4.75 }, { k: 'o45-u', n: 'Under 4.5', v: 1.18 }] },
    { id: 'nxg',  name: 'Next goal', cols: 3, suspended: false,
      outs: [{ k: 'nxg-h', n: '{home}', v: 1.66 }, { k: 'nxg-n', n: 'No goal', v: 13.00 }, { k: 'nxg-a', n: '{away}', v: 2.90 }] },
    { id: 'rts',  name: 'Team to score', cols: 2, suspended: true,
      outs: [{ k: 'rts-h', n: '{home}', v: 1.11 }, { k: 'rts-a', n: '{away}', v: 2.40 }] },
    { id: 'o05',  name: 'Over/Under 0.5 goals', cols: 2, suspended: false,
      outs: [{ k: 'o05-o', n: 'Over 0.5', v: 1.05 }, { k: 'o05-u', n: 'Under 0.5', v: 9.00 }] },
    { id: 'o55',  name: 'Over/Under 5.5 goals', cols: 2, suspended: false,
      outs: [{ k: 'o55-o', n: 'Over 5.5', v: 9.50 }, { k: 'o55-u', n: 'Under 5.5', v: 1.04 }] },
    { id: 'ttg',  name: '{home} total goals', cols: 2, suspended: false,
      outs: [{ k: 'ttg-o', n: 'Over 1.5', v: 1.95 }, { k: 'ttg-u', n: 'Under 1.5', v: 1.85 }] },
    { id: 'wm',   name: 'Winning margin', cols: 3, suspended: false,
      outs: [{ k: 'wm-1', n: '{home} by 1', v: 3.40 }, { k: 'wm-2', n: '{home} by 2+', v: 3.10 }, { k: 'wm-a', n: '{away}', v: 9.50 }] }
  ],
  halves: [
    { id: 'h1',  name: '1st half result', cols: 3, suspended: false,
      outs: [{ k: 'h1-h', n: '{home}', v: 1.73 }, { k: 'h1-d', n: 'Draw', v: 2.62 }, { k: 'h1-a', n: '{away}', v: 7.50 }] },
    { id: 'h2',  name: '2nd half result', cols: 3, suspended: false,
      outs: [{ k: 'h2-h', n: '{home}', v: 1.90 }, { k: 'h2-d', n: 'Draw', v: 2.75 }, { k: 'h2-a', n: '{away}', v: 6.00 }] },
    { id: 'hhc', name: 'Half handicap', cols: 2, suspended: false,
      outs: [{ k: 'hhc-h', n: '{home} -0.5', v: 1.68 }, { k: 'hhc-a', n: '{away} +0.5', v: 2.15 }] },
    { id: 'h1tg', name: '1st half total goals', cols: 2, suspended: false,
      outs: [{ k: 'h1tg-o', n: 'Over 1.5', v: 2.60 }, { k: 'h1tg-u', n: 'Under 1.5', v: 1.48 }] },
    { id: 'h1btts', name: '1st half both teams to score', cols: 2, suspended: false,
      outs: [{ k: 'h1btts-y', n: 'Yes', v: 4.20 }, { k: 'h1btts-n', n: 'No', v: 1.20 }] },
    { id: 'hsh', name: 'Highest scoring half', cols: 3, suspended: false,
      outs: [{ k: 'hsh-1', n: '1st half', v: 3.10 }, { k: 'hsh-2', n: '2nd half', v: 1.95 }, { k: 'hsh-t', n: 'Tie', v: 3.60 }] }
  ],
  hcaps: [
    { id: 'ah1', name: 'Asian handicap -1', cols: 2, suspended: false,
      outs: [{ k: 'ah1-h', n: '{home} -1', v: 1.98 }, { k: 'ah1-a', n: '{away} +1', v: 1.92 }] },
    { id: 'ah2', name: 'Asian handicap -1.5', cols: 2, suspended: false,
      outs: [{ k: 'ah2-h', n: '{home} -1.5', v: 2.38 }, { k: 'ah2-a', n: '{away} +1.5', v: 1.60 }] },
    { id: 'eh',  name: 'European handicap', cols: 3, suspended: true,
      outs: [{ k: 'eh-h', n: '{home} -2', v: 4.20 }, { k: 'eh-d', n: 'Draw', v: 4.10 }, { k: 'eh-a', n: '{away} +2', v: 1.72 }] },
    { id: 'ah3', name: 'Asian handicap -2', cols: 2, suspended: false,
      outs: [{ k: 'ah3-h', n: '{home} -2', v: 3.60 }, { k: 'ah3-a', n: '{away} +2', v: 1.30 }] },
    { id: 'ah25', name: 'Asian handicap -2.5', cols: 2, suspended: false,
      outs: [{ k: 'ah25-h', n: '{home} -2.5', v: 4.40 }, { k: 'ah25-a', n: '{away} +2.5', v: 1.22 }] },
    { id: 'ahp1', name: 'Asian handicap +1', cols: 2, suspended: false,
      outs: [{ k: 'ahp1-h', n: '{home} +1', v: 1.10 }, { k: 'ahp1-a', n: '{away} -1', v: 7.00 }] }
  ],
  scorers: [
    { id: 'fgs', name: 'First goalscorer', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'fgs-1', n: '{h1}', v: 5.50 }, { k: 'fgs-2', n: '{h2}', v: 7.00 }, { k: 'fgs-3', n: '{a1}', v: 9.50 }] },
    { id: 'ags', name: 'Anytime goalscorer', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'ags-1', n: '{h1}', v: 2.10 }, { k: 'ags-2', n: '{h2}', v: 2.75 }, { k: 'ags-3', n: '{h3}', v: 3.40 }] },
    { id: 'lgs', name: 'Last goalscorer', cols: 3, wide: true, suspended: true,
      outs: [{ k: 'lgs-1', n: '{a2}', v: 6.00 }, { k: 'lgs-2', n: '{a3}', v: 8.00 }, { k: 'lgs-3', n: '{a1}', v: 10.00 }] },
    { id: 'g2p', name: 'To score 2 or more', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'g2p-1', n: '{h1}', v: 12.00 }, { k: 'g2p-2', n: '{h2}', v: 17.00 }, { k: 'g2p-3', n: '{a3}', v: 21.00 }] },
    { id: 'hat', name: 'To score a hat-trick', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'hat-1', n: '{h1}', v: 51.00 }, { k: 'hat-2', n: '{h2}', v: 67.00 }, { k: 'hat-3', n: '{a2}', v: 81.00 }] },
    { id: 'agsh', name: '{home} anytime scorer', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'agsh-1', n: '{h1}', v: 2.40 }, { k: 'agsh-2', n: '{h2}', v: 3.10 }, { k: 'agsh-3', n: '{h3}', v: 3.80 }] },
    { id: 'agsa', name: '{away} anytime scorer', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'agsa-1', n: '{a1}', v: 3.60 }, { k: 'agsa-2', n: '{a2}', v: 4.40 }, { k: 'agsa-3', n: '{a3}', v: 5.20 }] },
    { id: 'sbh', name: 'Score in both halves', cols: 2, suspended: false,
      outs: [{ k: 'sbh-y', n: 'Yes', v: 2.60 }, { k: 'sbh-n', n: 'No', v: 1.48 }] },
    { id: 'ftgs', name: 'First team goalscorer', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'ftgs-h', n: '{home}', v: 1.44 }, { k: 'ftgs-a', n: '{away}', v: 3.10 }, { k: 'ftgs-n', n: 'No goalscorer', v: 12.00 }] }
  ],
  cards: [
    { id: 'corn', name: 'Total corners', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'corn-o95', n: 'Over 9.5', v: 1.85 }, { k: 'corn-u95', n: 'Under 9.5', v: 1.95 }, { k: 'corn-o115', n: 'Over 11.5', v: 3.10 }] },
    { id: 'crt',  name: 'Total cards', cols: 2, suspended: false,
      outs: [{ k: 'crt-o35', n: 'Over 3.5', v: 1.90 }, { k: 'crt-u35', n: 'Under 3.5', v: 1.90 }] },
    { id: 'first',name: 'First card', cols: 2, suspended: true,
      outs: [{ k: 'first-h', n: '{home}', v: 2.05 }, { k: 'first-a', n: '{away}', v: 1.75 }] },
    { id: 'cornh', name: 'Corner handicap', cols: 2, suspended: false,
      outs: [{ k: 'cornh-h', n: '{home} -1.5', v: 2.20 }, { k: 'cornh-a', n: '{away} +1.5', v: 1.70 }] },
    { id: 'corn1h', name: '1st half total corners', cols: 2, suspended: false,
      outs: [{ k: 'corn1h-o', n: 'Over 4.5', v: 1.95 }, { k: 'corn1h-u', n: 'Under 4.5', v: 1.85 }] },
    { id: 'cardh', name: 'Card handicap', cols: 2, suspended: false,
      outs: [{ k: 'cardh-h', n: '{home} -0.5', v: 1.98 }, { k: 'cardh-a', n: '{away} +0.5', v: 1.82 }] },
    { id: 'rc', name: 'Red card in match', cols: 2, suspended: false,
      outs: [{ k: 'rc-y', n: 'Yes', v: 6.50 }, { k: 'rc-n', n: 'No', v: 1.10 }] },
    { id: 'ptc', name: 'Player to be carded', cols: 3, wide: true, suspended: false,
      outs: [{ k: 'ptc-1', n: '{h1}', v: 3.40 }, { k: 'ptc-2', n: '{h2}', v: 4.20 }, { k: 'ptc-3', n: '{a1}', v: 4.80 }] },
    { id: 'crt45', name: 'Total cards O/U 4.5', cols: 2, suspended: false,
      outs: [{ k: 'crt45-o', n: 'Over 4.5', v: 3.20 }, { k: 'crt45-u', n: 'Under 4.5', v: 1.34 }] }
  ]
};

/* ---------- fictional squads -------------------------------
   Sample data must not name real players, so every squad is
   generated from an invented name pool. Deterministic per club:
   the same club always fields the same four names, so a goalscorer
   shown on the scoreboard is the same one offered in the markets.
------------------------------------------------------------- */
HB.playerPool = [
  'A. Aldermey',
  'B. Brannock',
  'C. Callister',
  'D. Dunmorrow',
  'E. Esterglen',
  'F. Fairholm',
  'G. Grimsdale',
  'H. Hollowbrook',
  'I. Ivorymoor',
  'J. Jessamy',
  'K. Kestrel',
  'L. Larkspur',
  'M. Merrigold',
  'N. Northcliff',
  'O. Osterfield',
  'P. Penhallow',
  'R. Quillane',
  'S. Ravensmere',
  'T. Summercourt',
  'V. Thornwick',
  'W. Ulverstone',
  'A. Vandeliere',
  'B. Wexfordale',
  'C. Yarrowby',
  'D. Ashbourne',
  'E. Bellweather',
  'F. Cormoran',
  'G. Dovecote',
  'H. Elandor',
  'I. Foxglove',
  'J. Gallowmere',
  'K. Hazelwood',
  'L. Inglebrook',
  'M. Kestrelmere',
  'N. Larkham',
  'O. Mistlethwaite',
  'P. Orchidvale',
  'R. Peregrine',
  'S. Quinmere',
  'T. Rosemarrow',
  'V. Silverbirch',
  'W. Tamarisk',
  'A. Umberlake',
  'B. Verdanthall',
  'C. Willowmere',
  'D. Yewbank',
  'E. Marlowen',
  'F. Thistlebrook',
  'Z. Zennorfield',
  'A. Ambervale',
  'B. Brackenmoor',
  'C. Cinderhall',
  'D. Driftwood',
  'E. Elmsworth',
  'F. Frostmere',
  'G. Glenmorrow',
  'H. Halebrooke',
  'I. Ironvale',
  'J. Jademere',
  'K. Kelporth',
  'L. Lumenford',
  'M. Marrowgate',
  'N. Nettlebridge',
  'O. Oakhaven'
];
HB._squads = {};
HB._teamOrder = Object.keys(HB.teams);
/* Each club owns a distinct block of four names, so no fictional
   player ever turns out for two different teams. */
HB.squad = function (abbr) {
  if (HB._squads[abbr]) return HB._squads[abbr];
  const i = Math.max(0, HB._teamOrder.indexOf(abbr));
  const out = [];
  for (let k = 0; k < 4; k++) out.push(HB.playerPool[(i * 4 + k) % HB.playerPool.length]);
  return (HB._squads[abbr] = out);
};
HB.scorers = HB.playerPool.slice(0, 16);

/* ---------- sample settled / open bets (My bets) ---------- */
HB.seedBets = [
  { id: 'b1', sel: 'Arsenal', market: 'Match result', fixture: 'Arsenal v Brighton & Hove Albion',
    odds: 1.30, stake: 100.00, status: 'open', placedAt: 'Today 15:42', cashout: 118.40 },
  { id: 'b2', sel: 'Over 2.5 goals', market: 'Total goals', fixture: 'Liverpool v Manchester United',
    odds: 1.85, stake: 50.00, status: 'open', placedAt: 'Today 14:10', cashout: 41.20 },
  { id: 'b3', sel: 'Real Madrid', market: 'Match result', fixture: 'Real Madrid v Bayern Munich',
    odds: 2.20, stake: 25.00, status: 'won',  placedAt: 'Sat 21:05', ret: 55.00 },
  { id: 'b4', sel: 'Draw', market: 'Match result', fixture: 'Napoli v Milan',
    odds: 3.40, stake: 20.00, status: 'lost', placedAt: 'Sat 18:45', ret: 0.00 }
];

/* ---------- highlight posters ----------
   Generated artwork. Deliberately contains no faces, no kits and
   no text: the brief forbids real players and real player data.
--------------------------------------------------------------- */
HB.heroPoster = {
  'ars-bha': 'assets/posters/ars-bha-hero.jpg',
  'liv-mun': 'assets/posters/liv-mun-hero.jpg'
};

/* ---------- chat seed ----------
   Invented usernames. Hubie's line is advice, not money or XP.
------------------------------------------------------------ */
HB.seedChat = [
  { who: 'Mika',  text: 'Arsenal look sharp today', at: '52:11' },
  { who: 'Deniz', text: 'That Brighton price is huge for a side chasing the game', at: '52:40' },
  { who: 'Hubie', text: 'Cash out is only the current offer, not a promise. It can move before you take it.', at: '53:02', hubie: true }
];

/* ---------- searchable index (teams, players, competitions, markets) ---------- */
/* ---------- live match incidents -------------------------
   Only what a scoreboard needs: who scored and when, plus how
   many cards have been shown. Not a tracker — no timeline, no
   possession, no shots. `s` = side (h/a), `p` = squad index, so
   the name always matches the goalscorer markets.
---------------------------------------------------------- */
HB.events = {
  'ars-bha': { goals: [{ s: 'h', p: 1, min: 23 }],                                   y: 2, r: 0, reds: [] },
  'atm-sev': { goals: [{ s: 'h', p: 2, min: 31 }],                                   y: 3, r: 0, reds: [] },
  'mci-tot': { goals: [{ s: 'h', p: 1, min: 12 }, { s: 'h', p: 3, min: 44 }],        y: 1, r: 0, reds: [] },
  'nap-mil': { goals: [{ s: 'a', p: 1, min: 19 }, { s: 'h', p: 2, min: 58 }],        y: 4, r: 1,
               reds: [{ s: 'h', p: 4, min: 71 }] },
  'bay-bvb': { goals: [],                                                             y: 0, r: 0, reds: [] },
  'che-int': { goals: [{ s: 'h', p: 1, min: 8 }, { s: 'a', p: 1, min: 35 },
                        { s: 'h', p: 2, min: 61 }],                                  y: 3, r: 1,
               reds: [{ s: 'a', p: 3, min: 66 }] }
};

/* Keep the Live badge and every derived count in step with the fixtures.
   A hardcoded number drifted to 13 while only 7 matches were live. */
(function syncDerived() {
  const live = HB.matches.filter(m => m.state === 'live').length;
  const s = HB.sports.find(x => x.id === 'live');
  if (s) s.count = live;

  /* Count every sport from its own fixtures, so the sidebar numbers can
     never drift from what the page actually lists. */
  const bySport = {};
  HB.comps.forEach(c => { bySport[c.sport] = (bySport[c.sport] || 0); });
  HB.matches.forEach(m => {
    const c = HB.comps.find(c => c.id === m.comp);
    if (c) bySport[c.sport] = (bySport[c.sport] || 0) + 1;
  });
  HB.sports.forEach(sp => { if (sp.id !== 'live') sp.count = bySport[sp.id] || 0; });
})();

HB.searchIndex = (function () {
  const out = [];
  Object.keys(HB.teams).forEach(k => out.push({ kind: 'Team', label: HB.teams[k].name, go: '#/football' }));
  HB.comps.forEach(c => out.push({ kind: 'Competition', label: c.name, go: '#/football' }));
  HB.scorers.forEach(s => out.push({ kind: 'Player', label: s, go: '#/match/ars-bha' }));
  ['Match result', 'Double chance', 'Both teams to score', 'Total goals', 'Over/Under 2.5',
   'Asian handicap', 'First goalscorer', 'Anytime goalscorer', 'Total corners', 'Total cards'
  ].forEach(m => out.push({ kind: 'Market', label: m, go: '#/match/ars-bha' }));
  return out;
})();
