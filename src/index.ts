export class Test {

  private test: String;
  constructor(toShow: String) {
    this.test = toShow;    
  }

  toString() {
    return this.test;
  }
}

console.log(new Test('Hello there').toString());