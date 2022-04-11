
let grid = document.querySelector('#grid')
let ques = document.querySelector('#question')
let matchBtn = document.querySelector('#match')
let noMatchBtn = document.querySelector('#no-match')
let trueBtn = document.querySelector('#true')
let falseBtn = document.querySelector('#false')
const buttonsDiv = document.querySelector("#buttons");
const devDiv = document.querySelector("#dev");
const wordListElem = document.querySelector("#word-list");

// Hide elements
grid.style.display = "none";
matchBtn.style.display = "none";
noMatchBtn.style.display = "none";
trueBtn.style.display = "none";
falseBtn.style.display = "none";
wordListElem.style.display = "none";
ques.style.display = "none";



let baseline = 0;
let dotGrid = []
let isMatch = false
let mode = 'baseline-test'

let waitTime = 3_000 // ms
let questionUsed = {}
let questionIndex = 0;

let trial = []

let questions = [
    ["Some cod are fish", "a"],
    ["Some reptiles are crocodiles", "b"],
    ["There are no birds that aren't eagles", "e"],
    ["There are no reptiles that aren't alligators", "e"],
    ["There are no birds that aren't owls", "e"],
    ["Some birds are plants", "c"],
    ["There are no cod that aren't fish", "d"],
    ["There are no fish that aren't piranhas", "e"],
    ["Some reptiles are iguanas", "b"],
    ["Some alligators are reptiles", "a"],
    ["Some fish are insects", "c"],
    ["Some iguanas are reptiles", "a"],
    ["There are no fish that aren't cod", "e"],
    ["Some birds are crows", "b"],
    ["There are no eagles that aren't birds", "d"],
    ["Some piranhas are fish", "a"],
    ["Some frogs are reptiles", "a"],
    ["Some fish are cod", "b"],
    ["There are no reptiles that aren't crocodiles", "e"],
    ["Some birds are owls", "b"],
    ["Some reptiles are insects", "c"],
    ["Some fish are shellfish", "c"],
    ["Some reptiles are plants", "c"],
    ["There are no reptiles that aren't iguanas", "e"],
    ["There are no carp that aren't fish", "d"],
    ["Some birds are canaries", "b"],
    ["There are no piranhas that aren't fish", "d"],
    ["Some fish are anchovies", "b"],
    ["Some carp are fish", "a"],
    ["Some crocodiles are reptiles", "a"],
    ["Some fish are mammals", "c"],
    ["There are no frogs that aren't reptiles", "d"],
    ["Some birds are eagles", "b"],
    ["Some eagles are birds", "a"],
    ["Some reptiles are mammals", "c"],
    ["Some birds are insects", "c"],
    ["Some crows are birds", "a"],
    ["Some birds are shellfish", "c"],
    ["There are no crocodiles that aren't reptiles", "d"],
    ["There are no birds that aren't canaries", "e"],
    ["There are no fish that aren't carp", "e"],
    ["There are no owls that aren't birds", "d"],
    ["There are no reptiles that aren't frogs", "e"],
    ["There are no alligators that aren't reptiles", "d"],
    ["Some fish are carp", "b"],
    ["Some fish are plants", "c"],
    ["Some reptiles are frogs", "b"],
    ["Some anchovies are fish", "a"],
    ["Some owls are birds", "a"],
    ["There are no anchovies that aren't fish", "d"],
    ["Some canaries are birds", "a"],
    ["There are no birds that aren't crows", "e"],
    ["There are no fish that aren't anchovies", "e"],
    ["Some reptiles are shellfish", "c"],
    ["Some reptiles are alligators", "b"],
    ["There are no canaries that aren't birds", "d"],
    ["Some fish are piranhas", "b"],
    ["Some birds are mammals", "c"],
    ["There are no iguanas that aren't reptiles", "d"],
    ["There are no crows that aren't birds", "d"]
]

// Logs a trial block
const dataset = {
    baseline: 0,
    someId: '',
    questions: []
}


