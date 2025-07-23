// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target
          const width = skillBar.getAttribute("data-width")
          skillBar.style.width = width + "%"
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  skillBars.forEach((bar) => {
    observer.observe(bar)
  })
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Add fade-in animation to sections on scroll
function initScrollAnimations() {
  const sections = document.querySelectorAll("section")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
}

// Parallax effect for background orbs
function initParallaxEffect() {
  const orbs = document.querySelectorAll(".blur-orb")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.3
      orb.style.transform = `translateY(${rate * speed}px)`
    })
  })
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateSkillBars()
  initSmoothScrolling()
  initScrollAnimations()
  initParallaxEffect()

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in-out"
    document.body.style.opacity = "1"
  }, 100)
})

// Add hover effects for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-5px)"
      this.style.boxShadow = "0 20px 40px rgba(59, 130, 246, 0.3)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)"
      this.style.boxShadow = "none"
    })
  })
})
