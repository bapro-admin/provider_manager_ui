export class Provider {
    id_provider: number;
    commercialName: string;
    businessName: string;
    phone?: string;
    rfc?: string;
    address?: string;
    sellerFullName?: string;
    operatorUsername?: string;
    created_at?: Date;
    updated_at?: Date;
    operatorId?: number;

    constructor(data: Partial<Provider>) {
        this.id_provider = data.id_provider || 0;
        this.commercialName = data.commercialName || '';
        this.businessName = data.businessName || '';
        this.phone = data.phone;
        this.rfc = data.rfc;
        this.address = data.address;
        this.sellerFullName = data.sellerFullName;
        this.operatorUsername = data.operatorUsername
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.operatorId = data.operatorId;
    }
}