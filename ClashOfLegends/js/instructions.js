// Instructions page functionality

document.addEventListener("DOMContentLoaded", () => {
  const instructionCards = document.querySelectorAll(".instruction-card")
  const utils = {
    // Declare the utils variable here or import it properly
    animateElement: (element, animationClass, duration) => {
      element.classList.add(animationClass)
      setTimeout(() => {
        element.classList.remove(animationClass)
      }, duration)
    },
  }

  instructionCards.forEach((card) => {
    const header = card.querySelector(".card-header")

    header.addEventListener("click", () => {
      // Close other cards
      instructionCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains("expanded")) {
          otherCard.classList.remove("expanded")
        }
      })

      // Toggle current card
      card.classList.toggle("expanded")

      // Add animation
      utils.animateElement(card, "fade-in", 300)
    })
  })

  // Auto-expand first card
  if (instructionCards.length > 0) {
    instructionCards[0].classList.add("expanded")
  }
})
