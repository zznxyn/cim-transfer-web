let resetLocalStorage = function (key, newVal) {
    if (key === 'activePath') {
 
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
            setItem: function (k, val) {
                sessionStorage.setItem(k, val);
                // 初始化创建的事件
                newStorageEvent.initStorageEvent('resetLocalStorage', false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(newStorageEvent)
            }
        }
        return storage.setItem(key, newVal);
    }
 }
 
 export default resetLocalStorage