export interface GarmentOld {
    id: number,
    name: string,
    img: string,
    type: string,
    date: Date,
}

export interface GarmentCreate {
    name?: string;
    description?: string;
    image_link?: string;
    last_worn?: Date;

    gender_id?: number;
    category_master_id?: number;
    category_sub_id?: number;
    garment_type_id?: number;
    color_id?: number;
    season_id?: number;
    usage_id?: number;

    hex?: string;
}

export interface GarmentClassify {
    gender_id?: number;
    category_master_id?: number;
    category_sub_id?: number;
    garment_type_id?: number;
    color_id?: number;
    season_id?: number;
    usage_id?: number;
}

export interface GarmentResponse {
    id: number;
    user_id: number;

    created_at: Date;
    updated_at: Date;

    name?: string;
    description?: string;
    image_link?: string;
    last_worn?: Date;

    gender_id?: number;
    category_master_id?: number;
    category_sub_id?: number;
    garment_type_id?: number;
    color_id?: number;
    season_id?: number;
    usage_id?: number;

    hex?: string;
}

export interface FilterGarmentsByParams {
    gender_ids?: number[]
    category_master_ids?: number[];
    category_sub_ids?: number[];
    season_ids?: number[]
    usage_ids?: number[]
    color_ids?: number[]
    garment_type_ids?: number[]
}