import Ember from 'ember';
import presentation from '../presentation';

let $ = Ember.$;

export default Ember.Route.extend({
  model(params) {
    var index = presentation.indexOf(params.id);

    if (index < 0) {
      throw new Error(`unknown slide: ${params.id}`);
    }
    return {
      index,
      slideTemplate: `slides/${params.id}`
    };
  },

  move(distance) {
    let currentIndex = this.get('controller.model.index');

    if(!presentation[currentIndex + distance]) {
      return;
    }

    this.transitionTo('slide', presentation[currentIndex + distance]);
  },

  activate() {
    $(window).on('keyup.SlideRoute', (e)=> {
      switch (e.keyCode) {
      case 33:
        this.move(-1); //Page down (presenter remote)
        break;
      case 34:
        this.move(1); //Page up (presenter remote)
      case 37:
        this.move(-1);
        break;
      case 39:
        this.move(1);
        break;
      }
    });
  },

  deactivate() {
    $(window).off('keyup.SlideRoute');
  }
});
