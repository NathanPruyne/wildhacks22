// Croquet Tutorial 1
// Hello World 
// Croquet Corporation 
// 2021

class MyModel extends Croquet.Model {

    init() {
        this.count = 0;
        this.subscribe("counter", "reset", this.resetCounter);
        this.future(1000).tick();
    }

    resetCounter() {
        this.count = 0;
        this.publish("counter", "changed");
    }

    tick() {
        this.count++;
        this.publish("counter", "changed");
        this.future(1000).tick();
    }

}

MyModel.register("MyModel");

class MyView extends Croquet.View {

    constructor(model) {
        super(model);
        this.model = model;
        countDisplay.onclick = event => this.counterReset();
        this.subscribe("counter", "changed", this.counterChanged);
        this.counterChanged();
    }

    counterReset() {
        this.publish("counter", "reset");
    }

    counterChanged() {
        countDisplay.textContent = this.model.count;
    }

}

Croquet.App.makeWidgetDock(); // shows QR code

Croquet.Session.join({
  appId: 'edu.northwestern.u.npruyne.wildhacks22',
  apiKey: "19pILqAmDbA95D8OyDcM9xfIvuu6s7Hp4i45K5tNH",
  name: "unnamed",
  password: "secret",
  model: MyModel,
  view: MyView});