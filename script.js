document.addEventListener('DOMContentLoaded', function() {

    const CONVERSIONS = {
        METER_TO_FEET: 3.28084,
        LITER_TO_GALLON: 0.264172,
        KILOGRAM_TO_POUND: 2.20462
    };

    const state = {
        lengthSwapped: false,
        volumeSwapped: false,
        massSwapped: false
    }; 

    const inputVal = document.getElementById('input-value');
    const themeCheckBox = document.getElementById('theme-checkbox');
    const resultsSection = document.querySelector('.results-section');          
    const body = document.body;

    const cards = {
        length: {
            title: document.getElementById('length-title'),
            content: document.querySelector('#length-card .result-content')
        }, 
        volume: {
            title: document.getElementById('volume-title'),
            content: document.querySelector('#volume-card .result-content')
        },
        mass: {
            title: document.getElementById('mass-title'),
            content: document.querySelector('#mass-card .result-content')
        }
    };

    // functions to perform conversions

    function convertUnits() {
        const val = parseFloat(inputVal.value) || 0;

        updateCard('length', 'Meter', 'Feet', val, CONVERSIONS.METER_TO_FEET, state.lengthSwapped); 

        updateCard('volume', 'Liters', 'Gallons', val, CONVERSIONS.LITER_TO_GALLON, state.volumeSwapped);

        updateCard('mass', 'Kilograms', 'Pounds', val, CONVERSIONS.KILOGRAM_TO_POUND, state.massSwapped); 

    }

    
    function updateCard(type, unitA, unitB, value, rate, isSwapped) {

        const primaryUnit = isSwapped ? unitB : unitA;
        const secondaryUnit = isSwapped ? unitA : unitB;
        const primaryToSecondaryRate = isSwapped ? (1/rate) : rate;

        const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
        cards[type].title.textContent = `${typeTitle} (${primaryUnit}/${secondaryUnit})`;

        const conversion = (value * primaryToSecondaryRate).toFixed(3);

        const html = `
        <div class="result-line">
            <p class="result-text">
                ${value} ${primaryUnit.toLowerCase()} = ${conversion} ${secondaryUnit.toLowerCase()}
            </p>
            <button class="icon-btn copy-btn" data-value="${conversion}" aria-label="Copy value">
                <div class="tooltip">
                    Copied!
                </div>
                <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
            </button>
        </div>
        `;

        cards[type].content.innerHTML = html;
    } 

    function toggleTheme() {
        if (themeCheckBox.checked) {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark-mode';

        if (savedTheme === 'light-mode') {
            themeCheckBox.checked = true;
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            themeCheckBox.checked = false;
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        }
    }

    // event listeners

    inputVal.addEventListener('input', convertUnits);
    themeCheckBox.addEventListener('change', toggleTheme);

    resultsSection.addEventListener('click', function(e) {
        const swapBtn = e.target.closest('.swap-btn');
        const copyBtn = e.target.closest('.copy-btn');

        if (swapBtn) {
            const type = swapBtn.dataset.type;
            state[`${type}Swapped`] = !state[`${type}Swapped`];
            convertUnits();
        }

        if (copyBtn) {
            const value = copyBtn.dataset.value;
            navigator.clipboard.writeText(value)
                .then(() => {
                    copyBtn.classList.add('active');
                    setTimeout(() => copyBtn.classList.remove('active'), 1500);
                })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
        }
    });

    loadTheme();
    convertUnits();
});