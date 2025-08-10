// Mafia Game Cheats - JavaScript Functions

// Game state variables
let gameStats = {
    money: 50000,
    health: 100,
    level: 25,
    cheatsUnlocked: new Set()
};

// Valid cheat codes
const validCodes = {
    'RICHLIFE': 'unlimitedMoney',
    'HEALTHY': 'fullHealth',
    'TOPGUN': 'maxLevel',
    'ARSENAL': 'allWeapons',
    'GODMODE': 'invincible',
    'SPEED': 'fastCars'
};

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    addConsoleMessage('نظام الأكواد جاهز للاستخدام');
    addConsoleMessage('جرب كتابة "help" للحصول على المساعدة');
});

// Update the display with current stats
function updateDisplay() {
    document.getElementById('money').textContent = `$${gameStats.money.toLocaleString()}`;
    document.getElementById('health').textContent = `${gameStats.health}%`;
    document.getElementById('level').textContent = gameStats.level;
}

// Add message to console
function addConsoleMessage(message, type = 'normal') {
    const console = document.getElementById('console');
    const line = document.createElement('div');
    line.className = 'console-line';
    
    if (type === 'success') {
        line.style.color = '#00ff00';
        line.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
    } else if (type === 'error') {
        line.style.color = '#ff4444';
        line.style.textShadow = '0 0 10px rgba(255, 68, 68, 0.5)';
    } else if (type === 'warning') {
        line.style.color = '#ffd700';
        line.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
    }
    
    line.textContent = message;
    console.appendChild(line);
    console.scrollTop = console.scrollHeight;
}

// Activate cheat from input
function activateCheat() {
    const input = document.getElementById('cheatCode');
    const code = input.value.toUpperCase().trim();
    
    if (!code) {
        addConsoleMessage('خطأ: يرجى إدخال كود التفعيل', 'error');
        return;
    }
    
    if (validCodes[code]) {
        gameStats.cheatsUnlocked.add(code);
        addConsoleMessage(`تم تفعيل الكود: ${code}`, 'success');
        addConsoleMessage('يمكنك الآن استخدام الغش المقابل', 'success');
        
        // Update button state
        const buttons = document.querySelectorAll('.cheat-btn');
        buttons.forEach(button => {
            if (button.dataset.code === code) {
                button.classList.remove('locked');
                button.classList.add('unlocked');
            }
        });
        
        input.value = '';
    } else {
        addConsoleMessage('خطأ: كود التفعيل غير صحيح', 'error');
        addConsoleMessage('تأكد من إدخال الكود بشكل صحيح', 'warning');
    }
}

// Check if cheat is unlocked
function isCheatUnlocked(code) {
    return gameStats.cheatsUnlocked.has(code);
}

// Unlimited money cheat
function unlimitedMoney() {
    if (!isCheatUnlocked('RICHLIFE')) {
        addConsoleMessage('خطأ: يجب تفعيل الكود أولاً', 'error');
        return;
    }
    
    gameStats.money = 9999999;
    updateDisplay();
    addConsoleMessage('تم تفعيل المال اللانهائي! 💰', 'success');
    addCheatEffect('money');
}

// Full health cheat
function fullHealth() {
    if (!isCheatUnlocked('HEALTHY')) {
        addConsoleMessage('خطأ: يجب تفعيل الكود أولاً', 'error');
        return;
    }
    
    gameStats.health = 100;
    updateDisplay();
    addConsoleMessage('تم استعادة الصحة بالكامل! ❤️', 'success');
    addCheatEffect('health');
}

// Max level cheat
function maxLevel() {
    if (!isCheatUnlocked('TOPGUN')) {
        addConsoleMessage('خطأ: يجب تفعيل الكود أولاً', 'error');
        return;
    }
    
    gameStats.level = 100;
    updateDisplay();
    addConsoleMessage('تم الوصول للمستوى الأقصى! ⭐', 'success');
    addCheatEffect('level');
}

// All weapons cheat
function allWeapons() {
    if (!isCheatUnlocked('ARSENAL')) {
        addConsoleMessage('خطأ: يجب تفعيل الكود أولاً', 'error');
        return;
    }
    
    addConsoleMessage('تم فتح جميع الأسلحة! 🔫', 'success');
    addConsoleMessage('جميع الأسلحة متاحة الآن في مخزونك', 'success');
}

