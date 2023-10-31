let createNewRecentlyWatchedCard = function (name, image, price) {
    let cardBody = document.createElement("div")
    cardBody.classList.add("recentlyWatchedCard")
    cardBody.setAttribute("id", "RecentlyWatchedCardJs")

    let bucketIcon = document.createElement("img")
    bucketIcon.setAttribute('src', 'images/2.png')
    bucketIcon.classList.add("bucket")

    let thumbnail = document.createElement("img")
    thumbnail.setAttribute('src', image)
    thumbnail.classList.add("recently")

    let nameSpan = document.createElement("div")
    nameSpan.textContent = name
    nameSpan.classList.add("name")

    let priceSpan = document.createElement("div")
    priceSpan.textContent = price
    priceSpan.classList.add("price")

    cardBody.appendChild(bucketIcon)
    cardBody.appendChild(thumbnail)
    cardBody.appendChild(nameSpan)
    cardBody.appendChild(priceSpan)

    return cardBody
}

let createNewSliderCard = function (name, image, price, discount) {
    let cardBody = document.createElement("div")
    cardBody.classList.add("itemCard")

    let container = document.createElement("div")
    container.classList.add("thumbnail")

    let bucketIcon = document.createElement("img")
    bucketIcon.setAttribute('src', 'images/2.png')
    bucketIcon.classList.add("bucket")

    let thumbnail = document.createElement("img")
    thumbnail.setAttribute('src', image)
    thumbnail.classList.add("row_image")

    container.appendChild(bucketIcon)
    container.appendChild(thumbnail)

    let nameSpan = document.createElement("div")
    nameSpan.textContent = name
    nameSpan.classList.add("name_row")

    let priceSpan = document.createElement("div")
    priceSpan.textContent = price
    priceSpan.classList.add("price_row")

    if (discount) {
        let discountContainer = document.createElement("div")
        discountContainer.classList.add("discount_container")
        let discount = document.createElement("img")
        discount.setAttribute('src', 'images/11.svg')
        let discount2 = document.createElement("img")
        discount2.setAttribute('src', 'images/11.svg')
    }
    cardBody.appendChild(container)
    cardBody.appendChild(nameSpan)
    cardBody.appendChild(priceSpan)

    return cardBody
}


let createNewCategory = function (name, count) {
    let categoryBody = document.createElement("div")
    categoryBody.classList.add("flex_li")

    let nameDiv = document.createElement("div")
    nameDiv.innerText = name

    let countDiv = document.createElement("div")
    countDiv.innerText = count

    categoryBody.appendChild(nameDiv)
    categoryBody.appendChild(countDiv)

    return categoryBody
}

let createNewContainerCard = function (name) {
    let jsContainer = document.createElement("div")
    jsContainer.classList.add("jsContainer")

    let h2 = document.createElement("div")
    h2.classList.add("row_h2")
    h2.innerHTML = name

    let container = document.createElement("div")
    container.classList.add("container")

    let row = document.createElement("div")
    container.classList.add("row")

    let button = document.createElement("span")
    button.classList.add("button")
    button.innerHTML('>')

    container.appendChild(row)
    container.appendChild(button)
    jsContainer.appendChild(h2)
    jsContainer.appendChild(container)

    return jsContainer
}


function Item(arg1, arg2, arg3, arg4, arg5, arg6) {
    this.name = arg1
    this.price = arg2
    this.discount = arg3
    this.descrip = arg4
    this.category = arg5
    this.priceDiscount = arg2 - (arg2 * arg3 / 100)
    this.image = 'images/' + arg6
}

let item = new Item('nvidia rtx 4090ti titan ultra super mega gold  limited founders edition', 9999, 10, 'its powerful.', 'videocard', '4.png')
let item2 = new Item('Ugh oh just test', 599, 20, 'its powerful.', 'electronics', '4.png')
let item3 = new Item('logitech', 899, 10, 'its powerful.', 'keyboard', '4.png')
let item4 = new Item('msi', 19, 10, 'its powerful.', 'monitor', '4.png')
let item5 = new Item('intel core i9 13980xe ultra premium mego super perfomance', 999, 10, 'its powerful.', 'core', '4.png')
let item6 = new Item('rolex', 969, 30, 'its powerful.', 'electronics', '4.png')
let item7 = new Item('macbook', 899, 15, 'its powerful.', 'electronics', '4.png')


