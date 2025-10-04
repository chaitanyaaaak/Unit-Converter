document.addEventListener('DOMContentLoaded', function() {

    const CONVERSIONS = {
        METER_TO_FEET: 3.28084,
        LITER_TO_GALLON: 0.264172,
        KILOGRAM_TO_POUND: 2.20462
    };

    const state = {
        lengthSwapped: false,
        volumeWapped: false,
        massSwapped: false,
    }

    // DOM elements

    const inputVal = document.getElementById('input-value');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;

    const cards = {
        length: {
            title: document.getElementById('length-title'),
            content: document.querySelector('#length-card .result-content'),
        },
        volume: {
            title: document.getElementById('volume-title'),
            content: document.querySelector('#volume-card .result-content'),
        },
        mass: {
            title: document.getElementById('mass-title'),
            content: document.querySelector('#mass-card .result-content'),
        }
    };
});