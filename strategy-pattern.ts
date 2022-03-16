class InteractiveElement {
	hoverAction: IAction;
	clickAction: IAction;
	callableAction: IAction;
	display: IDisplay;
	element: HTMLElement;
	
	constructor (onHover: IAction, onClick: IAction, onCall: IAction, display: IDisplay) {
		this.hoverAction = onHover;
		this.clickAction = onClick;
		this.callableAction = onCall;
		this.display = display;
		
		this.init();
	}
	
	init() {
		this.display.element = this.element;
		this.display.render();
		this.hoverAction.parent = this.clickAction.parent = this.callableAction.parent = this.display.parent = this;
		this.element.addEventListener("hover", this.hoverAction.act);
		this.element.addEventListener("click", this.clickAction.act);
		this.addClickListener();
	}
	
	act(arg?: any) {
		this.callableAction.act(arg);
	}
	
	hide() {
		this.display.hide();
	}
	
	show() {
		this.display.show();
	}
}

interface Display {
	element: HTMLElement;
	container: HTMLElement;
	show: Show;
	hide: Hide;
	render: render;
}

//NOTE render can actually be further decoupled i.e. formed into implementable strategy, instead of hardcoded

class NavListItemDisplay extends Display {
	container = document.querySelector("#NavListItem");
	show = TemporaryShow()
	hide = TemporaryHide()
	render = function() {
		this.element = document.createElement("li");
		this.container.appendChild(this.element);
	}
}

class ParagraphDisplay extends Display {
	container = document.body;
	show = PseudoShow(); //Show is never needed as "hiding" deletes the element forever.
	hide = DeleteAsHide();
	render = function() {
		this.element = document.createElement("p");
		this.container.appendChild(this.element);
	}
}

class Action {
	parent: InteractiveElement;
	isEnabled() {
		return !parent.element.disabled;
	}
}

class DisableAction extends Action {
	act(arg?: any) {
		parent.element.disabled = true;
	}
}

class EnableAction extends Action {
	act(arg?: any) {
		parent.element.disabled = false;
	}
}

class CloseWindowAction extends Action {
	act(arg?: any) {
		if(isEnabled) window.close();
	}
}

class DeleteSelfAction extends Action {
	act(arg?: any) {
		if(isEnabled) parent.element.parentNode.removeChild(parent.element);
	}
}

class DeleteContentAction extends Action {
	act(arg?: any) {
		if(isEnabled) parent.element.innerHTML = null;
	}
}
