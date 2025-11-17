import { GarmentOld } from "./garment";

export interface OutfitOld {
    id: number,
    name: string,
    img?: string,
    type: string,
    date: Date,
    // garmentsId: number[]; //TODO later??
    garments: GarmentOld[]; //for now (or forever?)
}
//TODO add userId
