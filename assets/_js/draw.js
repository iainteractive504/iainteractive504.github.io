export function canvasDraw(myCanvas) {
  let ctx = myCanvas.getContext('2d');

  // Fill Window Width and Height
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  // Set Background Color
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  // Mouse Event Handlers
  if (myCanvas) {
    let isDown = false;
    let canvasX;
    let canvasY;
    ctx.lineWidth = 5;

    $(myCanvas)
      .mousedown(function (e) {
        isDown = true;
        ctx.beginPath();
        canvasX = e.pageX - myCanvas.offsetLeft;
        canvasY = e.pageY - myCanvas.offsetTop;
        ctx.moveTo(canvasX, canvasY);
      })
      .mousemove(function (e) {
        if (isDown !== false) {
          canvasX = e.pageX - myCanvas.offsetLeft;
          canvasY = e.pageY - myCanvas.offsetTop;
          ctx.lineTo(canvasX, canvasY);
          ctx.strokeStyle = '#fff';
          ctx.stroke();
        }
      })
      .mouseup(function (e) {
        isDown = false;
        ctx.closePath();
      });
  }

  // Touch Events Handlers
  let draw = {
    started: false,
    start: function (evt) {

      ctx.beginPath();
      ctx.moveTo(
        evt.touches[0].pageX,
        evt.touches[0].pageY
      );

      this.started = true;

    },
    move: function (evt) {

      if (this.started) {
        ctx.lineTo(
          evt.touches[0].pageX,
          evt.touches[0].pageY
        );

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.stroke();
      }

    },
    end: function (evt) {
      this.started = false;
    },
  };

  // Touch Events
  myCanvas.addEventListener('touchstart', draw.start, false);
  myCanvas.addEventListener('touchend', draw.end, false);
  myCanvas.addEventListener('touchmove', draw.move, false);
  myCanvas.addEventListener('clearRect', () => {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  });

  // Disable Page Move
  document.body.addEventListener('touchmove', function (evt) {
    evt.preventDefault();
  }, false);

}
