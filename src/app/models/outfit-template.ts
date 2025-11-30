export interface OutfitTemplateResponse {
    id: number;
    name?: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}

export interface OutfitTemplateParameterResponse {
    outfit_template_id: number;
    category_sub_id: number;
    created_at: Date;
}