// Shuffle the question list before presenting
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(questions)

// Generate the 5x5 grid
const generateDotGrid = () => {
    dotGrid = new Array(25).fill(0)
    console.log('generateDotGrid()')
    let currentNumDots = 0

    while (currentNumDots < baseline) {
        let rand = Math.ceil(Math.random() * 25)
        if (dotGrid[rand] === 0) {
            dotGrid[rand] = 1
            currentNumDots++
        }
    }
    // console.log('dotGrid:', dotGrid)
}

// Changes on dot of that grid
const changeOneDot = () => {
    console.log('changeOneDot()')
    let dotChanged = false

    while (dotChanged == false) {
        let rand = Math.ceil(Math.random() * 25)
        if (dotGrid[rand] === 0 && dotGrid[rand + 1] === 1) {
            dotGrid[rand] = 1
            dotGrid[rand + 1] = 0
            dotChanged = true
        }
        if (dotGrid[rand] === 0 && dotGrid[rand - 1] === 1) {
            dotGrid[rand] = 1
            dotGrid[rand - 1] = 0
            dotChanged = true
        }
    }
}
// Displays dot grid
const displayGrid = () => {
    console.log('displayGrid')
    for (let i = 1; i <= 5; i++) {
        let currentRow = document.querySelector(`#row-${i}`)
        for (let j = 1; j <= 5; j++) {
            currentRow.innerHTML += `<td>${dotGrid[(i - 1) * 5 + j - 1] === 1 ? 'X' : ''}</td>`
        }
    }
}
// Shows match buttons in the dot/word list
const showMatchButtons = (b) => {
    console.log('showMatchButtons')

    if (b) {
        matchBtn.style.display = 'block'
        noMatchBtn.style.display = 'block'
    } else {
        matchBtn.style.display = 'none'
        noMatchBtn.style.display = 'none'
    }
}

// Shows true/false buttons for sentence judgements
const showStimuliButtons = (b) => {
    console.log('showStimuliButtons')

    if (b) {
        trueBtn.style.display = 'block'
        falseBtn.style.display = 'block'
    } else {
        trueBtn.style.display = 'none'
        falseBtn.style.display = 'none'
    }
}

const showGrid = (b) => {
    console.log('showGrid')

    if (b) {
        grid.style.display = 'block'
        ques.style.display = 'none'
    } else {
        grid.style.display = 'none'
        ques.style.display = 'block'
    }
}

const emptyGrid = () => {
    console.log('emptyGrid')

    document.querySelector('#row-1').innerHTML = ''
    document.querySelector('#row-2').innerHTML = ''
    document.querySelector('#row-3').innerHTML = ''
    document.querySelector('#row-4').innerHTML = ''
    document.querySelector('#row-5').innerHTML = ''
}

const insertRandomQuestion = () => {
    console.log('insertRandomQuestion')

    // questionIndex++
    // questionUsed = questions[questionIndex]
    questionUsed = questions[Math.floor(Math.random() * questions.length)]
    ques.innerHTML = questionUsed[0]
}

// runs when true/false button is clicked
const checkAnswer = (b) => {
    console.log('checkAnswer')
    showStimuliButtons(false)
    showGrid(true)
    showMatchButtons(true)

    questionIndex++
    trial = [...questionUsed, b]

    console.log('dataset:', dataset.questions)
    // showMatchButtons(fa)
}

/**
 * Re-runs baseline test if in baseline-test mode. Else, runs test-1.
 * runs when match/no-match button in clicked.
 * */
