window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            const container = document.createElement('template')
            container.innerHTML = selectorOrArrayOrTemplate
            elements = container.content.firstChild
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
            console.log(elements)

        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }

    return {
        jquery :true,
        elements: elements,
        get(index) {
            return elements[index]
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent() {
            //此处为什么是node，而不是elements
            const arr = []
            this.each((node) => {
                if (arr.indexOf(node.parentNode) === -1) {
                    arr.push(node.parentNode)
                }
            })
            return jQuery(arr)
        },
        children() {
            let arr = []
            this.each((node) => {
                arr.push(...node.children())
            })
            return jQuery(arr)
        },
        print() {
            console.log(elements)
        },
        find(selector) {
            console.log(selector)
            let array = []
            for (let i = 0; i < elements.length; i++) {
                let elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            array.oldApi = this
            return jQuery(array)
        },
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },
        oldApi: selectorOrArrayOrTemplate.oldApi,
        end() {
            return this.oldApi
        }

    }


}

