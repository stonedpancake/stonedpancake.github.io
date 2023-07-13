let gradientsArray = [
    'linear-gradient(111deg, #7646a1, #de3db5)',
    'linear-gradient(290deg, #97e338, #151378)',
    'linear-gradient(208deg, #4ca548, #990691)',
    'linear-gradient(243deg, #d8c61d, #9d17bb)',
    'linear-gradient(245deg, #03c21d, #2a9985)',
    'linear-gradient(173deg, #b65ca4, #565771)',
    'linear-gradient(265deg, #6ab9a8, #b824a5)',
    'linear-gradient(108deg, #18ab65, #d505cc)',

    'linear-gradient(111deg, #7646a1, #de3db5)',
    'linear-gradient(290deg, #97e338, #151378)',
    'linear-gradient(208deg, #4ca548, #990691)',
    'linear-gradient(243deg, #d8c61d, #9d17bb)',
    'linear-gradient(245deg, #03c21d, #2a9985)',
    'linear-gradient(173deg, #b65ca4, #565771)',
    'linear-gradient(265deg, #6ab9a8, #b824a5)',
    'linear-gradient(108deg, #18ab65, #d505cc)',
],
    cardsDict = {
        'card-1': undefined,
        'card-2': undefined,
        'card-3': undefined,
        'card-4': undefined,
        'card-5': undefined,
        'card-6': undefined,
        'card-7': undefined,
        'card-8': undefined,
        'card-9': undefined,
        'card-10': undefined,
        'card-11': undefined,
        'card-12': undefined,
        'card-13': undefined,
        'card-14': undefined,
        'card-15': undefined,
        'card-16': undefined,
    },
    calls = 0, 
    previousNum = 0,
    cardsDictKeysArray = Object.keys(cardsDict),
    sessionA = '',
    sessionB = '',
    sessionGradients = [],
    sectionElements = [],
    locSession = 0,
    locClass = '',
    cardsElement = document.querySelector('.cards-field').querySelector('.cards'),
    coloredCards = [],
    gradientIndex = 0,
    usedGradients = [],
    level = 3000,
    rangeSlider = document.querySelector('.cards-field').querySelector('.slidecontainer'),
    levelSelected = false

function getRandomInt(max) {
    let locRandomNum = Math.floor(Math.random() * max)

    calls++

    if (calls == 1) {
        previousNum = locRandomNum
        return locRandomNum
    }
    else if (calls == 2) {
        calls = 0

        while (locRandomNum == previousNum) {
            locRandomNum = Math.floor(Math.random() * max)
        }

        previousNum = 0

        return locRandomNum
    }
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))



rangeSlider.querySelector('.range-slider').addEventListener('input', () => {
    if (rangeSlider.querySelector('.range-slider').value >= 0 && rangeSlider.querySelector('.range-slider').value <= 25) {
        level = 5000
    } else if (rangeSlider.querySelector('.range-slider').value > 25 && rangeSlider.querySelector('.range-slider').value <= 50) {
        level = 4000
    } else if (rangeSlider.querySelector('.range-slider').value > 50 && rangeSlider.querySelector('.range-slider').value <= 75) {
        level = 3000
    } else if (rangeSlider.querySelector('.range-slider').value > 75 && rangeSlider.querySelector('.range-slider').value <= 100) {
        level = 2000
    }
})

rangeSlider.querySelector('.submit-level').addEventListener('mousedown', () => {
    rangeSlider.querySelector('.submit-level').style.pointerEvents = 'none'
    initialize()
})

function initialize () {

    rangeSlider.style.marginBottom = '0px'

    while (((coloredCards.length < cardsDictKeysArray.length + 2)) && (Object.values(cardsDict).includes(undefined))) {
        gradientShuffle()
    }

    cardsElement.querySelectorAll('.card').forEach(async (el) => {
        await sleep(level)
        el.style.border = '38px solid darkslateblue'
    })

    function gradientShuffle () {

        while (coloredCards.includes(sessionA) || coloredCards.includes(sessionB)) {
            sessionA = cardsDictKeysArray[getRandomInt(cardsDictKeysArray.length)]
            sessionB = cardsDictKeysArray[getRandomInt(cardsDictKeysArray.length)]
        }

        coloredCards.push(sessionA, sessionB)

        if (sessionA && sessionB) {

            cardsDict[sessionA] = gradientsArray[gradientIndex]
            cardsDict[sessionB] = gradientsArray[gradientIndex]

            gradientIndex++
        }

    }

    cardsElement.querySelectorAll('.card').forEach((el) => {
        el.style.background = cardsDict[el.getAttribute('class').slice(5)]
    })

    cardsElement.querySelectorAll('.card').forEach((el) => {
        el.addEventListener('mousedown', (() => {

            locClass = el.getAttribute('class').slice(5)

            sectionElements.push(el)
            sessionGradients.push(cardsDict[locClass])

            cardsElement.querySelector(`.${locClass}`).style.border = 'none'
            cardsElement.querySelector(`.${locClass}`).style.pointerEvents = 'none'

            locSession++

            if (locSession == 2) {

                if (sessionGradients[0] == sessionGradients[1]) { 
                    console.log('match')
                } 
                else {
                    sectionElements[0].style.pointerEvents = 'all'
                    sectionElements[0].style.border = '38px solid darkslateblue'

                    sectionElements[1].style.pointerEvents = 'all'
                    sectionElements[1].style.border = '38px solid darkslateblue'
                }

                locSession = 0

                sectionElements = []
                sessionGradients = []
            }
        }))
    })
}