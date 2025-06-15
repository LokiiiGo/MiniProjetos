// Game functionality

// Game state
let gameState = {
  player1: { name: "Jogador 1", life: 5000 },
  player2: { name: "Jogador 2", life: 5000 },
  currentRound: 0,
  gameHistory: [],
  isGameActive: true,
}

// Card databases
const characterCards = [
  { name: "Alan Turing", level: 4, attack: 2300, defense: 2000, description: "O pai da computação moderna" },
  { name: "Cleópatra", level: 6, attack: 2800, defense: 2200, description: "A última faraó do Egito" },
  { name: "Albert Einstein", level: 5, attack: 2500, defense: 2100, description: "O gênio da física moderna" },
  { name: "Marie Curie", level: 3, attack: 2000, defense: 1900, description: "Pioneira da radioatividade" },
  { name: "Leonardo da Vinci", level: 2, attack: 2400, defense: 2000, description: "O homem renascentista" },
  { name: "Nikola Tesla", level: 1, attack: 1500, defense: 1600, description: "O mago da eletricidade" },
  { name: "Isaac Newton", level: 8, attack: 2600, defense: 2200, description: "O pai da física clássica" },
  { name: "Mahatma Gandhi", level: 9, attack: 1800, defense: 1700, description: "O líder da não-violência" },
  { name: "Nelson Mandela", level: 7, attack: 2200, defense: 2100, description: "O símbolo da liberdade" },
  { name: "Galileu Galilei", level: 10, attack: 2100, defense: 1900, description: "O pai da astronomia moderna" },
]

const supportCards = [
  { name: "Dobro Ataque", effect: "attack", value: 500, description: "Aumenta o ataque em 500 pontos" },
  { name: "Proteção", effect: "defense", value: 400, description: "Aumenta a defesa em 400 pontos" },
  { name: "Vida", effect: "life", value: 1000, description: "Restaura 1000 pontos de vida" },
  { name: "Fúria", effect: "attack", value: 300, description: "Aumenta o ataque em 300 pontos" },
  { name: "Escudo", effect: "defense", value: 350, description: "Aumenta a defesa em 350 pontos" },
]

// Utils functions
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function animateElement(element, animationClass, duration = 1000) {
  if (element) {
    element.classList.add(animationClass)
    setTimeout(() => {
      element.classList.remove(animationClass)
    }, duration)
  }
}