// Invincible cheat
function invincible() {
    if (!isCheatUnlocked('GODMODE')) {
        addConsoleMessage('خطأ: يجب تفعيل الكود أولاً', 'error');
        return;
    }
    
    addConsoleMessage('تم تفعيل وضع عدم الموت! 🛡️', 'success');
    addConsoleMessage('أنت الآن محصن ضد جميع الأضرار', 'success');
}

// Fast cars cheat
function fastCars() {
    if (!isCheatUnlocked('SPEED')) {
        addConsoleMessage('خطأ: يجب تفعيل الكود أولاً', 'error');
        return;
    }
    
    addConsoleMessage('تم تفعيل السيارات السريعة! 🏎️', 'success');
    addConsoleMessage('جميع السيارات أصبحت فائقة السرعة', 'success');
}

// Add visual effect for activated cheats
function addCheatEffect(stat) {
    const element = document.getElementById(stat);
    if (element) {
        element.classList.add('glow');
        setTimeout(() => {
            element.classList.remove('glow');
        }, 3000);
    }
}

// Handle command input
function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const command = input.value.toLowerCase().trim();
        
        addConsoleMessage(`> ${input.value}`);
        
        switch (command) {
            case 'help':
                showHelp();
                break;
            case 'status':
                showStatus();
                break;
            case 'clear':
                clearConsole();
                break;
            case 'codes':
                showCodes();
                break;
            case 'reset':
                resetGame();
                break;
            default:
                addConsoleMessage('أمر غير معروف. اكتب "help" للمساعدة', 'error');
        }
        
        input.value = '';
    }
}

// Show help commands
function showHelp() {
    addConsoleMessage('=== الأوامر المتاحة ===', 'warning');
    addConsoleMessage('help - عرض هذه المساعدة');
    addConsoleMessage('status - عرض حالة اللعبة الحالية');
    addConsoleMessage('codes - عرض جميع الأكواد المتاحة');
    addConsoleMessage('clear - مسح وحدة التحكم');
    addConsoleMessage('reset - إعادة تعيين اللعبة');
}

// Show current game status
function showStatus() {
    addConsoleMessage('=== حالة اللعبة الحالية ===', 'warning');
    addConsoleMessage(`المال: $${gameStats.money.toLocaleString()}`);
    addConsoleMessage(`الصحة: ${gameStats.health}%`);
    addConsoleMessage(`المستوى: ${gameStats.level}`);
    addConsoleMessage(`الأكواد المفعلة: ${gameStats.cheatsUnlocked.size}`);
}

// Show available codes
function showCodes() {
    addConsoleMessage('=== الأكواد المتاحة ===', 'warning');
    addConsoleMessage('RICHLIFE - مال لا نهائي');
    addConsoleMessage('HEALTHY - صحة كاملة');
    addConsoleMessage('TOPGUN - مستوى أقصى');
    addConsoleMessage('ARSENAL - جميع الأسلحة');
    addConsoleMessage('GODMODE - عدم الموت');
    addConsoleMessage('SPEED - سيارات سريعة');
}

// Clear console
function clearConsole() {
    const console = document.getElementById('console');
    console.innerHTML = '';
    addConsoleMessage('تم مسح وحدة التحكم');
}

// Reset game
function resetGame() {
    gameStats = {
        money: 50000,
        health: 100,
        level: 25,
        cheatsUnlocked: new Set()
    };
    
    updateDisplay();
    
    // Reset button states
    const buttons = document.querySelectorAll('.cheat-btn');
    buttons.forEach(button => {
        button.classList.remove('unlocked');
        button.classList.add('locked');
    });
    
    addConsoleMessage('تم إعادة تعيين اللعبة بنجاح', 'success');
}

// Initialize button states on load
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cheat-btn');
    buttons.forEach(button => {
        button.classList.add('locked');
    });
});

// Add enter key support for cheat input
document.getElementById('cheatCode').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        activateCheat();
    }
});
