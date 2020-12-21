(function () {
    /**
     * 获取唯一数字
     * @returns {number}
     */
    function uniqueNumber() {
        let date = Date.now();
        if (date <= uniqueNumber.previous) {
            date = ++uniqueNumber.previous;
        } else {
            uniqueNumber.previous = date;
        }
        return date;
    }

    window.Hook = {
        hooks: [],
        add(name, callback, group, once) {
            let id = uniqueNumber();
            this.hooks.push({
                id,
                name,
                once,
                group,
                callback
            });
            return id;
        },
        addOnce(name, callback) {
            return this.add(name, callback, undefined, true);
        },
        run(name, a, b, c, d, e, f, g) {
            for (let i = 0; i < this.hooks.length; i++) {
                let h = this.hooks[i];
                if (h.name === name) {
                    try {
                        if (typeof h.callback === "function") {
                            h.callback(a, b, c, d, e, f, g);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    if (h.once) {
                        this.hooks.splice(i--, 1);
                    }
                }
            }
        },
        remove(...id) {
            for (let i = 0; i < this.hooks.length; i++) {
                if (id.indexOf(this.hooks[i].id) >= 0) {
                    this.hooks.splice(i, 1);
                }
            }
        },
        removeByGroup(group) {
            for (let i = 0; i < this.hooks.length; i++) {
                if (this.hooks[i].group === group) {
                    this.hooks.splice(i, 1);
                }
            }
        }
    };
})();
