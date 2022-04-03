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

let container = document.getElementById('container');
let rootBox = document.createElement('div');
container.appendChild(rootBox);
rootBox.classList.add('box');
rootBox.style.display = 'inline-block';
let root = new Node(rootBox);
addRight(root, 8);

function addRight(root, leng) {
	var tmpRoot = root;
	for(i = 1; i < leng; i++) {
		var item = document.createElement('div');
		container.appendChild(item);
		item.classList.add('box');
		item.style.display = 'inline-block';
		var newNode = new Node(item);
		tmpRoot.right = newNode;
		newNode.left = tmpRoot;
		tmpRoot = newNode;
	}
}