const checkMatch = (b) => {
    console.log('checkMatch')
    if (mode == 'baseline-test') {
        if (isMatch !== b) {
            let rand = Math.random()
            if (rand > 0 && rand < .33) {
                startDotsExperimentalTest()
                mode = 'test-1'
            } else if (rand >= .33 && rand < .66) {
                startDotsExperimentalTest()
                // startTest2()
                mode = 'test-1'
            } else {
                startDotsExperimentalTest()
                // startTest3()
                mode = 'test-1'
            }
            console.log(`match failed = startDotsExperimentalTest. Expected: ${isMatch}, received: ${b}`)
        } else {
            startDotsBaselineTest()
            console.log('match pass - increase baseline')
        }
    }
    else if (mode === 'test-1') {
        console.log("TEST 1 - CHECK MATCH")
        if (isMatch !== b) {
            trial.push('incorrect match')
        } else {
            trial.push('correct match')
        }
        dataset.questions.push(trial)
        startDotsExperimentalTest()
    }

}


const whenFinished = () => {
    fetch('someserver.com/results', {
        body: {
            id: '', // string asigned by a service
            set: 'a', // one of the sets 
            type: '',   // the type of stimuli
            question: '', // the actual question displayed
            match: false, // wether the dot match was successful
            baseline: 7, // the basiline reached in prelim test
        }
    })
}

// Insert a link for participant credit here
const showThanks = () => { }


// Where is this used??
const restart = () => {
    isMatch = false
    baseline = 0
    emptyGrid()
    startDotsBaselineTest()
}


const startDotsBaselineTest = () => {
    console.log('startDotsBaselineTest')
    if (baseline >= 12) startDotsExperimentalTest()

    baseline++
    isMatch = true

    // Generate grid array and display empty grid with X (starts hidden)
    generateDotGrid()
    emptyGrid()
    displayGrid()


    showMatchButtons(false)
    showStimuliButtons(false)
    showGrid(true) // use css style to show grid

    setTimeout(() => {
        // hide grid, wait...
        showGrid(false)
        setTimeout(() => {
            // show second grid with match buttons
            emptyGrid()
            displayGrid()
            showGrid(true)
            showMatchButtons(true)
        }, waitTime)
    }, waitTime)

    if (Math.random() >= .5) {
        changeOneDot()
        console.log('changing a dot - isMatch is now false')
        isMatch = false
    }

    //displayGrid()
    //showMatchButtons(true)


}

const startDotsExperimentalTest = () => {
    console.log('startDotsExperimentalTest')
    // check if all questions have been asked
    if (questionIndex >= questions.length) { showThanks() }
    isMatch = true

    generateDotGrid()
    emptyGrid()
    displayGrid()
    showMatchButtons(false)
    showGrid(true)

    if (Math.random() >= .5) {
        changeOneDot()
        isMatch = false
    }

    setTimeout(() => {
        showGrid(false)
        insertRandomQuestion()
        showStimuliButtons(true)
        // showGrid(true)
        // showMatchButtons(true)
    }, waitTime);
}

/**
 * WORDS
 */

const showWordList = () => {
    wordListElem.style.display = "initial"
    ques.style.display = 'none'
};

const hideWordList = () => {
    wordListElem.style.display = 'none'
    ques.style.display = 'initial'
}

const startWordsBaselineTest = () => {
    console.log("startWordsBaselineTest")

    if (baseline >= 12) startDotsExperimentalTest()

    baseline++
    isMatch = true

    // display words
    showWordList();

    setTimeout(() => {
        // hide words, wait...
        hideWordList()
        setTimeout(() => {
            // show second word list
            showWordList();
            showMatchButtons(true);
        }, waitTime)
    }, waitTime)

    // if (Math.random() >= .5) {
    //     changeOneDot()
    //     console.log('changing a dot - isMatch is now false')
    //     isMatch = false
    // }
}

/**
 * NO INTERFERENCE
 */

/**
 * 
 * words => word baseline, experimental ("baseline with sentences")
 * dots => dot baseline, dot experimental (baseline with sentences)
 * no-interference => experimental (only sentences)
 *
 */

let rand = Math.random()
if (rand > 0 && rand < .33) {
    startDotsBaselineTest()
} else if (rand >= .33 && rand < .66) {
    startWordsBaselineTest();
} else {
    console.log("TODO: startNoInterferenceExperimentalTest")
    // startNoInterferenceExperimentalTest()
}
