// Cards page functionality

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const gameCards = document.querySelectorAll(".game-card")
  const utils = {
    // Declare the utils variable here
    animateElement: (element, animationClass, duration) => {
      element.classList.add(animationClass)
      setTimeout(() => {
        element.classList.remove(animationClass)
      }, duration)
    },
    showNotification: (message, type) => {
      console.log(`${type}: ${message}`)
    },
  }

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter cards
      gameCards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block"
          utils.animateElement(card, "fade-in", 500)
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Card hover effects
  gameCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      utils.animateElement(this, "card-battle-animation", 1000)
    })

    card.addEventListener("click", function () {
      const cardName = this.querySelector("h3").textContent
      utils.showNotification(`Carta selecionada: ${cardName}`, "info")
    })
  })
})
