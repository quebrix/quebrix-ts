export interface IQuebrixSetPayload {
    cluster: string,
    key: string,
    value: string,
    ttl?: number
}

export interface IQuebrixPartials extends Omit<IQuebrixSetPayload, 'value' | 'ttl'> {

}
