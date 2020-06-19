export const sortTable = (stateKey, fieldKey) => (state, payload) => {
    const sortDir = state[stateKey][0][fieldKey] > state[stateKey][1][fieldKey] ? -1 : 1
    return {
        ...state,
        ...{[stateKey]: state[stateKey].sort((a, b) => a[fieldKey] < b[fieldKey] ? sortDir : sortDir * -1).map(it => it)}
    }
}
