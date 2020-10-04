export type Entity = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly endorsements: ReadonlyArray<Entity>;
};