var Snake = Snake || {};
Snake.gridTypes = { GRASS: 0, WALL: 1, SNAKE: 2, FOOD: 3, HEAD: 4, SPEEDBONUS: 5, HIDEANTIBONUS: 6 };
Snake.grid = [];
Snake.imageFiles = [];
Snake.levels = [];
Snake.levelUpCount = 6;
Snake.accelerateOnNewLevelSpeed = 20;
Snake.snake = [];
Snake.moveX = 0;
Snake.moveY = 0;
Snake.grow = 0;
Snake.score = 0;
Snake.speed = 400;
Snake.levelsAreActive = Snake.optionLevel('check');
Snake.speedBonus = Snake.optionBonus('checkBonus');
Snake.antiBonusHide = Snake.optionHide('checkOptionHide');
Snake.speedBonusValue = 100;
Snake.antiBonusTime = 5000;
Snake.speedBonusTime = 5000;
Snake.commonDividendBonusTime = 60000;
Snake.level = 0;
Snake.gameOver = false;