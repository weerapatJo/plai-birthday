// ===== เกมจิ๊กซอว์วันเกิดปลาย =====

const puzzleBoard = document.getElementById("puzzleBoard");
const puzzleStatus = document.getElementById("puzzleStatus");
const openLetterBtn = document.getElementById("openLetterBtn");
const restartPuzzleBtn = document.getElementById("restartPuzzleBtn");

const photoUrl = "photo.jpg.JPG";

let tiles = [];
let selectedTile = null;
let isSolved = false;

function shuffleTiles() {
    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    do {
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }
    } while (positions.every((value, index) => value === index));

    return positions;
}

function createPuzzle() {
    puzzleBoard.innerHTML = "";
    tiles = shuffleTiles();
    selectedTile = null;
    isSolved = false;

    openLetterBtn.disabled = true;
    puzzleBoard.classList.remove("solved");
    puzzleStatus.textContent = "เรียงรูปให้ถูกครบทั้ง 9 ชิ้นนะ ♡";

    tiles.forEach((piece, index) => {
        const tile = document.createElement("button");
        tile.className = "puzzle-tile";
        tile.type = "button";
        tile.setAttribute("aria-label", "ช่องที่ " + (index + 1));

        const row = Math.floor(piece / 3);
        const col = piece % 3;

        tile.style.backgroundImage = 'url("' + photoUrl + '")';
        tile.style.backgroundPosition = (col * 50) + "% " + (row * 50) + "%";   

        tile.addEventListener("click", () => selectTile(index));
        puzzleBoard.appendChild(tile);
    });
}

function selectTile(index) {
    if (isSolved) return;

    const tileElements = puzzleBoard.querySelectorAll(".puzzle-tile");

    if (selectedTile === null) {
        selectedTile = index;
        tileElements[index].classList.add("selected");
        return;
    }

    if (selectedTile === index) {
        tileElements[index].classList.remove("selected");
        selectedTile = null;
        return;
    }

    [tiles[selectedTile], tiles[index]] = [tiles[index], tiles[selectedTile]];

    selectedTile = null;
    renderPuzzle();
    checkSolved();
}

function renderPuzzle() {
    const tileElements = puzzleBoard.querySelectorAll(".puzzle-tile");

    tiles.forEach((piece, index) => {
        const row = Math.floor(piece / 3);
        const col = piece % 3;

        tileElements[index].style.backgroundPosition = (col * 50) + "% " + (row * 50) + "%";
        tileElements[index].classList.remove("selected");
    });
}

function checkSolved() {
    const correct = tiles.every((piece, index) => piece === index);

    if (correct) {
        isSolved = true;
        openLetterBtn.disabled = false;
        puzzleBoard.classList.add("solved");
        puzzleStatus.textContent = "เก่งที่สุดเลยหนู! ต่อรูปสำเร็จแล้ว ♡";
    }
}


function openLetter() {
    if (!isSolved) {
        puzzleStatus.textContent = "ต่อรูปให้สำเร็จก่อนนะคนเก่ง ♡";
        return;
    }

    document.getElementById("welcome").style.display = "none";
    document.getElementById("letter").style.display = "flex";

    const music = document.getElementById("birthdayMusic");

    if (music) {
        music.volume = 0.5;
        music.play().catch(() => {
            console.log("ตรวจสอบไฟล์เพลงอีกครั้งนะ");
        });
    }
}


if (restartPuzzleBtn) {
    restartPuzzleBtn.addEventListener("click", createPuzzle);
}

document.addEventListener("DOMContentLoaded", createPuzzle);

