document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button-container button");
  const galleries = document.querySelectorAll(".gallery");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const gallery = document.getElementById(`gallery${index + 1}`);
      if (gallery.style.display === "none" || gallery.style.display === "") {
        gallery.style.display = "block";
      } else {
        gallery.style.display = "none";
      }
    });
  });

  const leftPopupBtn = document.getElementById("left-popup-btn");
  const rightPopupBtn = document.getElementById("right-popup-btn");
  const leftPopup = document.getElementById("left-popup");
  const rightPopup = document.getElementById("right-popup");

  const leftImages = [
    "images/f.01.png",
    "images/f.02.png",
    "images/f.03.png",
    "images/f.04.png",
    "images/f.05.png",
    "images/f.06.png",
    "images/f.07.png",
    "images/f.08.png",
    "images/f.09.png",
    "images/f.10.png",
    "images/f.11.png",
    "images/f.12.png",
  ];

  const rightImages = [
    "images/c.01.png",
    "images/c.02.png",
    "images/c.03.png",
    "images/c.04.png",
    "images/c.05.png",
    "images/c.06.png",
    "images/c.07.png",
    "images/c.08.png",
    "images/c.09.png",
    "images/c.10.png",
  ];

  let leftImageIndex = 0;
  let rightImageIndex = 0;

  leftPopupBtn.addEventListener("click", () => {
    leftPopup.style.display =
      leftPopup.style.display === "none" || leftPopup.style.display === ""
        ? "flex"
        : "none";
  });

  rightPopupBtn.addEventListener("click", () => {
    rightPopup.style.display =
      rightPopup.style.display === "none" || rightPopup.style.display === ""
        ? "flex"
        : "none";
  });

  leftPopup.querySelector("img").addEventListener("click", () => {
    leftImageIndex = (leftImageIndex + 1) % leftImages.length;
    leftPopup.querySelector("img").src = leftImages[leftImageIndex];
  });

  rightPopup.querySelector("img").addEventListener("click", () => {
    rightImageIndex = (rightImageIndex + 1) % rightImages.length;
    rightPopup.querySelector("img").src = rightImages[rightImageIndex];
  });

  function dragElement(element, header) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
      e.preventDefault();
      const touch = e.touches[0];
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;
      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
    }

    header.addEventListener("mousedown", dragMouseDown);
    header.addEventListener("touchstart", dragTouchStart);
  }

  dragElement(leftPopup, document.getElementById("left-popup-header"));
  dragElement(rightPopup, document.getElementById("right-popup-header"));

  const resizeHandles = document.querySelectorAll(".resize-handle");
  resizeHandles.forEach((handle) => {
    handle.addEventListener("mousedown", function (e) {
      e.preventDefault();
      const gallery = handle.parentElement;
      const startY = e.clientY;
      const startHeight = parseInt(
        document.defaultView.getComputedStyle(gallery).height,
        10
      );

      function doDrag(e) {
        e.preventDefault();
        const clientY = e.clientY || e.touches[0].clientY;
        const newHeight = startHeight + clientY - startY;
        gallery.style.height = `${newHeight}px`;
        gallery.querySelector(
          ".scroll-container"
        ).style.height = `calc(100% - 40px)`;
      }

      function stopDrag() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", doDrag);
        document.removeEventListener("touchend", stopDrag);
      }

      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchmove", doDrag);
      document.addEventListener("touchend", stopDrag);
    });

    handle.addEventListener("touchstart", function (e) {
      e.preventDefault();
      const gallery = handle.parentElement;
      const startY = e.touches[0].clientY;
      const startHeight = parseInt(
        document.defaultView.getComputedStyle(gallery).height,
        10
      );

      function doDrag(e) {
        e.preventDefault();
        const clientY = e.touches[0].clientY;
        const newHeight = startHeight + clientY - startY;
        gallery.style.height = `${newHeight}px`;
        gallery.querySelector(
          ".scroll-container"
        ).style.height = `calc(100% - 40px)`;
      }

      function stopDrag() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", doDrag);
        document.removeEventListener("touchend", stopDrag);
      }

      document.addEventListener("touchmove", doDrag);
      document.addEventListener("touchend", stopDrag);
    });
  });
});
