(function () {
    const form = document.getElementById("upload-form");
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const previewWrap = document.getElementById("preview-wrap");
    const previewImg = document.getElementById("preview-img");
    const previewName = document.getElementById("preview-name");
    const submitBtn = document.getElementById("submit-btn");
    const clearBtn = document.getElementById("clear-btn");
    const overlay = document.getElementById("loading-overlay");

    if (!form) return;

    function setFile(file) {
        if (!file || !file.type.startsWith("image/")) return;

        fileInput.files = createFileList(file);
        dropzone.classList.add("has-file");
        previewName.textContent = file.name;
        previewImg.src = URL.createObjectURL(file);
        submitBtn.disabled = false;
    }

    function createFileList(file) {
        const dt = new DataTransfer();
        dt.items.add(file);
        return dt.files;
    }

    function clearFile() {
        fileInput.value = "";
        dropzone.classList.remove("has-file");
        previewImg.removeAttribute("src");
        previewName.textContent = "";
        submitBtn.disabled = true;
    }

    fileInput.addEventListener("change", () => {
        if (fileInput.files[0]) setFile(fileInput.files[0]);
    });

    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        clearFile();
    });

    ["dragenter", "dragover"].forEach((evt) => {
        dropzone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropzone.classList.add("drag-over");
        });
    });

    ["dragleave", "drop"].forEach((evt) => {
        dropzone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropzone.classList.remove("drag-over");
        });
    });

    dropzone.addEventListener("drop", (e) => {
        const file = e.dataTransfer.files[0];
        setFile(file);
    });

    form.addEventListener("submit", () => {
        overlay.classList.add("active");
        submitBtn.disabled = true;
    });

    if (!fileInput.files.length) {
        submitBtn.disabled = true;
    }
})();
