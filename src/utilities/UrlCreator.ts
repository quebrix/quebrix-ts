function partialCreator (params:object){
    let partialString = '';
    Object.values(params).forEach((value) => {
        partialString += `/${encodeURIComponent(value)}`
    })
    return partialString
}

function partialItemEncoder (item:string){
    return encodeURIComponent(item)
}

export{
    partialItemEncoder,
    partialCreator
}
