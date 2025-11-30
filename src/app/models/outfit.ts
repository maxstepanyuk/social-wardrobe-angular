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


export interface OutfitCreate {
    name?: string;
    description?: string;
    image_link?: string;
}


export interface OutfitResponse {
    name?: string;
    description?: string;
    image_link?: string;

    id: number;
    user_id: number;

    created_at: Date;
    updated_at: Date;
}

export interface CreateRandomOutfitParams {
    category_sub_ids: number[];
    gender_ids?: number[]
}