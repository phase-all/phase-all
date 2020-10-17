import { TemplateResult } from 'lit-html';

export type Entity = {
    readonly id: string;
    readonly createdDate: Date;
    readonly description: string;
    readonly endorsements: ReadonlyArray<Entity>;
    readonly markets: ReadonlyArray<Market>;
    readonly name: string;
};

export type Market = {
    readonly id: string;
    readonly active: boolean;
    readonly createdDate: Date;
    readonly dataRequests: ReadonlyArray<DataRequest>;
    readonly description: string;
    readonly endDate: Date;
    readonly name: string;
    readonly startDate: Date;
    readonly fundingIssued: number;
    readonly fundingRemaining: number;
    readonly fundingTotal: number;
};

export type DataRequest = {
    readonly id: string;
    readonly dataResponses: ReadonlyArray<DataResponse>;
    readonly description: string;
    readonly market: Readonly<Market>;
    readonly name: string;
    readonly fundingIssued: number;
    readonly fundingRemaining: number;
    readonly fundingTotal: number;
    readonly price: number;
};

export type DataResponse = {
    readonly id: string;
    readonly dataRequest: Readonly<DataRequest>;
    readonly dataFields: ReadonlyArray<DataField>;
};

export type DataField = {
    readonly id: string;
    readonly data: string;
    readonly dataResponse: Readonly<DataResponse>;
    readonly name: string;
};

export type Tab = {
    readonly title: string;
    readonly body: Readonly<TemplateResult>;
    readonly active: boolean;
};