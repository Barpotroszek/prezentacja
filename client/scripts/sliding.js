let active = false;
const nextSlide = () => {
  let resolve;
  if (active) return;
  active = true;
  new Promise((res, rej) => {
    resolve = res;
  }).then(() => (active = false));
  return resolve;
};

class Slides {
  constructor(current) {
    this.current = current | 0;
    this.ref = null;
    this.max = 3;
    this.loadSlide();
    this.loaded_q = false;
    this.current_q = -1;
    this.quotes_ref;
  }

  loadSlide(id) {
    if (this.ref) this.ref.classList.remove("active");
    try {
      this.ref = document.getElementById(
        id || this.current.toString()
      ).parentElement;
      this.quotes_ref = this.ref.querySelectorAll("q");
      this.loaded_q = false;
      this.current_q = -1;
      console.log("Refs:", this.quotes_ref);
    } catch (error) {
      console.error("some error", error);
      return;
    }
    this.ref.classList.add("active");
  }

  nextQuote() {
    try {
      if (!this.loaded_q) {
        this.loaded_q = true;
        // try {
          setTimeout(()=>this.ref.querySelector("article").classList.add("init"), 1000);
          this.ref.querySelector("article").classList.remove("start");
        // } catch (error) {}
      } else this.quotes_ref[this.current_q].classList.remove("active");
      this.quotes_ref[++this.current_q].classList.add("active");
      console.log(this.current_q)
      this.quotes_ref[this.current_q].scrollIntoView(true)
    } catch (error) {
      if (!error instanceof TypeError) return;
      console.log(error, this.current_q);
       this.nextSlide();
    }
  }

  prevQuote(){
    try {
      this.quotes_ref[this.current_q].classList.remove("active");
      if(this.current_q <= 0 ) throw TypeError("idk");
      this.quotes_ref[--this.current_q].classList.add("active");
      this.quotes_ref[this.current_q].scrollIntoView(true)
    } catch (error) {
      if (!(error instanceof TypeError)) return;
       this.prevSlide();
    }
  }

  nextSlide() {
    if (this.current >= this.max) return;
    this.current++;
    this.loadSlide();
  }

  prevSlide() {
    if (this.current <= 0) return;
    this.current--;
    try {
      this.quotes_ref[this.current_q].classList.remove("active");      
    } catch (error) {}
    this.loadSlide();
  }
}

function renderTemplates() {
  const notes_templ = document
    .getElementById("notes-templ")
    .content.querySelector(".notes");
  Array.from(document.querySelectorAll(".slide-container")).forEach((el, i) => {
    const item = document.importNode(notes_templ, true);
    item.querySelector("ul").textContent = "Siema, działa " + i;
    el.append(item);
    slides.max = i;
  });
}

let slides;
window.onload = () => {
  slides = new Slides(0);
  // slides.nextQuote()
  document
    .getElementById("left")
    .addEventListener("click", () => slides.prevQuote());
  document
    .getElementById("right")
    .addEventListener("click", () => slides.nextQuote());
  // return;
  if (window.location.search.includes("speaker")) {
    renderTemplates();
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "styles/speaker.css");
    document.head.append(link);
  }
};
