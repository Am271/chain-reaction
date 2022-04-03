class Node {
	constructor(box) {
		this.up = null;
		this.down = null;
		this.left = null;
		this.right = null;
		this.count = 0;
		this.box = box;
		this.box.addEventListener('click', function() {
			for(var i of layers) {
				while(i != null) {
					if(i.box == this) {
						var a = getCoord(i)
						socket.emit('move', {'right' : a[0], 'down' : a[1], 'colour' : colour_});
						break;
					}
					i = i.right;
				}
			}
		});
	}

	count_(node, colour) {
		node.count++;
		var tmp = 0;
		if(node.up)
			tmp++;
		if(node.down)
			tmp++;
		if(node.left)
			tmp++;
		if(node.right)
			tmp++;
		if(tmp == node.count) {
			if(node.up)
				this.count_(node.up);
			if(node.down)
				this.count_(node.down);
			if(node.left)
				this.count_(node.left);
			if(node.right)
				this.count_(node.right);
			node.count = 0;
		}
		node.box.innerText = node.count;
		node.box.style.backgroundColor = colour;
	}
}

function addRight(root, rootLayer, leng) {
	var tmpRoot = root;
	for(var i = 1; i < leng; i++) {
		var item = document.createElement('div');
		rootLayer.appendChild(item);
		item.classList.add('box');
		item.style.display = 'inline-block';
		var newNode = new Node(item);
		tmpRoot.right = newNode;
		newNode.left = tmpRoot;
		tmpRoot = newNode;
	}
}

function addLayer() {
	var newLayer = document.createElement('div');
	var tmp = document.createElement('div');
	container.appendChild(newLayer);
	newLayer.appendChild(tmp);

	tmp.classList.add('box');
	var newRoot = new Node(tmp);
	addRight(newRoot, newLayer, 8);
	return newRoot;
}

function linkUpDown(x, y) {
	var tmpx = x, tmpy = y;
	while(tmpx != null && tmpy != null) {
		tmpx.down = tmpy;
		tmpy.up = tmpx;
		tmpx = tmpx.right;
		tmpy = tmpy.right;
	}
}

function link(layers) {
	for(var i = 0; i < layers.length - 1; i++) {
		linkUpDown(layers[i], layers[i + 1]);
	}
}

function getCoord(x) {
	var down = 0, right = 0, x_ = x;

	while(x_ != null) {
		right++;
		x_ = x_.left;
	}

	while(x != null) {
		down++;
		x = x.up;
	}
	return [right, down];
}

const socket = io();
let layers = [];
let colour_ = '';
let container = document.getElementById('container');
for(var i = 1; i <= 8; i++) {
	layers.push(addLayer());
}

link(layers);

socket.on('colour', function(colour) {
	colour_ = colour.colour;
});

socket.on('move', function(move){
	var i = 2, tmp = layers[move.down - 1];
	while(i <= move.right) {
		i++;
		tmp = tmp.right;
	}
	console.log(move);
	tmp.count_(tmp, move.colour);
});