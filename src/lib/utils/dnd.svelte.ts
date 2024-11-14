export default function dnd(win: HTMLDivElement) {
  let offsetX = $state<number>(0);
  let offsetY = $state<number>(10);
  let newLeft = $state<number>();
  let newTop = $state<number>();
  const WIDTH = win.offsetWidth;
  const HEIGHT = win.offsetHeight;

  function handleMouseDown(event: MouseEvent) {
    const rect = win.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    newLeft = event.pageX - offsetX;
    newTop = event.pageY - offsetY;

    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newTop < 0) {
      newTop = 0;
    } else if (Number(newLeft + WIDTH) > window.innerWidth) {
      newLeft = window.innerWidth - WIDTH;
    } else if (Number(newTop + HEIGHT) > window.innerHeight) {
      newTop = window.innerHeight - HEIGHT;
    }
    win.style.left = `${newLeft}px`;
    win.style.top = `${newTop}px`;
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  win?.addEventListener("mousedown", handleMouseDown);

  return () => {
    win.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
}
