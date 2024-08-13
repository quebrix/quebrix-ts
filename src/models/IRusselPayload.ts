export interface IRusselSetPayload {
    cluster: string,
    key: string,
    value: string,
    ttl?: number
}

export interface IRusselPartials extends Omit<IRusselSetPayload, 'value' | 'ttl'> {

}
