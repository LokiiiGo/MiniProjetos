// Main JavaScript file for common functionality

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add fade-in animation to elements when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
    }
  })
}, observerOptions)

// Observe elements that should fade in
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(".character-item, .game-card, .instruction-card")
  elementsToObserve.forEach((el) => observer.observe(el))
})

// Utility functions
const utils = {
  // Random number between min and max (inclusive)
  randomBetween: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  // Shuffle array
  shuffleArray: (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },

  // Format number with commas
  formatNumber: (num) => num.toLocaleString(),

  // Add animation class and remove after animation
  animateElement: (element, animationClass, duration = 1000) => {
    element.classList.add(animationClass)
    setTimeout(() => {
      element.classList.remove(animationClass)
    }, duration)
  },

  // Show notification
  showNotification: (message, type = "info", duration = 3000) => {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `

    switch (type) {
      case "success":
        notification.style.background = "var(--success-color)"
        break
      case "error":
        notification.style.background = "var(--danger-color)"
        break
      case "warning":
        notification.style.background = "var(--warning-color)"
        break
      default:
        notification.style.background = "var(--primary-color)"
    }

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease-out"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, duration)
  },
}

// Make utils available globally
window.utils = utils
