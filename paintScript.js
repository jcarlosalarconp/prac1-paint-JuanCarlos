class View {
  constructor(View) {
    this._View = View;
    this.GUI = {
      canvas: this._View.getElementById('myCanvas'),
      square: this._View.getElementById('squareButton'),
      circle: this._View.getElementById('circleButton'),
      triangle: this._View.getElementById('triangleButton'),
      heart: this._View.getElementById('heartButton'),
      text: this._View.getElementById('textButton'),
      line: this._View.getElementById('lineButton'),
      pencil: this._View.getElementById('pencilButton'),
      erase: this._View.getElementById('eraseButton'),
      rgb: this._View.getElementById('rgbButton'),
      minus: this._View.getElementById('minusButton'),
      plus: this._View.getElementById('plusButton'),
      empty: this._View.getElementById('emptyButton'),
      fill: this._View.getElementById('fillButton'),
      import: this._View.getElementById('importButton'),
      export: this._View.getElementById('exportButton'),
      restart: this._View.getElementById('restartButton')
    };
    this.size = 50;
    this.ctx = this.GUI.canvas.getContext('2d');
    this.drawer = 'squareButton';
    this.isFill = false;
    this.img = new Image();
    this.command = {
      squareButton: this.squareFunc,
      circleButton: this.circleFunc,
      triangleButton: this.triangleFunc,
      heartButton: this.heartFunc,
      textButton: this.textFunc,
      lineButton: this.lineFunc,
      pencilButton: this.pencilFunc,
      eraseButton: this.eraseFunc,
      execute: function(action, configure) {
        this[action](configure);
      }
    };
    this.addEvents();
  }

  figureclick(event) {
    this.drawer = event.srcElement.id;
  }

  draw(e) {
    const x = event.offsetX;
    const y = event.offsetY;

    this.command.execute(this.drawer, {x, y});
  }

  addEvents() {
    this.GUI.square.addEventListener('click', this.figureclick.bind(this));
    this.GUI.circle.addEventListener('click', this.figureclick.bind(this));
    this.GUI.triangle.addEventListener('click', this.figureclick.bind(this));
    this.GUI.heart.addEventListener('click', this.figureclick.bind(this));
    this.GUI.text.addEventListener('click', this.figureclick.bind(this));
    this.GUI.text.addEventListener('click', this.textPrompt.bind(this));
    this.GUI.line.addEventListener('click', this.figureclick.bind(this));
    this.GUI.pencil.addEventListener('click', this.figureclick.bind(this));
    this._View.addEventListener('mousedown', this.mouseDown.bind(this), false),
    this._View.addEventListener('mouseup', this.mouseUp.bind(this), false),
    this.GUI.erase.addEventListener('click', this.figureclick.bind(this));
    this.GUI.rgb.addEventListener('change', this.rgbPicker.bind(this));
    this.GUI.minus.addEventListener('click', this.minusSize.bind(this));
    this.GUI.plus.addEventListener('click', this.plusSize.bind(this));
    this.GUI.empty.addEventListener('click', this.emptyFunc.bind(this));
    this.GUI.fill.addEventListener('click', this.fillFunc.bind(this));
    this.GUI.import.addEventListener('click', this.importFunc.bind(this));
    this.GUI.export.addEventListener('click', this.exportFunc.bind(this)); 
    this.GUI.restart.addEventListener('click', this.restartFunc.bind(this))


    this.GUI.canvas.addEventListener('click', this.draw.bind(this));
    this.GUI.canvas.addEventListener('mousemove', this.mouseMove.bind(this))
  }

  //SHAPES FUNCTIONS -- LEFT SIDEBAR
  //AÑADIR THIS A PARAMETROS
  //SQUARE
  squareFunc = ({x, y}) => {
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.isFill ? this.ctx.fillRect(x, y, this.size, this.size): this.ctx.strokeRect(x, y, this.size, this.size);
  };
  //CIRCLE
  circleFunc = ({x, y}) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size/2, 0, 2 * Math.PI);
    this.isFill ? this.ctx.fill(): this.ctx.stroke();
  };
  
  //TRIANGLE
  triangleFunc = ({x, y}) => {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + this.size);
    this.ctx.lineTo(x + this.size, y + this.size);
    this.ctx.lineTo(x, y);
    this.isFill ? this.ctx.fill(): this.ctx.stroke();
  };

    //HEART
    heartFunc = ({x, y}) => {
      this.ctx.beginPath();
      this.ctx.moveTo(x,y);
      this.ctx.bezierCurveTo( x,y-(this.size-20), x-this.size,y-(this.size-20), x-this.size, y);
      this.ctx.bezierCurveTo( x-this.size,y+(this.size-20), x,y+(this.size-15), x, y+(this.size+10) );
      this.ctx.bezierCurveTo( x,y+(this.size-15), x+this.size,y+(this.size-20), x+this.size, y );  
      this.ctx.bezierCurveTo( x+this.size,y-(this.size-20), x,y-(this.size-30), x, y );
      this.ctx.lineWidth=1;
      this.isFill ? this.ctx.fill(): this.ctx.stroke();
    }

    //TEXT
    textPrompt = () => {
      this.textInput = prompt("Your Text:")
    }

    textFunc = ({x, y}) => {
      this.ctx.font = this.size+"px Arial";
      this.ctx.fillText(this.textInput,x,y);
    }
  //LINE
  lineFunc = ({x, y}) => {
    this.ctx.beginPath();
    this.ctx.lineTo(x, y);
    this.ctx.lineTo(x, y+ this.size);
    this.ctx.stroke();
  };

  //MOUSE EVENTS
  isPencilOrErase = () => {
    return this.drawer==="pencilButton"||this.drawer==="eraseButton";
  }
  mouseDown = () => {
    this.clickDown = true;
  }
  mouseUp = () => {
    this.clickDown = false;
  }
  mouseMove = (event) => {
    if(this.clickDown&&this.isPencilOrErase()){
      this.draw(event);
    }
  }

  //PENCIL
  pencilFunc =({x, y}) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size-30, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();   
  }

  //ERASE
  eraseFunc =({x, y}) => {
    this.ctx.beginPath();
    this.ctx.globalCompositeOperation="destination-out";
    this.ctx.arc(x, y, this.size-20, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.globalCompositeOperation="source-over";
  }

  //RGB PICKER
  rgbPicker = () => {
     this.ctx.fillStyle = this.GUI.rgb.value;
     this.ctx.strokeStyle = this.GUI.rgb.value;
  }
  //MINUS SIZE
  minusSize() {
    this.size -= 5;
  }

  //PLUS SIZE
  plusSize() {
    this.size += 5;
  }

  //EMPTY
  emptyFunc = () => {
    this.isFill = false;
  }

  //FILL
  fillFunc = () => {
    this.isFill = true;
  }
  //RESTART
  restartFunc = () => {
    this.ctx.clearRect(0, 0, this.GUI.canvas.width, this.GUI.canvas.height)
  }

  //IMPORT
  importFunc = (x, y) => {
    this.reader = new FileReader();
    this.reader.onload = function(event){
      this.img = new Image();
      this.img.onload = function(){
        this.GUI.canvas.width = this.img.width;
        this.GUI.canvas.height = this.img.height;
        this.ctx.drawImage(this.img,x,y);
        }
        this.img.src = event.target.result;
    }
    this.reader.readAsDataURL(event.target.files[0]);
    console.log(event.target.files);   
}
  

  //EXPORT
  exportFunc = () => {
    const link = document.createElement('a');
    link.download = 'myDraw.png';

    link.href = this.GUI.canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    link.click();
  }
}
