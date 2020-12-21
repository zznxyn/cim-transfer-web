const default_page = 1
const default_limit = 10

export function addPageParam(param) {
    if (param === undefined) {
        param = {}
    }
    Object.assign(param, {page: default_page, limit: default_limit})
}
