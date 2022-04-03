class Node {
	constructor(box) {
		this.colour = '';
		this.up = null;
		this.down = null;
		this.left = null;
		this.right = null;
		this.box = box;
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

let container = document.getElementById('container');
let layers = [];
for(var i = 1; i <= 8; i++) {
	layers.push(addLayer());
}
link(layers);