const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let currentInput = "";

function updateDisplay() {
    display.value = currentInput;
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.textContent.trim();

        if (value === "AC") {
            currentInput = "";
        } else if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
        } else if (value === "=") {
            try {
                // Ubah (–x) menjadi –x untuk evaluasi
                let expression = currentInput.replace(/\(-/g, "-").replace(/\)/g, "");
                currentInput = eval(expression).toString();
            } catch {
                currentInput = "Error";
            }
        } else if (value === "+/-") {
            // Deteksi angka terakhir untuk dibungkus tanda kurung
            let match = currentInput.match(/(\(-\d+\)|\d+)$/);
            if (match) {
                let number = match[0];
                let start = currentInput.lastIndexOf(number);
                if (number.startsWith("(-")) {
                    // Jika sudah negatif, kembalikan ke positif
                    number = number.slice(2, -1);
                } else {
                    // Jika positif, ubah jadi negatif dalam tanda kurung
                    number = `(-${number})`;
                }
                currentInput = currentInput.substring(0, start) + number;
            }
        } else {
            currentInput += value;
        }

        updateDisplay();
    });
});