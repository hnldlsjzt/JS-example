class Queue {

    constructor() {
      this.queue = [];
      this.time = 0;
    }
 
    addTask(task, t) {
      this.time += t;
      this.queue.push([task, this.time]);
      return this;
    }
    start() {
      this.queue.forEach(item => {
        setTimeout(() => {
          item[0]();
        }, item[1]);
      })
    }
  }

  const q = new Queue()
  q.addTask(()=>console.log(1),1000)
  q.addTask(()=>console.log(2),2000)
  q.addTask(()=>console.log(3),3000)