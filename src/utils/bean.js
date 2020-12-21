class BeanUtils {
    /**
     * 基于target已有属性，将source的属性值复制给target对象，不会增加target的属性
     */
    static copyProp(target, source) {
        for (const key in target) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
        return target
    }
}
export default BeanUtils
