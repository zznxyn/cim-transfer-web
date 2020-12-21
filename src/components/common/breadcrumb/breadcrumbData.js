class BreadcrumbData {
    constructor(name, memo, clicked) {
        this.name = name
        this.memo = memo === undefined? this.memo: memo
        this.clicked = clicked
    }
    name = ''
    memo = {}
    clicked() {
        return
    }
}

export default BreadcrumbData