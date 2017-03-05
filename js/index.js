(function() {
  var menu,
      parentNodes,
      onExpanderClick;
  
  parentNodes = document.querySelectorAll("ul.erla-accordion li ul");
  // create & attach expander elements
  for(var i=0; i < parentNodes.length; i++) {
    var expanderEl = document.createElement("span");
    expanderEl.className = "expander glyphicon glyphicon-chevron-down";   
    var parent = parentNodes[i].parentNode;
    parent.querySelector(".content").appendChild(expanderEl);
  }
 
  // onClick event handler
  onExpanderClick = function (ev) {

    var parent = ev.target.parentNode.parentNode;
    var ul = parent.querySelector('ul');
    
    // if node is expanded ...
    if (ul.clientHeight) {
      // ... set fixed height, initially it is auto ...
      ul.style.height = ul.clientHeight+"px";
      ul.offsetHeight;
      // ... collapse it by setting 0px height.
      ul.style.height = "0px";
    } else { // if node is collapsed ...
      // ... set the fixed height.
      var elmHeight = getHeightIfZero(ul);
      ul.style.height = elmHeight + "px";
    }

		// toggle "expanded class
		if (ev.target.className.indexOf("expanded") === -1) {
			ev.target.className += " expanded";
		} else {
			ev.target.className = ev.target.className.replace(" expanded", "");
		}
  }
  

  
  function getHeightIfZero(elm) {
    var heightk
    elm.className += " notransition";
    elm.style.height = "auto";
    height = elm.clientHeight;
    elm.style.height = "0px";
    elm.offsetHeight;
    elm.className = elm.className.replace(" notransition", "")
    return height;

  }
  
  function endTransition(ev) {
    // set height as 'auto' when the trasition is done
    var element = ev.target;
    
    if (element.style.height != "0px") {
      element.style.height = "auto";
    }
  }
   
	// expand till selected item reached 
	function expandSelected() {
		var target = document.querySelector("ul.erla-accordion .selected");
		target = target.parentNode
		while (target.className != "erla-accordion") {
					 target = target.parentNode
					 if (target.nodeName == "LI") {
						 
						 var exp = target.querySelector(".expander");
						 if (exp) {
							 exp.click();
						 }
					 }
		}
		
	}
	
	
   // bind event handlers
	
	var expanders = document.querySelectorAll("ul.erla-accordion .expander");
	for (var i=0; i<expanders.length; i++) {
		expanders[i].addEventListener("click", onExpanderClick, true);
	}
  
  for (var i=0; i<parentNodes.length; i++) {
    parentNodes[i].addEventListener("transitionend", endTransition, true);
  }
	

	
	expandSelected();

})()