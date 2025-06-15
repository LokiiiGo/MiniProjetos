// Greeting functionality
function setGreeting() {
  const greetingElement = document.getElementById("greeting")
  const currentHour = new Date().getHours()

  let greetingMessage

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Bom dia!"
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Boa tarde!"
  } else {
    greetingMessage = "Boa noite!"
  }

  greetingElement.textContent = greetingMessage
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Add hover effects to menu items
function initMenuEffects() {
  const menuRows = document.querySelectorAll(".menu-table tbody tr")

  menuRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)"
      this.style.transition = "transform 0.2s ease"
    })

    row.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setGreeting()
  initSmoothScrolling()
  initMenuEffects()

  // Update greeting every minute
  setInterval(setGreeting, 60000)
})

// Add scroll-to-top functionality
function addScrollToTop() {
  const scrollButton = document.createElement("button")
  scrollButton.innerHTML = "↑"
  scrollButton.className = "scroll-to-top"
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffbb00;
    color: #333;
    border: 2px solid #333;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
  `

  document.body.appendChild(scrollButton)

  // Show/hide scroll button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = "block"
    } else {
      scrollButton.style.display = "none"
    }
  })

  // Scroll to top when clicked
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize scroll-to-top after DOM is loaded
document.addEventListener("DOMContentLoaded", addScrollToTop)
