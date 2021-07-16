let navItems = document.querySelectorAll('.nav-link')
let navBar = document.getElementById('navbarNav')


navItems.forEach((navItem) => {
    navItem.addEventListener("click", function(e){        
        navBar.classList.remove('show')
    })
})
