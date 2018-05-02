var toInp = document.getElementById("toInput"),
		messInp = document.getElementById("messageInput"),
		fromInp = document.getElementById("fromInput"),
		imgUrl = document.getElementById("imgUrl"),
		addGallery = document.getElementById("addGallery"),
		saveArray = document.getElementById("saveArray"),
		loadArray = document.getElementById("loadArray"),
		postcard = document.getElementById("postcard"),
		controls = document.getElementById("controls"),
		preview = document.getElementById("preview"),
		toI = document.getElementById("to"),
		mess = document.getElementById("message"),
		from = document.getElementById("from"),
    items = [];

var num = 0;

toInp.addEventListener("keyup", function(){
  toI.innerText = "To:"+this.value;
});

messInp.addEventListener("keyup", function(){
  mess.innerText = this.value;
});

fromInp.addEventListener("keyup", function(){
  from.innerText = "From:"+this.value;
});

imgUrl.addEventListener("keypress", function(pressKey){
  if(pressKey.keyCode == 13){
    postcard.style.backgroundImage = "url("+this.value+")";
  }

});


imgUrl.addEventListener("keypress", function(pressKey){
  if(pressKey.keyCode == 13){
    if(imgUrl.value == "auto"){
      num++
      if(num >= 4){
        num = 1;
      }
      postcard.style.backgroundImage = "url(imgs/auto"+num+".jpg)";
    } else if(imgUrl.value == ""){
      postcard.style.backgroundImage = "url(imgs/default.png)";
    }
  }
});

function createPostcard(to, bgImg){
  var newDiv = document.createElement("div"),
      newTo = document.createElement("div");
  
  newDiv.style.backgroundImage = "url("+bgImg+")";
  newTo.innerHTML = to;
  newDiv.className = "newDiv";
  newTo.className = "newTo";
  
  newDiv.appendChild(newTo);
  preview.appendChild(newDiv);
}

addGallery.addEventListener("click", function(){
  if(imgUrl.value == "auto"){
    var newDiv = document.createElement("div"),
        newTo = document.createElement("div");
    
    num++;
    if(num >= 4){
      num = 1;
    }
    
    newDiv.style.backgroundImage = "url(imgs/auto"+num+".jpg)";
    newTo.innerHTML = toInp.value;
    newDiv.className = "newDiv";
    newTo.className = "newTo";

    newDiv.appendChild(newTo);
    preview.appendChild(newDiv);
  } 
		else if(imgUrl.value == ""){
    var newDiv = document.createElement("div"),
        newTo = document.createElement("div");

    newDiv.style.backgroundImage = "url(imgs/default.png)";
    newTo.innerHTML = toInp.value;
    newDiv.className = "newDiv";
    newTo.className = "newTo";

    newDiv.appendChild(newTo);
    preview.appendChild(newDiv);        
  } 
		else {
    createPostcard(toInp.value,imgUrl.value); 
  }
  
  var item = {
    bgimg: imgUrl.value,
    to: toInp.value,
    message: messInp.value,
    from: fromInp.value
  }
  
  items.push(item);
  console.log(items);
});

saveArray.addEventListener("click", function(){
  localStorage.setItem("items", JSON.stringify(items));
});

loadArray.addEventListener("click", function(){
  preview.innerHTML = "";
  
  var items = localStorage.getItem("items");
  
  if(items){
    items = JSON.parse(items);
    for(var i=0; i<items.length; i++){
      createPostcard(items[i].to, items[i].bgimg);
    }
  }
	
});
