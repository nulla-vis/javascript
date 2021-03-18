let form =  document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

//form submit event
form.addEventListener('submit',addItem);
// delete event
itemList.addEventListener('click',removeItem);
//filter event
filter.addEventListener('keyup',filterItems);

//add item
function addItem(e) {
    e.preventDefault();

    //get input value
    let newItem = document.getElementById('item').value;

    //create new li element
    let li = document.createElement('li');
    //add class
    li.className = 'list-group-item';
    //add textNode with inputted value
    li.appendChild(document.createTextNode(newItem));

    //create delete button element
    let deleteBtn = document.createElement('button');
    
    //add clas to delete button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

    //appent the text node
    deleteBtn.appendChild(document.createTextNode('X'));
    
    //Append delete button to li
    li.appendChild(deleteBtn);

    //append li to ul list
    itemList.appendChild(li);
}

function removeItem(e) {
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')) {
            let li = e.target.parentElement; //clicked one is the delete button, the parent is the li tag
            itemList.removeChild(li);
        }
    }
}

function filterItems(e) {
    //convert to lowercase
    var text = e.target.value.toLowerCase();
    // console.log(text);
    // get list
    var items = itemList.getElementsByTagName('li');
    // console.log(items[0].firstChild);
    
    //conver HTMLCollection to array
    Array.from(items).forEach(function(item){
        //items is HTML collection with bunch of li tag
        // item is the li tag
        // firstchild is the textcontent of li tag
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}