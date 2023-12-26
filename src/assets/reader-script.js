function toggleText() {
  const textElement = document.getElementById("textToToggle");
  if (textElement.style.display === "none") {
    textElement.style.display = "block";
  } else {
    textElement.style.display = "none";
  }
}
// dynamic-script.js
function greet() {
  alert("Hello from the dynamic template!");
}

// Call the function after a delay to ensure the DOM has loaded
window.onload = function () {
  setTimeout(greet, 1000);
};
