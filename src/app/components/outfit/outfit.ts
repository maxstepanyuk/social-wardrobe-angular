import { Garment } from "../garment/garment";

export interface Outfit {
    id: number,
    name: string,
    img: string,
    type: string,
    date: Date,
    // garmentsId: number[]; //TODO later??
    garments: Garment[]; //for now (or forever?)
}
//TODO add userId