function showNotification(message, type = "info") {
  console.log(`${type.toUpperCase()}: ${message}`)

  // Create visual notification
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 3000;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `

  switch (type) {
    case "success":
      notification.style.background = "#4caf50"
      break
    case "error":
      notification.style.background = "#f44336"
      break
    case "warning":
      notification.style.background = "#ff9800"
      break
    default:
      notification.style.background = "#8b5a3c"
  }

  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification)
    }
  }, 3000)
}

// Game functions
function startRound() {
  console.log("startRound called")

  if (!gameState.isGameActive) {
    showNotification('O jogo já terminou! Clique em "Reiniciar Jogo" para jogar novamente.', "warning")
    return
  }

  gameState.currentRound++
  addToLog(`=== RODADA ${gameState.currentRound} ===`)

  // Draw cards for both players
  const player1Card = drawRandomCard()
  const player2Card = drawRandomCard()

  // Draw support cards
  const player1Support = drawRandomSupport()
  const player2Support = drawRandomSupport()

  // Apply support effects
  applySupport(player1Card, player1Support)
  applySupport(player2Card, player2Support)

  // Display cards
  displayCard("player1Card", player1Card, player1Support)
  displayCard("player2Card", player2Card, player2Support)

  addToLog(
    `Jogador 1 invocou: ${player1Card.name} (ATK: ${player1Card.attack}, DEF: ${player1Card.defense}) com ${player1Support.name}`,
  )
  addToLog(
    `Jogador 2 invocou: ${player2Card.name} (ATK: ${player2Card.attack}, DEF: ${player2Card.defense}) com ${player2Support.name}`,
  )

  // Battle phase
  setTimeout(() => {
    battle(player1Card, player2Card, player1Support, player2Support)
  }, 1500)
}

function drawRandomCard() {
  const randomIndex = randomBetween(0, characterCards.length - 1)
  return JSON.parse(JSON.stringify(characterCards[randomIndex])) // Deep copy
}

function drawRandomSupport() {
  const randomIndex = randomBetween(0, supportCards.length - 1)
  return JSON.parse(JSON.stringify(supportCards[randomIndex])) // Deep copy
}

function applySupport(card, support) {
  if (support.effect === "attack") {
    card.attack += support.value
  } else if (support.effect === "defense") {
    card.defense += support.value
  }
  // Life support is handled in battle function
}

function displayCard(containerId, card, support) {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`Container ${containerId} not found`)
    return
  }

  container.innerHTML = `
    <div class="battle-card">
      <h4>${card.name}</h4>
      <div class="battle-card-stats">
        <span class="stat attack">ATK: ${card.attack}</span>
        <span class="stat defense">DEF: ${card.defense}</span>
      </div>
      <div class="card-level">Nível ${card.level}</div>
      <div class="support-info">
        <small>+ ${support.name}</small>
      </div>
    </div>
  `
  container.classList.add("has-card")
  animateElement(container, "card-battle-animation", 1000)
}

function battle(card1, card2, support1, support2) {
  const battleStatusEl = document.getElementById("battleStatus")
  if (battleStatusEl) {
    battleStatusEl.textContent = "Batalha em andamento..."
  }

  // Apply life support if any
  if (support1.effect === "life") {
    gameState.player1.life += support1.value
    gameState.player1.life = Math.min(gameState.player1.life, 8000) // Max life cap
    addToLog(`Jogador 1 recuperou ${support1.value} pontos de vida!`)
    updateLifeDisplay()
  }

  if (support2.effect === "life") {
    gameState.player2.life += support2.value
    gameState.player2.life = Math.min(gameState.player2.life, 8000) // Max life cap
    addToLog(`Jogador 2 recuperou ${support2.value} pontos de vida!`)
    updateLifeDisplay()
  }

  // Calculate battle damage
  const damage1 = Math.max(0, card1.attack - card2.defense)
  const damage2 = Math.max(0, card2.attack - card1.defense)

  let battleResult = ""

  if (damage1 > damage2) {
    gameState.player2.life -= damage1
    gameState.player2.life = Math.max(0, gameState.player2.life)
    battleResult = `${card1.name} venceu! Jogador 2 perdeu ${damage1} pontos de vida.`
    const player2LifeEl = document.getElementById("player2Life")
    if (player2LifeEl && player2LifeEl.parentElement) {
      animateElement(player2LifeEl.parentElement, "damage-animation", 500)
    }
  } else if (damage2 > damage1) {
    gameState.player1.life -= damage2
    gameState.player1.life = Math.max(0, gameState.player1.life)
    battleResult = `${card2.name} venceu! Jogador 1 perdeu ${damage2} pontos de vida.`
    const player1LifeEl = document.getElementById("player1Life")
    if (player1LifeEl && player1LifeEl.parentElement) {
      animateElement(player1LifeEl.parentElement, "damage-animation", 500)
    }
  } else {
    battleResult = "Empate! Nenhum jogador perdeu vida."
  }

  addToLog(battleResult)
  updateLifeDisplay()

  // Add to history
  gameState.gameHistory.push({
    round: gameState.currentRound,
    player1Card: card1.name,
    player2Card: card2.name,
    player1Support: support1.name,
    player2Support: support2.name,
    result: battleResult,
    player1Life: gameState.player1.life,
    player2Life: gameState.player2.life,
  })

  // Check for game end
  setTimeout(() => {
    if (gameState.player1.life <= 0 || gameState.player2.life <= 0) {
      endGame()
    } else {
      if (battleStatusEl) {
        battleStatusEl.textContent = "Pronto para a próxima rodada!"
      }
      showNotification('Rodada concluída! Clique em "Iniciar Rodada" para continuar.', "success")
    }
  }, 1000)
}

function updateLifeDisplay() {
  const player1LifeEl = document.getElementById("player1Life")
  const player2LifeEl = document.getElementById("player2Life")

  if (player1LifeEl) {
    player1LifeEl.textContent = formatNumber(gameState.player1.life)
    updateLifeColor(player1LifeEl, gameState.player1.life)
  }

  if (player2LifeEl) {
    player2LifeEl.textContent = formatNumber(gameState.player2.life)
    updateLifeColor(player2LifeEl, gameState.player2.life)
  }
}

function updateLifeColor(element, life) {
  element.classList.remove("low-life", "critical-life")

  if (life <= 1000) {
    element.classList.add("critical-life")
    element.style.color = "#f44336"
  } else if (life <= 2000) {
    element.classList.add("low-life")
    element.style.color = "#ff9800"
  } else {
    element.style.color = "#4caf50"
  }
}

function endGame() {
  gameState.isGameActive = false

  let winner = ""
  const battleStatusEl = document.getElementById("battleStatus")

  if (gameState.player1.life <= 0 && gameState.player2.life <= 0) {
    winner = "Empate! Ambos os jogadores foram derrotados!"
    if (battleStatusEl) battleStatusEl.textContent = "Empate!"
  } else if (gameState.player1.life <= 0) {
    winner = "🎉 Jogador 2 venceu o jogo! 🎉"
    if (battleStatusEl) battleStatusEl.textContent = "Jogador 2 Venceu!"
  } else {
    winner = "🎉 Jogador 1 venceu o jogo! 🎉"
    if (battleStatusEl) battleStatusEl.textContent = "Jogador 1 Venceu!"
  }

  addToLog(`\n${winner}`)
  addToLog(`Jogo finalizado após ${gameState.currentRound} rodadas.`)

  showNotification(winner, "success")

  // Disable start round button
  const startBtn = document.getElementById("startRoundBtn")
  if (startBtn) {
    startBtn.textContent = "Jogo Finalizado"
    startBtn.disabled = true
    startBtn.style.opacity = "0.5"
  }
}

function resetGame() {
  console.log("resetGame called")

  gameState = {
    player1: { name: "Jogador 1", life: 5000 },
    player2: { name: "Jogador 2", life: 5000 },
    currentRound: 0,
    gameHistory: [],
    isGameActive: true,
  }

  // Reset UI
  updateLifeDisplay()

  const player1CardEl = document.getElementById("player1Card")
  const player2CardEl = document.getElementById("player2Card")
  const battleStatusEl = document.getElementById("battleStatus")
  const logContentEl = document.getElementById("logContent")

  if (player1CardEl) {
    player1CardEl.innerHTML = '<div class="empty-slot">Clique em "Iniciar Rodada"</div>'
    player1CardEl.classList.remove("has-card")
  }

  if (player2CardEl) {
    player2CardEl.innerHTML = '<div class="empty-slot">Clique em "Iniciar Rodada"</div>'
    player2CardEl.classList.remove("has-card")
  }

  if (battleStatusEl) {
    battleStatusEl.textContent = "Pronto para batalha!"
  }

  if (logContentEl) {
    logContentEl.innerHTML = '<p>Bem-vindo ao Clash of Legends! Clique em "Iniciar Rodada" para começar.</p>'
  }

  // Reset start button
  const startBtn = document.getElementById("startRoundBtn")
  if (startBtn) {
    startBtn.textContent = "Iniciar Rodada"
    startBtn.disabled = false
    startBtn.style.opacity = "1"
  }

  showNotification("Jogo reiniciado! Boa sorte!", "info")
}

function addToLog(message) {
  const logContentEl = document.getElementById("logContent")
  if (!logContentEl) return

  const logEntry = document.createElement("div")
  logEntry.className = "log-entry"
  logEntry.textContent = message
  logContentEl.appendChild(logEntry)

  // Auto-scroll to bottom
  logContentEl.scrollTop = logContentEl.scrollHeight
}

function toggleHistory() {
  const historyModal = document.getElementById("historyModal")
  if (!historyModal) return

  historyModal.classList.toggle("active")

  if (historyModal.classList.contains("active")) {
    updateHistoryDisplay()
  }
}

function updateHistoryDisplay() {
  const historyContent = document.getElementById("historyContent")
  if (!historyContent) return

  if (gameState.gameHistory.length === 0) {
    historyContent.innerHTML = "<p>Nenhuma batalha registrada ainda.</p>"
    return
  }

  let historyHTML = '<div class="history-summary">'
  historyHTML += `<h4>Resumo do Jogo</h4>`
  historyHTML += `<p><strong>Rodadas jogadas:</strong> ${gameState.currentRound}</p>`
  historyHTML += `<p><strong>Status:</strong> ${gameState.isGameActive ? "Em andamento" : "Finalizado"}</p>`
  historyHTML += "</div>"

  historyHTML += '<div class="history-rounds">'
  gameState.gameHistory.forEach((round, index) => {
    historyHTML += `
      <div class="history-round">
        <h5>Rodada ${round.round}</h5>
        <div class="round-details">
          <p><strong>Jogador 1:</strong> ${round.player1Card} + ${round.player1Support}</p>
          <p><strong>Jogador 2:</strong> ${round.player2Card} + ${round.player2Support}</p>
          <p><strong>Resultado:</strong> ${round.result}</p>
          <p><strong>Vida restante:</strong> J1: ${formatNumber(round.player1Life)} | J2: ${formatNumber(round.player2Life)}</p>
        </div>
      </div>
    `
  })
  historyHTML += "</div>"

  historyContent.innerHTML = historyHTML
}

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Game script loaded")

  updateLifeDisplay()

  // Add event listeners to buttons
  const startBtn = document.getElementById("startRoundBtn")
  const resetBtn = document.getElementById("resetGameBtn")
  const historyBtn = document.getElementById("showHistoryBtn")

  if (startBtn) {
    startBtn.addEventListener("click", startRound)
    console.log("Start button event listener added")
  } else {
    console.error("Start button not found")
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame)
    console.log("Reset button event listener added")
  }

  if (historyBtn) {
    historyBtn.addEventListener("click", toggleHistory)
    console.log("History button event listener added")
  }

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (gameState.isGameActive) {
        startRound()
      }
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault()
      resetGame()
    } else if (e.key === "h" || e.key === "H") {
      e.preventDefault()
      toggleHistory()
    } else if (e.key === "Escape") {
      const historyModal = document.getElementById("historyModal")
      if (historyModal && historyModal.classList.contains("active")) {
        toggleHistory()
      }
    }
  })

  // Close modal when clicking outside
  const historyModal = document.getElementById("historyModal")
  if (historyModal) {
    historyModal.addEventListener("click", (e) => {
      if (e.target === historyModal) {
        toggleHistory()
      }
    })
  }

  showNotification("Clash of Legends carregado! Clique em 'Iniciar Rodada' para começar.", "info")
})

// Make functions available globally for onclick handlers
window.startRound = startRound
window.resetGame = resetGame
window.toggleHistory = toggleHistory
