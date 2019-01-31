
// assumes there's a #sprite-tables div
function Zone(e) {
    for( var k in e ) {
        this[k] = e[k];
    }
    this.setup();
    this.recalc();
}

Zone.prototype.setup = function() {
    var that = this;

    this.node = document.getElementById('sprite-tables');
    this.canvas = document.getElementById('single-sprite-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.table = document.createElement("table");
    this.caption = document.createElement("caption");

    // add interactive caption
    var s1 = document.createElement("span");
    var a1 = document.createElement("a");
    s1.innerHTML = "Zone # " + (zones.length + 1).toString();
    a1.innerHTML = "Del";
    a1.href = "#";
    a1.addEventListener("click", function(e) {
        e.preventDefault();
        that.destroy();
    });
    this.caption.appendChild(s1);
    this.caption.appendChild(a1);
    this.table.appendChild( this.caption );

    this.table.className = "sprite-table";
    this.node.appendChild(this.table);

    this.addRow("Image Starting X (px)", "x");
    this.addRow("Image Starting Y (px)", "y");
    this.addRow("Image Width (px)", "w");
    this.addRow("Image Height (px)", "h");
    this.addRow("Sprite Width (px)", "sprite_width");
    this.addRow("Sprite Height (px)", "sprite_height");
    this.addRow("Num. Sprites (hor)", "sprites_hor");
    this.addRow("Num. Sprites (ver)", "sprites_ver");
}

Zone.prototype.destroy = function() {
    this.table.remove();
    // delete this.child_node;
    console.warn( "TODO: delete from structure?" );
}

Zone.prototype.addRow = function(label, element_name) {
    var that = this;

    var r = document.createElement("tr");
    var c1 = document.createElement("th");
    c1.innerHTML = label;
    var c2 = document.createElement("td");
    var i1 = document.createElement("input");
    i1.value = this[element_name].toString();

    ["change","keyup"].forEach(function(ev) {
        i1.addEventListener(ev, function(e) {
            var val = i1.value;
            that[element_name] = parseInt(val);
            that.recalc();
        });
    });

    c2.appendChild(i1);
    r.appendChild(c1);
    r.appendChild(c2);
    this.table.appendChild(r);
}

Zone.prototype.setWidth = function(w) {
    this.recalc();
    return( this );
}

Zone.prototype.setHeight = function(h) {
    this.recalc();
    return( this );
}

Zone.prototype.drawZones = function() {

    // primer
    // this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    // this.ctx.fillRect(30, 30, 50, 50);

    var count = 0;

    for( var j = 0; j < this.sprites_ver; j++ ) {
        for( var i = 0; i < this.sprites_hor; i++ ) {
            if( count % 2 ) {
                this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            } else {
                this.ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
            }

            var x = i * this.sprite_width;
            var y = j * this.sprite_height;
            var w = this.sprite_width;
            var h = this.sprite_height;

            this.ctx.fillRect(x, y, w, h);

            count++;
        }
    }

}

Zone.prototype.recalc = function() {
    var that = this;

    var img = new Image();
    img.src = this.canvas.getAttribute("data-image");
    img.addEventListener('load', function() {
        that.ctx.clearRect(0,0,that.w, that.h);
        that.ctx.drawImage(img, 0, 0);
        that.drawZones();
    });
}
