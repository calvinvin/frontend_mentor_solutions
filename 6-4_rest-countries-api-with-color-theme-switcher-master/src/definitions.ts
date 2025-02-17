export interface ICountry {
    altSpellings: string[],
    area: number,
    capital: string[],
    capitalInfo: {latlng: [number, number]}
    car: {signs: string[], side: string},
    cca2: string,
    cca3: string,
    ccn3: string,
    coatOfArms: {png: string, svg: string},
    continents: string[],
    currencies: {[key: string]: {name: string, symbol: string}}
    demonyms: {eng: {f: string, m: string}, [key: string]: {f: string, m: string}},
    flag: string,
    flags: {png: string, svg: string},
    idd: {root: string, suffixes: string[],}
    independent: boolean,
    landlocked: boolean,
    languages: {[key: string]: string},
    latlng: [number, number],
    maps: {googleMaps: string, openStreetMaps: string},
    name: {common: string, official: string, nativeName: {[key: string]: {official: string, common: string}}},
    population: number,
    region: string,
    subregion: string,
    startOfWeek: string,
    status: string,
    timezones: string[],
    tld?: string[],
    translations: {[key: string]: {official: string, common: string}}
    unMember: boolean,
}

export type TColorScheme = "light"|"dark"|undefined;