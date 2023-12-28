const getOptions = (key) => {
  return OPTIONS[key];
};

const createButton = (config, containerEl) => {
  const button = document.createElement("button");
  button.textContent = config.textContent;

  button.onclick = (function (param) {
    return async function () {
      await config.onclick(param);
      hideElement(containerEl);
    };
  })(config);

  return button;
};

const createButtonGroup = (containerEl) => {
  const config = getOptions(containerEl.id);
  const quantity = config.length;
  const buttons = [];

  for (let i = 0; i < quantity; i++) {
    const button = createButton(config[i], containerEl);
    buttons.push(button);
  }

  return buttons;
};

const toggleText = (id) => {
  const textElement = document.getElementById(id);
  if (textElement.style.display === "none") {
    textElement.style.display = "block";
  } else {
    textElement.style.display = "none";
  }
};

const showId = (id) => {
  const element = document.getElementById(id);
  element.classList.remove("d-none");
  element.classList.add("d-block");
};

const hideElement = (element) => {
  element.classList.remove("d-block");
  element.classList.add("d-none");
};

const createOptions = (containerId) => {
  const containerEl = document.getElementById(containerId);
  const buttons = createButtonGroup(containerEl);

  buttons.forEach((btn) => containerEl.appendChild(btn));
};

const replaceMainOutlet = (html) => {
  const body = document.getElementById("main-outlet");
  body.innerHTML = html;
};

const getLocalHtml = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.text();
};

const onNavigate = async (config) => {
  const path = `assets/${config.navigate}`;

  const html = await getLocalHtml(path);
  replaceMainOutlet(html);
};

const OPTIONS = {
  "btn-group-options1": [
    {
      textContent: "ESTABAMOS OCUPADOS SOBREVIVIENDO",
      onclick: onNavigate,
      param: "option1",
      navigate: "btn-group-options1.option1.html",
    },
    {
      textContent: "TRANQUILIZATE",
      onclick: onNavigate,
      param: "option2",
      navigate: "btn-group-options1.option2.html",
    },
    {
      textContent: "NO DICES NADA",
      onclick: onNavigate,
      param: "option3",
      navigate: "btn-group-options1.option3.html",
    },
  ],
};
