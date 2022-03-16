const MessageBox = document.querySelector("#MessageBox");
const MessageQueue = new Queue();
const MAX_MESSAGES = 10;
var userIsDev = false;

class NormalMessageFactory extends MessageFactory {
    create(messageText, classesArray) {
        let message = document.createElement("p");
        message.innerHTML = messageText;
        if (classesArray) {
            message.classList.add(classesArray);
        }
        this.render(message);
        return message;
    }
}

class ImportantMessageFactory extends MessageFactory {
    create(messageText, classesArray) {
        let message = document.createElement("p");
        message.innerHTML = messageText.toUpperCase();
        if (classesArray = classesArray.concat(["important","bold","larger"])) {
            message.classList.add(classesArray);
        }
        this.render(message);
        return message;
    }
}

class DeveloperOnlyMessageFactory extends MessageFactory {
    create(messageText, classesArray) {
        if (userIsDev) {
            let message = document.createElement("p");
            message.innerHTML = messageText;
            if (classesArray) {
                message.classList.add(classesArray);
            }
            this.render(message);
            return message;
        }
    }
}

class MessageFactory {
    constructor() {
        this.box = MessageBox;
        this.queue = MessageQueue;
    }
    
    //render() is private, not to be called directly outside of class
    render(message) {
        this.box.appendChild(message);
        this.queue.enqueue(message);
        if (this.queue.getLength() > MAX_MESSAGES) {
            let oldest = this.queue.dequeue();
            this.box.removeChild(oldest);
        }
    }
    
    create;
}

class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    getLength() {
      return this.tail - this.head;
    }
}
