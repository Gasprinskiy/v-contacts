
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

export const searchInDbByKeyWord = async ({target, where, words, filtertarget, filtervalue }) => {
    const searchChain = defineSearchChain(target, where, words)
    const result = await eval(searchChain)
    if(filtervalue !== '') { result.and(item => item[filtertarget] === filtervalue) }
    return result.toArray()
}

export const searchInDbByKeyWordsIfQuerryMoreThenOneString = async(options, {includkey}) => {
    const result = await searchInDbByKeyWord(options)
    const words = options.words.toString().replace(',', ' ')
    return result.filter(item => item[includkey].toLowerCase().includes(words.toLowerCase()))
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

const defineSearchChain = (target, where, words) => {
    const sourceKeys = JSON.stringify(where)
    const sourceWords = JSON.stringify(words)
    const firstKey = JSON.parse(sourceKeys).shift()
    const fisrtWord = JSON.parse(sourceWords).shift()
    let searchChain = `db['${target}'].where('${firstKey}').startsWithAnyOfIgnoreCase('${fisrtWord}')`
    if(where.length > 0) {
        JSON.parse(sourceKeys).forEach(key => {
            searchChain += `.or('${key}').startsWithAnyOfIgnoreCase('${fisrtWord}')`
        });
    }
    return searchChain
}