// 定义树节点变量名
class TreeDataParams {
    constructor(id, label, parentId, icon, type, accept, disabled) {
        this.id = id === undefined ? this.id : id
        this.label = label === undefined ? this.label : label
        this.parentId = parentId === undefined ? this.parentId : parentId
        this.icon = icon === undefined ? this.icon : icon
        this.disabled = disabled === undefined ? this.disabled : disabled
        this.type = type === null ? this.type : type
        this.accept = accept === undefined ? this.accept : accept
    }

    id = 'id'
    label = 'name'
    icon = 'icon'
    disabled = 'disabled'
    parentId = 'parentId'
    type = 'type'
    accept = 'accept'
}

export default TreeDataParams
