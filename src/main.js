function loadItems() {
  return fetch("/data/data.json")
    .then((res) => res.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createItemString(item)).join("");
}

function createItemString(item) {
  return `
     <li class="item">
        <img class="item__thumbnail" alt="${item.type}" src="${item.image}" />
        <span class="item__desc">${item.gender}, ${item.size}</span>
      </li>
  `;
}

function handleFilter(items) {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => displayItems(items));

  const nav = document.querySelector("nav");
  nav.addEventListener("click", (e) => onBtnClick(e, items));
}

function onBtnClick(e, items) {
  const key = e.target.dataset.key;
  const value = e.target.dataset.value;
  if (key === null || value === null) {
    return;
  }
  let filterd = items.filter((item) => item[key] === value);
  displayItems(filterd);
}

// function onBtnClick(e, items) {
//   console.log(e.target.className);
//   category = ["tshirt", "skirt", "pants"];
//   color = ["yellow", "pink", "blue"];
//   for (let i in category) {
//     if (e.target.className.includes(category[i])) {
//       let filtered = items.filter((item) => item.type === category[i]);
//       displayItems(filtered);
//     }
//   }
//   for (let i in color) {
//     if (e.target.className.includes(color[i])) {
//       let filtered = items.filter((item) => item.color === color[i]);
//       displayItems(filtered);
//     }
//   }
// }

loadItems()
  .then((items) => {
    displayItems(items);
    handleFilter(items);
  })
  .catch((err) => console.log(err));
