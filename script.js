let array = [];
const container = document.getElementById("array-container");
const icon = document.getElementById("icon");
const explanation = document.getElementById("explanation");

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function createArray() {
  container.innerHTML = "";
  array = document.getElementById("arrayInput").value
    .split(",")
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n));

  array.forEach((value, i) => {
    let box = document.createElement("div");
    box.className = "box";
    box.textContent = value;
    box.dataset.index = i;
    container.appendChild(box);
  });

  explanation.innerHTML = "Array created!";
}

function moveIcon(box) {
  if (!box) return;
  icon.style.display = "block";
  icon.style.left = box.offsetLeft + 30 + "px";
  icon.style.top = box.offsetTop - 40 + "px";
}

/* -------------------------------------------------
   SORTING ALGORITHMS
--------------------------------------------------*/

async function bubbleSort() {
  let boxes = document.getElementsByClassName("box");
  explanation.innerHTML = "Bubble Sort started...";

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {

      boxes[j].classList.add("active");
      boxes[j + 1].classList.add("active");
      moveIcon(boxes[j]);

      await sleep(400);

      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        boxes[j].textContent = array[j];
        boxes[j + 1].textContent = array[j + 1];
      }

      boxes[j].classList.remove("active");
      boxes[j + 1].classList.remove("active");
    }
  }

  explanation.innerHTML = "Bubble Sort Completed!";
}

async function insertionSort() {
  let boxes = document.getElementsByClassName("box");
  explanation.innerHTML = "Insertion Sort started...";

  for (let i = 1; i < array.length; i++) {
    let j = i;

    while (j > 0 && array[j - 1] > array[j]) {
      moveIcon(boxes[j]);
      boxes[j].classList.add("active");
      boxes[j - 1].classList.add("active");

      await sleep(400);

      let temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;

      boxes[j].textContent = array[j];
      boxes[j - 1].textContent = array[j - 1];

      boxes[j].classList.remove("active");
      boxes[j - 1].classList.remove("active");

      j--;
    }
  }

  explanation.innerHTML = "Insertion Sort Completed!";
}

async function selectionSort() {
  let boxes = document.getElementsByClassName("box");
  explanation.innerHTML = "Selection Sort started...";

  for (let i = 0; i < array.length; i++) {
    let min = i;

    for (let j = i + 1; j < array.length; j++) {
      moveIcon(boxes[j]);
      boxes[j].classList.add("active");
      await sleep(300);
      boxes[j].classList.remove("active");

      if (array[j] < array[min]) min = j;
    }

    let temp = array[i];
    array[i] = array[min];
    array[min] = temp;

    boxes[i].textContent = array[i];
    boxes[min].textContent = array[min];
  }

  explanation.innerHTML = "Selection Sort Completed!";
}

/* -------------------------------------------------
   SEARCHING ALGORITHMS (FULL ANIMATION)
--------------------------------------------------*/

async function linearSearch() {
  let key = parseInt(document.getElementById("searchKey").value);
  let boxes = document.getElementsByClassName("box");

  explanation.innerHTML = `Linear Search for ${key}...`;

  for (let i = 0; i < array.length; i++) {
    moveIcon(boxes[i]);
    boxes[i].classList.add("active");
    await sleep(500);

    if (array[i] === key) {
      boxes[i].classList.remove("active");
      boxes[i].classList.add("found");
      explanation.innerHTML = `Found ${key} at index ${i}`;
      return;
    }

    boxes[i].classList.remove("active");
  }

  explanation.innerHTML = "Not Found!";
}


async function binarySearch() {
  let key = parseInt(document.getElementById("searchKey").value);
  let boxes = document.getElementsByClassName("box");

  explanation.innerHTML = "Binary search started (array must be sorted).";

  let low = 0, high = array.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    boxes[mid].classList.add("mid");
    moveIcon(boxes[mid]);

    await sleep(600);

    if (array[mid] === key) {
      boxes[mid].classList.remove("mid");
      boxes[mid].classList.add("found");
      explanation.innerHTML = `Found ${key} at index ${mid}`;
      return;
    }

    boxes[mid].classList.remove("mid");

    if (array[mid] < key) low = mid + 1;
    else high = mid - 1;
  }

  explanation.innerHTML = "Not Found!";
}

/* -------------------------------------------------
   MAIN ALGO CALLER
--------------------------------------------------*/
async function startAlgo() {
  const algo = document.getElementById("algorithm").value;

  if (array.length === 0) {
    explanation.innerHTML = "Create array first.";
    return;
  }

  if (algo === "bubble") bubbleSort();
  else if (algo === "insertion") insertionSort();
  else if (algo === "selection") selectionSort();
  else if (algo === "linear") linearSearch();
  else if (algo === "binary") binarySearch();
}
