document.querySelectorAll('img[data-role="background"]').forEach(item => {
    item.parentElement.setAttribute("style", item.getAttribute('style') + `; --bg-img-src: url(\"${item.src}\")`)
    // console.log(item, src)
})