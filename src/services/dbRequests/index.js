
import { db } from '../dexie/'
import { makeFirstLetterSections } from '../helpers/'

export const getSortedData = async ({target, sortvalue}) => {
    const response = await db[target].orderBy(sortvalue).toArray();
    return makeFirstLetterSections({array: response, target: sortvalue})
}

export const getDataByKeyValue = async ({target, keyValue}) => {
    return await db[target].get(keyValue)
}

export const getDataCountByKeyValue = async ({target, key, value}) => {
    return await db[target].where(key).equalsIgnoreCase(value).count()
}

export const searchInDbByKeyWords = async ({target, where, words, filtertarget, filtervalue }) => {
    const firstKey = where.shift()
    let searchChain = `db['${target}'].where('${firstKey}').startsWithAnyOfIgnoreCase('${words}')`
    if(where) {
        where.forEach(key => {
            searchChain += `.or('${key}').startsWithAnyOfIgnoreCase('${words}')`
        });
    }
    const result = eval(searchChain)
    if(filtervalue !== '') { result.and(item => item[filtertarget] === filtervalue) }
    return result.toArray()
}

export const addData = async ({target, payload}) => {
    return await db[target].add(payload)
}

export const putData = async ({target, payload}) => {
    return await db[target].put(payload)
}

export const deleteData = async ({target, id}) => {
    return await db[target].delete(id)
}