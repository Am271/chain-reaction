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
	for(i = 1; i < leng; i++) {
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

let container = document.getElementById('container');
// let rootBox = document.createElement('div');
// let rootLayer = document.createElement('div');
// container.appendChild(rootLayer);
// rootLayer.appendChild(rootBox);

// rootBox.classList.add('box');
// let root = new Node(rootBox);
// addRight(root, rootLayer, 8);
let layers = [addLayer(), addLayer(), addLayer()];