function Shop() {

    let bucket = []
    let recentlyWatchedItems = []

    this.add = function (item) {
        bucket.push(item)
    }

    this.all = function () {
        console.log(bucket)
    }

    this.getCategories = function () {
        let categories = bucket.map(function (item) {
            return item.category
        })
        let result = []
        categories.forEach(function (category) {
            if (result.indexOf(category) === -1) {
                result.push(category)
            }
        })
        return result
    }
    this.getCheaperThen = function (price) {
        return bucket.filter(function (item) {
            return item.price <= price
        })
    }
    this.addRecentlyWatched = function (item) {
        recentlyWatchedItems.push(item)
    }
    this.getRecentlyWatched = function () {
        return recentlyWatchedItems.map(function (item) {
            return item
        })
    }
    this.getCategoryCount = function (category) {
        return this.getCategoryItems(category).length
    }
    this.getCategoryItems = function (category) {
        return bucket.filter(function (item) {
            return item.category === category
        })
    }

}

let shop = new Shop
shop.add(item)
shop.add(item2)
shop.add(item3)
shop.add(item4)
shop.add(item5)
shop.add(item6)
shop.add(item7)

let categoryListEl = document.getElementById('jslist')
let categoriesHtmlItems = shop.getCategories().map(function (category) {
    return createNewCategory(category, shop.getCategoryCount(category))
})
categoriesHtmlItems.forEach(function (item) {
    categoryListEl.appendChild(item)
})


shop.addRecentlyWatched(item)
shop.addRecentlyWatched(item2)
shop.addRecentlyWatched(item3)

let saleList = document.getElementById('saleRowJs')

let recentlyListEl = document.getElementById('recentlyWatchedJs')
let recentlyWatchedItems = shop.getRecentlyWatched().map(function (item) {
    return createNewRecentlyWatchedCard(item.name, 'images/4.png', item.price)
}).forEach(function (item) {
    recentlyListEl.appendChild(item)
})


function printCategories() {
    shop.getCategories().forEach(function (category) {
        let p = 0
        function shift(right) {
            let card = list.getElementsByClassName('itemCard')
            if (card.length) {
                let rect = card[0].getBoundingClientRect()
                let containerRect = categoryRoot.getBoundingClientRect()
                let maxShift = Math.floor(containerRect.width/rect.width - 1)
                if (right) {
                    if (p !== 0) {
                        p -= 1
                    }
                }
                else {
                    if (p < card.length - 1) {
                        p += 1
                    }
                }
                list.style.transform = 'translate(' + (p * -rect.width) + 'px, 0)'
                console.log(maxShift)
            }
        }

        let categoryRoot = document.createElement("div")
        categoryRoot.classList.add('category-slider')
        let h2 = document.createElement("div")
        h2.classList.add('title')
        h2.innerHTML = category
        let buttonFirst = document.createElement('div')
        buttonFirst.classList.add('button-first')
        buttonFirst.innerHTML = '<'
        let button = document.createElement('div')
        button.classList.add('button')
        button.innerHTML = '>'
        button.addEventListener('click', function () {
            shift()
        })
        buttonFirst.addEventListener('click', function () {
            shift(true)
        })
        let list = document.createElement('div')
        list.classList.add('list')
        categoryRoot.appendChild(h2)
        categoryRoot.appendChild(list)
        categoryRoot.appendChild(button)
        categoryRoot.appendChild(buttonFirst)
        shop.getCategoryItems(category).forEach(function (item) {
            list.appendChild(createNewSliderCard(item.name, item.image, item.price, item.discount))
        })
        document.getElementById('js-container').appendChild(categoryRoot)
    })
}

printCategories()
