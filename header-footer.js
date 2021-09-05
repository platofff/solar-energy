'use strict';
(async () => {
  const header = document.createElement('header')
  const footer = document.createElement('footer')
  const r = await Promise.allSettled([(await fetch('/header.html')).text(), (await fetch('/footer.html')).text()])
  header.innerHTML = r[0].value
  footer.innerHTML = r[1].value
  document.body.appendChild(header)
  document.body.appendChild(footer)
  
  document.getElementById('platofff').addEventListener('click', () => window.open('https://based.su'))

  const mainPage = document.getElementById('header-main-page')
  const calculator = document.getElementById('header-calculator')

  switch (window.location.pathname) {
    case '/':
      mainPage.classList.add('header-menu-entry-selected')
      calculator.addEventListener('click', () => window.open('/calculator', '_self'))
      break
    case '/calculator/':
      calculator.classList.add('header-menu-entry-selected')
      mainPage.addEventListener('click', () => window.open('/', '_self'))
  }

  for (const elem of document.getElementsByClassName('header-menu')) {
    const combined = document.getElementById(elem.attributes.getNamedItem('for').nodeValue)
    const handler = (ev) => {
      const oldDirection = elem.style.animationDirection
      const resetAnimation = (elem) => {
        elem.style.animation = 'none'
        elem.offsetHeight
        elem.style.animation = null
      }
      resetAnimation(elem)

      const hide = (e) => {
        e.style.animationDirection = 'reverse'
        e.classList.remove('animation')
        e.classList.add('animation')
      }

      const show = (e) => {
        e.style.animationDirection = 'normal'
        e.classList.remove('animation')
        e.classList.add('animation')
      }

      if (oldDirection === 'normal') {
        hide(elem)
      } else {
        for (const e of document.getElementsByClassName('header-menu'))
          if (e !== elem && e.style.animationDirection === 'normal') {
            hide(e)
            break
          }
        document.addEventListener('click', () => {
          if (elem.style.animationDirection === 'normal') {
            resetAnimation(elem)
            hide(elem)
          }
        }, { once: true })
        show(elem)
      }
      ev.stopPropagation()
    }
    combined.addEventListener('click', handler)

    const observer = new ResizeObserver(() => {
      const rect = combined.getBoundingClientRect()
      elem.style.top = rect.height + 'px'
      elem.style.left = rect.left + 'px'
    })
    observer.observe(combined)
  }
})()