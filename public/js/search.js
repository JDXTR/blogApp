function searchHandler() {
    const element = document.getElementById("mySelect");
    if(element){
        element.remove();
        console.log("here")
    }
    const text = document.getElementById("searchText").value;

    const req = new XMLHttpRequest;
    req.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = await JSON.parse(this.responseText);
            let myParent = document.getElementById("searchText").parentElement;

            // Create array of options to be added
            let value = [];

            data.map(obj => value.push({title: obj.title, id: obj._id}))

            // console.log(value);

            // Create and append select list
            let selectList = document.createElement("select");
            selectList.id = "mySelect";
            selectList.name = "postname";
            // selectList.onclick = searchPostbyTitle();
            myParent.appendChild(selectList);

            // Create and append the options
            for (let i = 0; i < value.length; i++) {
                let option = document.createElement("option");
                option.value = value[i].id;
                option.text = value[i].title;
                option.id = 'optionId'
                selectList.appendChild(option);
            }
            // console.log(selectList);
        }
    }
    req.open("GET", "https://localhost:3000/searchPost?value=" + text, true);
    req.send();
}

function searchPostbyTitle() {
    console.log('clicked')
    const optionTitle = this.options[this.selectedIndex].getAttribute('value');
    console.log(optionTitle)
}

// onchange="alert(this.options[this.selectedIndex].getAttribute('isred'));

// let a = document.createElement("a");
// a.href = '/singlePost/' + value[i].id;
// a.text = value[i].title;
// option.appendChild(a);