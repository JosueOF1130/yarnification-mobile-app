export const yarnRequirementsByName = {
    superFine: {
        hat: {min: 250, max: 325},
        scarf: {min: 525, max: 825},
        socks: {min: 300, max: 500},
        sweater: {min: 3375, max: 3375},
        blanket: {min: 525, max: 825},
        afghan: {min: 3750, max: 4125},
        shawl: {min: 550, max: 850}
    },
    fine: {
        hat: {min: 250, max: 325},
        scarf: {min: 450, max: 625},
        socks: {min: 300, max: 450},
        sweater: {min: 1750, max: 2625},
        blanket: {min: 1250, max: 1500},
        afghan: {min: 3500, max: 3750},
        shawl: {min: 450, max: 700}
    },
    light: {
        hat: {min: 250, max: 250},
        scarf: {min: 375, max: 500},
        socks: {min: 275, max: 400},
        sweater: {min: 1500, max: 2250},
        blanket: {min: 1125, max: 1250},
        afghan: {min: 3000, max: 3500},
        shawl: {min: 400, max: 625}
    },
    medium: {
        hat: {min: 125, max: 200},
        scarf: {min: 250, max: 375},
        socks: {min: 250, max: 350},
        sweater: {min: 1125, max: 1625},
        blanket: {min: 1000, max: 1125},
        afghan: {min: 2250, max: 3125},
        shawl: {min: 375, max: 550}
    },
    bulky: {
        hat: {min: 200, max: 250},
        scarf: {min: 375, max: 500},
        socks: {min: 275, max: 375},
        sweater: {min: 950, max: 1125},
        blanket: {min: 875, max: 1000},
        afghan: {min: 2000, max: 2250},
        shawl: {min: 375, max: 550}
    },
    superBulky: {
        hat: {min: 125, max: 150},
        scarf: {min: 250, max: 375},
        socks: {min: 200, max: 250},
        sweater: {min: 825, max: 1125},
        blanket: {min: 750, max: 875},
        afghan: {min: 1625, max: 2000},
        shawl: {min: 350, max: 474}
    },
    jumbo: {
        hat: {min: 30, max: 60},
        scarf: {min: 125, max: 200},
        socks: {min: 175, max: 200},
        sweater: {min: 825, max: 1125},
        blanket: {min: 625, max: 750},
        afghan: {min: 1375, max: 1625},
        shawl: {min: 300, max: 400}
    }
};


export const yarnRequirementsByIndex  = [
    // superFine
    [
        { min: 250, max: 325 }, // hat
        { min: 525, max: 825 }, // scarf
        { min: 300, max: 500 }, // socks
        { min: 3375, max: 3375 }, // sweater
        { min: 525, max: 825 }, // blanket
        { min: 3750, max: 4125 }, // afghan
        { min: 550, max: 850 }, // shawl
    ],
    // fine
    [
        { min: 250, max: 325 },
        { min: 450, max: 625 },
        { min: 300, max: 450 },
        { min: 1750, max: 2625 },
        { min: 1250, max: 1500 },
        { min: 3500, max: 3750 },
        { min: 450, max: 700 },
    ],
    // light
    [
        { min: 250, max: 250 },
        { min: 375, max: 500 },
        { min: 275, max: 400 },
        { min: 1500, max: 2250 },
        { min: 1125, max: 1250 },
        { min: 3000, max: 3500 },
        { min: 400, max: 625 },
    ],
    // medium
    [
        { min: 125, max: 200 },
        { min: 250, max: 375 },
        { min: 250, max: 350 },
        { min: 1125, max: 1625 },
        { min: 1000, max: 1125 },
        { min: 2250, max: 3125 },
        { min: 375, max: 550 },
    ],
    // bulky
    [
        { min: 200, max: 250 },
        { min: 375, max: 500 },
        { min: 275, max: 375 },
        { min: 950, max: 1125 },
        { min: 875, max: 1000 },
        { min: 2000, max: 2250 },
        { min: 375, max: 550 },
    ],
    // superBulky
    [
        { min: 125, max: 150 },
        { min: 250, max: 375 },
        { min: 200, max: 250 },
        { min: 825, max: 1125 },
        { min: 750, max: 875 },
        { min: 1625, max: 2000 },
        { min: 350, max: 474 },
    ],
    // jumbo
    [
        { min: 30, max: 60 },
        { min: 125, max: 200 },
        { min: 175, max: 200 },
        { min: 825, max: 1125 },
        { min: 625, max: 750 },
        { min: 1375, max: 1625 },
        { min: 300, max: 400 },
    ],
];
