import { IData } from "@/lib/definitions";

export function capitalizeString(string: string|string[]|undefined|null) {
    return (typeof string === 'string') ? (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()) : "";
}

export function planetInDestinations(planetQuery: string, dataDestinations: IData["destinations"]) {
    const destinationPlanets = dataDestinations.map(destination=>destination.name);
    return destinationPlanets.includes(planetQuery);
}

export function transformCrewQuery(crew:string|string[]|undefined|null) {
    if (typeof crew !== 'string') return ""
    const splitCrewQuery = crew.split(" ");
    const capitalizedSplitCrewQuery = splitCrewQuery.map((string: string)=>capitalizeString(string));
    return capitalizedSplitCrewQuery.join(" ");
}

export function crewInCrew(crewQuery: string, dataCrew: IData['crew']) {
    const crewNames = dataCrew.map(crew=>crew.name);
    return crewNames.includes(crewQuery);
}

export function technologyInTechnologies(technologyQuery: string, dataTechnology: IData['technology']) {
    const techonologies = dataTechnology.map(technology=>technology.name);
    return techonologies.includes(technologyQuery);
}