import state from "./state.js"
import * as timer from "./timer.js"
import * as elements from "./elements.js"
import * as sounds from "./sound.js"

export function toggleRunning() {
    state.isRunning = document.documentElement.classList.toggle('running')

    timer.countdown()

    sounds.buttonPressAudio.play()
}

export function reset() {
    state.isRunning = false
    document.documentElement.classList.remove('running')
    timer.updateDisplay()

    sounds.buttonPressAudio.play()
}

export function set() {
    elements.minutes.setAttribute('contenteditable', true)
    elements.minutes.focus()
}

export function timePlus() {
    state.minutes = elements.minutes.textContent
    state.minutes = Number(state.minutes) + 5
    elements.minutes.textContent = String(state.minutes).padStart(2, "0")
}

export function timeMinus() {
    state.minutes = elements.minutes.textContent
    state.minutes = Number(state.minutes) - 5
    
    if (state.minutes < 0) {
        state.minutes = 0
    }
    
    elements.minutes.textContent = String(state.minutes).padStart(2, "0")
}

export function floresta() {
    toggleSound('floresta')
}

export function chuva() {
    toggleSound('chuva')
}

export function cafeteria() {
    toggleSound('cafeteria')
}

export function lareira() {
    toggleSound('lareira')
}

export function toggleSound(tipo) {
    let elements = []
    elements['floresta'] = document.getElementById('floresta')
    elements['chuva'] = document.getElementById('chuva')
    elements['cafeteria'] = document.getElementById('cafeteria')
    elements['lareira'] = document.getElementById('lareira')

    for(let type in elements) {
        if (type == tipo) {
            state.isMute = elements[tipo].classList.toggle('btn_pressed')
        } else {
            elements[type].classList.remove('btn_pressed')
        }
    }

    let soundsList = []
    soundsList['florestaAudio'] = 'florestaAudio'
    soundsList['chuvaAudio'] = 'chuvaAudio'
    soundsList['cafeteriaAudio'] = 'cafeteriaAudio'
    soundsList['lareiraAudio'] = 'lareiraAudio'

    sounds.florestaAudio.pause()
    sounds.chuvaAudio.pause()
    sounds.cafeteriaAudio.pause()
    sounds.lareiraAudio.pause()

    if(state.isMute) {
        switch (tipo) {
            case 'floresta':
                sounds.florestaAudio.play()
                break;
            case 'chuva':
                sounds.chuvaAudio.play()
                break;
            case 'cafeteria':
                sounds.cafeteriaAudio.play()
                break;
            case 'lareira':
                sounds.lareiraAudio.play()
                break;
            default:
                break;
        }
    }
}