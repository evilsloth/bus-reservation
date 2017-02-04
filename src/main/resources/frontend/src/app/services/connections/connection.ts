export interface Connection {
    id?: number;
    startPlace: string;
    endPlace: string;
    distance: number;
    departureDate: string;
    arrivalDate: string;
    places: number;
    takenPlaces: number;
}
